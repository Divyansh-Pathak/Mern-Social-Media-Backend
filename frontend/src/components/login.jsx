import React from 'react';
import './login.css';
import { useState } from 'react';
import axios from 'axios';

async function getUser() {
	try {
	  const response = await axios.get('http://localhost:4000/user/add:443');
	  console.log(response);
	} catch (error) {
	  console.error(error);
	}
  };




 const Login = () => {

	const [panel , changePanel] = useState("container");

	getUser();

	// function signin() {changePanel("container")};
	// function signup() {changePanel("container right-panel-active")};
     return <div>
		<h2>Welcome to Sign in/up Form</h2>
		<div class={panel} id="container">
			<div class="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>
					<div class="social-container">
						<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
						<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
					</div>
					<span>use your email for registration</span>
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button >Sign Up</button>
				</form>
			</div>
			<div class="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>
					{/* <div class="social-container">
						<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
						<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
						<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
					</div> */}
					<span>use your account</span>
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button>Sign In</button>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button class="ghost" id="signIn"  onClick = {()=>changePanel("container")}>Sign In</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button class="ghost" id="signUp" onClick = {()=>changePanel("container right-panel-active")}>Sign Up</button>
					</div>
				</div>
			</div>
		</div>
{/* panelAfterClick("container right-panel-active") */}
		<footer>
			<p>
				Created by Divyansh
				@ Login Signup Page
			</p>
		</footer>
    </div>
};

export default Login;