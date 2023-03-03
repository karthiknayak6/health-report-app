import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
export const Signup = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		username: "",
		name: "",
		clinicname: "",
		email: "",
		clinicaddress: "",
		contact: "",
		password: "",
		cpassword: "",
	});
	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;
		setUser({ ...user, [name]: value });

		// console.log(user);
	};
	let counter = 0;
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(JSON.stringify({ data: user }));

		fetch("http://localhost:5000/register", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user }),
		})
			.then((response) => {
				console.log(response);
				console.log("BHAHHA");
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// useEffect(() => {
	// 	console.log("FETTTCHH ", counter);

	// 	// fetch("/register", {
	// 	// 	method: "POST",
	// 	// 	headers: {
	// 	// 		"Content-Type": "application/json",
	// 	// 	},
	// 	// 	body: JSON.stringify({ data: user }),
	// 	// })
	// 	// 	.then((response) => {
	// 	// 		// Handle the response from the server
	// 	// 	})
	// 	// 	.catch((error) => {
	// 	// 		console.log(error);
	// 	// 	});
	// }, [counter]);

	return (
		<div className="container4">
			<div className="container">
				<h1
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					Register
				</h1>
				<form
					onSubmit={handleSubmit}
					className="row g-3"
					style={{ marginTop: "70px" }}
				>
					<div className="col-md-5 ">
						<input
							type="text"
							className="form-control text-bg-light p-3"
							placeholder="username"
							name="username"
							aria-label="username"
							value={user.username}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-5 ">
						<input
							type="text"
							className="form-control text-bg-light p-3"
							placeholder="Full name"
							name="name"
							aria-label="First name"
							value={user.name}
							onChange={handleInputs}
						/>
					</div>

					<div className="col-md-6">
						<input
							type="text"
							className="form-control text-bg-light p-3"
							name="clinicname"
							placeholder="Clinics name"
							aria-label="Clinics name"
							value={user.clinicname}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inputEmail4" className="form-label">
							Email
						</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail4"
							value={user.email}
							onChange={handleInputs}
							name="email"
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inputPassword4" className="form-label">
							Password
						</label>
						<input
							type="password"
							name="password"
							className="form-control"
							id="inputPassword4"
							value={user.password}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inputPassword5" className="form-label">
							Confirm Password
						</label>
						<input
							type="password"
							className="form-control"
							name="cpassword"
							id="inputPassword5"
							value={user.cpassword}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-12">
						<label htmlFor="inputAddress" className="form-label">
							Clinic's Address
						</label>
						<input
							type="text"
							className="form-control"
							id="inputAddress"
							name="clinicaddress"
							placeholder="1234 Main St"
							value={user.clinicaddress}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-6">
						<label htmlFor="inputCity" className="form-label">
							Contact Details
						</label>
						<input
							type="number"
							className="form-control"
							name="contact"
							id="inputCity"
							value={user.contact}
							onChange={handleInputs}
						/>
					</div>

					<div className="col-12">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								name="name"
								id="gridCheck"
							/>
							<label className="form-check-label" htmlFor="gridCheck">
								Check me out
							</label>
						</div>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-primary">
							Sign in
						</button>
					</div>
					<span>
						<NavLink to="/Login" style={{ color: "black" }}>
							{" "}
							Already registered ?
						</NavLink>
					</span>
				</form>
			</div>
		</div>
	);
};
