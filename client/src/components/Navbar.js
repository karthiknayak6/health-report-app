import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
	let navigate = useNavigate();
	const handleLogOut = () => {
		fetch("http://localhost:5000/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response);
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<nav
				className="navbar  navbar-expand-lg   bg-body-tertiary"
				style={{ backgroundColor: "#de6fde" }}
			>
				<div className="container-fluid">
					<NavLink className="navbar-brand" to="#">
						<b>Demo</b>
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link active" aria-current="page" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/about">
									About
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/contact">
									Contact Us
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/login">
									Login
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/signup">
									Registration
								</NavLink>
							</li>
							<li className="nav-item">
								<button
									style={{ cursor: "pointer" }}
									onClick={handleLogOut}
									className="nav-link"
								>
									Log out
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
