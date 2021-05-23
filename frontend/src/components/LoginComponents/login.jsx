import React from 'react';
import './login.css';
import { useState } from 'react';
import SignUpForm from './signupForm';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import userRoutes from '../../apiCall/user';
import { Redirect, useHistory } from 'react-router-dom';

const Login = ({ reRunGetUser, loggedInState }) => {

	const [panel, changePanel] = useState("login_signup-container");
	const [loginFormValue, setLoginFormValue] = useState({});
	const [signupFormValue, setSignupFormValue] = useState({});
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const History = useHistory();

	const routeChange = (path) => {
		History.push(path);
	}

	//Login Form Controled
	const changedLoginForm = (event) => {
		if (event.target.name === 'email') {
			setLoginFormValue((prevValue) => {
				return {
					...prevValue,
					email: event.target.value
				};
			});
		} else {
			setLoginFormValue((prevValue) => {
				return {
					...prevValue,
					password: event.target.value
				}
			})
		}

	};

	//Signup Form Controled
	const changedSignupForm = (event) => {
		if (event.target.name === 'email') {
			setSignupFormValue((prevValue) => {
				return {
					...prevValue,
					email: event.target.value
				};
			});
		} else if (event.target.name === 'password') {
			setSignupFormValue((prevValue) => {
				return {
					...prevValue,
					password: event.target.value
				}
			})
		} else if (event.target.name === 'name') {
			setSignupFormValue((prevValue) => {
				return {
					...prevValue,
					name: event.target.value
				}
			})
		}
	};

	return <div className="login_signup__page">
		<h2>Welcome to Passion World</h2>
		<div className={panel} id="login_signup-container">
			<div className="form-container sign-up-container">

		

				{/* <form onChange={changedSignupForm} action="#">
					<h1>Create Account</h1>

					<span>use your email for registration</span>
					<input type="text" placeholder="Name" name="name" />
					<div className="datePicker">
						<label><p>Date Of Birth</p></label>
						<DatePicker selected={dateOfBirth} onChange={newDate => setDateOfBirth(newDate)} />
					</div>

					<input type="email" placeholder="Email" name="email" />
					<input type="text" placeholder="Password" name="password" />
					<button onClick={(event) => {
						event.preventDefault();
						userRoutes.postSignupRequest(signupFormValue.email, signupFormValue.password, signupFormValue.name, dateOfBirth)
							.then((res) => {
								if (true) {
									console.log("Logged in Block");
									loggedInState("loggedIn");
									History.push('/');
								} else {
									console.log("Not Logged in block");
									// reRunGetUser(false);
									History.push('/login');
								}
							})
					}} >
						Sign Up</button>
				</form> */}

				<SignUpForm setLog={(val) => loggedInState(val)} />

			</div>
			<div className="form-container sign-in-container">
				<form onChange={changedLoginForm} action="#">
					<h1>Sign in</h1>

					<span>use your account</span>
					<input type="text" placeholder="Email" name="email" />
					<input type="password" placeholder="Password" name="password" />
					<a href="#">Forgot your password?</a>
					<button onClick={async (event) => {
						event.preventDefault();
						userRoutes.postLoginRequest(loginFormValue.email, loginFormValue.password).then((res) => {
							if (res.isLoggedIn) {
								console.log("Logged in Block");
								loggedInState("loggedIn");
								History.push('/');
							} else {
								console.log("Not Logged in block");
								// reRunGetUser(false);
								History.push('/login');
							}
						});


					}}>Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					<div className="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button className="ghost" id="signIn" onClick={() => changePanel("login_signup-container")}>Sign In</button>
					</div>
					<div className="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button className="ghost" id="signUp" onClick={() => changePanel("login_signup-container right-panel-active")}>Sign Up</button>
					</div>
				</div>
			</div>
		</div>
		{/* To be removed from here  */}
		<footer>
			<p>
				Created by Passion World
				@ Login Signup Page
			</p>
		</footer>
	</div>
};

export default Login;






//####################################################------prev codes-------#################################################################


//----------------------------------------------------Call api to login------------------------------------------------------------------------


// function callLoginApi(newEmail, newPassword) {
	// 	axios.post('http://localhost:4000/login', {
	// 		email: newEmail,
	// 		password: newPassword
	// 	},
	// 		{
	// 			headers: {
	// 				'Access-Control-Allow-Origin': '*',
	// 				'Content-Type': 'application/json'
	// 			},
	// 			withCredentials: true
	// 		})
	// 		.then((response) => {
	// 			console.log(response);
	// 		}, (error) => {
	// 			console.log(error);
	// 		});
	// };


//----------------------------------------------------Call api to Signup-------------------------------------------------------------------------


// function callSignupApi(event, newEmail, newPassword, newName, newDate) {

// 	console.log(typeof (newName));
// 	console.log(typeof (newEmail));
// 	console.log(typeof (newPassword));
// 	console.log(typeof (newDate));

// 	console.log("Entered into Register API")
// 	axios.post('http://localhost:4000/register', {
// 		email: newEmail,
// 		password: newPassword,
// 		name: newName,
// 		dateOfBirth: newDate
// 	},
// 		{
// 			headers: {
// 				'Access-Control-Allow-Origin': '*',
// 				'Content-Type': 'application/json'
// 			},
// 			withCredentials: true
// 		})
// 		.then((response) => {
// 			console.log(response);
// 		}, (error) => {
// 			console.log(error);
// 		});
// 	// event.preventDefault();
// };



	//-------------------------------------------optional Social login html code--------------------------------------------------------


/* <div class="social-container">
	<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
	<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
	<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
</div> */

/* <div className="social-container">
	<a href="#" class="social"><i className="fab fa-facebook-f"></i></a>
	<a href="#" class="social"><i className="fab fa-google-plus-g"></i></a>
	<a href="#" class="social"><i className="fab fa-linkedin-in"></i></a>
</div> */



	//