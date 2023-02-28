if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { isLogged } = require("./middleware");

const cors = require("cors");

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

const User = require("./user");

app.use(express.json());

const sessionConfig = {
	name: "session",
	secret: "secret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};
app.use(session(sessionConfig));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/app_auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});
//Routes

app.get("/", (req, res) => {
	console.log("User is currently logged in: " + req.user);
	res.send("User is currently logged in: " + req.user);
});

app.post("/register", async (req, res) => {
	try {
		console.log(req.body);
		const { username, email, password } = req.body.user;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) return next(err);
			console.log("Registered successfully");
		});
	} catch (e) {
		console.log("error " + e);
	}
});

app.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	}),
	(req, res) => {
		res.send("Logged in successfully " + req.user);
	}
);

app.post("/logout", (req, res) => {
	try {
		req.logout(() => {
			console.log("logged out");
			res.send("logged out");
		});
	} catch (e) {
		console.log("Cannot Log out ", e);
	}
});

app.get("/loginStatus", (req, res) => {
	console.log(req.isAuthenticated());
	res.send(req.isAuthenticated());
});

app.post("/sendemail", isLogged, (req, res) => {
	console.log(req.body);
	patient = req.body.patient;
	const oAuth2Client = new google.auth.OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		process.env.REDIRECT_URI
	);
	oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

	async function sendMail() {
		try {
			const accessToken = await oAuth2Client.getAccessToken();
			const transport = nodemailer.createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: process.env.SENDER_EMAIL,
					clientId: process.env.CLIENT_ID,
					clientSecret: process.env.CLIENT_SECRET,
					refreshToken: process.env.REFRESH_TOKEN,
					accessToken: accessToken,
				},
			});
			const mailOptions = {
				from: `HealthCare <${process.env.SENDER_EMAIL}>`,
				to: process.env.RECEIVER_EMAIL,
				subject: "Patient Details",
				text: "Patient details",
				html: `<h1>Patient Details</h1><br></br><ul><li>Patient Name: ${patient.pname}<li>Patient Address: ${patient.padd}<li>Patient Email: ${patient.pemail}</li><li>Phone Number: ${patient.pphone}</li><li>Other: ${patient.pother}</li></ul><br></br><h2>Sender Details: </h2><h4>Username: ${req.user.username}</h4>Email: ${req.user.email}<h4></h4>`,
			};

			const result = await transport.sendMail(mailOptions);
			return result;
		} catch (error) {
			return error;
		}
	}

	sendMail()
		.then((result) => console.log("Email sent...", result))
		.catch((error) => console.log(error.message));
});

app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
