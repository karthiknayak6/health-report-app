import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [allEntry, setAllEntry] = useState({ username: "", password: "" });
	const submitForm = (e) => {
		e.preventDefault();
		const newEntry = { username: username, password: password };

		setAllEntry(() => newEntry);
	};
	useEffect(() => {
		if (allEntry.username !== "" && allEntry.password !== "") {
			console.log(allEntry);
			console.log(
				JSON.stringify({
					username: allEntry.username,
					password: allEntry.password,
				})
			);
			fetch("http://localhost:5000/login", {
				method: "POST",
				credentials: "include", // include credentials in the request
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: allEntry.username,
					password: allEntry.password,
				}),
			})
				.then((response) => {
					console.log(response);
					toast("Logged in sucsessfully")
					navigate("/");
				})
				.catch((error) => {
					console.log(error);
					toast(" Login unsucessfull ")
				});
		}
	}, [allEntry]);
	return (
		<div className="conatiner1">
			<div className="login">
				<h1 className="text-center">
					<b>Login</b>
				</h1>

				<form onSubmit={submitForm} className="needs-validation">
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="username">
							Username
						</label>
						<input
							className="form-control"
							type="text"
							id="username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<div className="invalid-feedback">Please enter your username</div>
					</div>
					<div className="form-group was-validated">
						<label className="form-label" htmlFor="password">
							Password
						</label>
						<input
							className="form-control"
							type="password"
							id="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="invalid-feedback">Please enter your password</div>
					</div>
					<div className="form-group form-check">
						<input className="form-check-input" type="checkbox" id="check" />
						<label className="form-check-label" htmlFor="check">
							Remember me
						</label>
					</div>

					<input
						className="btn  btn-success w-50 "
						type="submit"
						value="SIGN IN"
					/>
					<div>
						<NavLink style={{ color: "black" }} to="/Signup">
							Not Yet Registered ?
						</NavLink>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};
