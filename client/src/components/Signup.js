import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
				navigate("/login");
				toast("Registration successful")
			})
			.catch((error) => {
				console.log(error);
				toast("Registration Unsucsessful")
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
					<label htmlFor="inputusername" className="form-label" >
							Username
						</label>
						<input
							type="text"
							className="form-control text-bg-light p-2"
							name="username"
							required
							aria-label="username"
							value={user.username}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-5 ">
					<label htmlFor="inputfullname" className="form-label" >
							Full name
						</label>
						<input
							type="text"
							className="form-control text-bg-light p-2"
							name="name"
							required
							aria-label="First name"
							value={user.name}
							onChange={handleInputs}
						/>
					</div>

					<div className="col-md-5">
					<label htmlFor="inputclinicname" className="form-label" >
							Clinic name
						</label>
						<input
						
							type="text"
							className="form-control text-bg-light p-2"
							name="clinicname"
							required
							aria-label="Clinics name"
							value={user.clinicname}
							onChange={handleInputs}
						/>
					</div>
					<div className="col-md-5">
						<label htmlFor="inputEmail4" className="form-label" >
							Email
						</label>
						<input
							type="email"
							className="form-control p-2"
							id="inputEmail4"
							required
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
							required
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
							required
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
							className="form-control p-3"
							id="inputAddress"
							name="clinicaddress"
							required
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
							type="tel"
							className="form-control"
							name="contact"
							required
							id="inputCity"
							value={user.contact}
							onChange={handleInputs}
						/>
					</div>

				
					<div className="col-12">
						<button type="submit" className="btn btn-primary"
						>
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
			<ToastContainer />
		</div>
		
	);
};
