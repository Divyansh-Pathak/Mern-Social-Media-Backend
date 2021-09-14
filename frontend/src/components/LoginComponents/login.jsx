import React, { useContext } from 'react';
import './login.css';
import { useState } from 'react';
import SignUpForm from './signupForm';
import "react-datepicker/dist/react-datepicker.css";
import userRoutes from '../../apiCall/user';
import { useHistory } from 'react-router-dom';
import Footer from '../Header/Footer';
import { SnackbarContext } from '../HelperComponents/snackbar';


const Login = ({ loggedInState }) => {

	const setStateSnackbarContext = useContext(SnackbarContext);



	const [panel, changePanel] = useState("login_signup-container");
	const [loginFormValue, setLoginFormValue] = useState({});
	const [signupFormValue, setSignupFormValue] = useState({});
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const History = useHistory();

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


	return <div className="login-page-container">

		<div className="login_signup__page">

			<div className="left-container">
				<h2>Welcome</h2>
				<img src="loginilustrator.png"></img>



			</div>



			<div className={panel} id="login_signup-container">

				{/* SignUp Form */}
				<div className="form-container sign-up-container">
					<SignUpForm setLog={(val) => loggedInState(val)} />
				</div>

				{/* Login Form */}
				<div className="form-container sign-in-container">
					<form onChange={changedLoginForm} action="#">
						<h1>Sign in</h1>
						<span>use your account</span>
						<input type="text" placeholder="Email" name="email" />
						<input type="password" placeholder="Password" name="password" />
						<a href="#">Forgot your password?</a>
						<button className="my-login-button" onClick={async (event) => {
							event.preventDefault();
							userRoutes.postLoginRequest(loginFormValue.email, loginFormValue.password).then((res) => {
								if (res.isLoggedIn) {
									console.log("Logged in Block");
									loggedInState("loggedIn");
									History.push('/');
								}
								else {
									setStateSnackbarContext(
										true,
										res.errMessege.message,
										"warning"
									);
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




		</div>


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



//-----------------------------------------Changed signup and extra component after that---------------------------------------

// //Signup Form Controled
// const changedSignupForm = (event) => {
// 	if (event.target.name === 'email') {
// 		setSignupFormValue((prevValue) => {
// 			return {
// 				...prevValue,
// 				email: event.target.value
// 			};
// 		});
// 	} else if (event.target.name === 'password') {
// 		setSignupFormValue((prevValue) => {
// 			return {
// 				...prevValue,
// 				password: event.target.value
// 			}
// 		})
// 	} else if (event.target.name === 'name') {
// 		setSignupFormValue((prevValue) => {
// 			return {
// 				...prevValue,
// 				name: event.target.value
// 			}
// 		})
// 	}
// };


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
