import React, { useState } from "react";
import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import RenderHome from "./components/RenderHome";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Signup } from "./components/Signup";
import { Contact } from "./components/Contact";
import { Login } from "./components/Login";
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/About" element={<About />} />
				<Route path="/Contact" element={<Contact />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Signup" element={<Signup />} />
			</Routes>
		</>
	);
}

export default App;
