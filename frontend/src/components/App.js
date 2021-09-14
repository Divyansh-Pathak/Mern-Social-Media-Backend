import './App.css';
import Login from './LoginComponents/login';
import Home from "./homeComponents/Home";
import Header from "./Header/Header";
import Cheak from '../Cheakers/check';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from 'react';
import userRoute from '../apiCall/user';
import userContext from '../helpers/userContext';
import ProtectedRoute from '../helpers/protectedRoutes';
import userProfilePage from './userProfilePageComponents/userProfilePage';
import Community from './CommunityComponent/Community';
import AboutUs from './AboutUs/aboutus';
import ContactUs from './AboutUs/contactus';
import CommunityPage from './CommunityComponent/CommunityPage';

function App() {

  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState("checking");
  const [isLoading, setLoading] = useState(false);

  const getUser = async () => await userRoute.getUser();

  function runGetUser(condition) {

    if (condition) {
      setLoading(true);
      userRoute.getUser().then((data) => {
        if (data === 'noUser') {
          setUser('noUser');
        } else {
          setUser(data);
        }
        return data;
      }).finally(() => {
        setLoading(false);
      });
    }
    else {
      console.log("Not looged In");
    }

  }

  useEffect(() => {
    if (isLoggedIn === "checking") {
      getUser().then((res) => {
        if (res === 'noUser') {
          setLoggedIn("loggedOut");
          setUser(res);
        } else {
          setLoggedIn("loggedIn");
          setUser(res);
        }

      })


    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === "loggedIn") {
      runGetUser(true);
      <Redirect to='/home' />

    } else if (isLoggedIn === 'loggedOut') {
      setUser("noUser");
      <Redirect to='/login' />

    }
  }, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps


  return (

    <Router>
      <userContext.Provider value={user}>
        <div className="App">
          <Header loggedInState={(val) => setLoggedIn(val)} />
          <div className="main-wrapper">
            <Switch>
              <Route exact path="/" component={() => {
                if (isLoggedIn === 'loggedOut') return <Redirect to='/login' />
                else if (isLoggedIn === "loggedIn") return <Redirect to='/home' />
                else return <></>
              }} />
              <Route exact path="/login" component={() => <Login loggedInState={(val) => setLoggedIn(val)} />} />
              <Route exact path='/check' component={Cheak} />
              <ProtectedRoute exact path="/home" component={Home} isAuthenticated={isLoggedIn} Cheakingone={"Check This also"} />
              <Route exact path='/userProfile' component={userProfilePage} />
              <Route exact path='/community' component={Community} />
              <Route exact path='/AboutUs' component={AboutUs} />
               <Route exact path='/ContactUs' component={ContactUs} />
               <Route path="/communityPage" component={CommunityPage} />
            </Switch>

          </div>

        </div>
      </userContext.Provider>
    </Router>


  );
}

export default App;


//####################################################

{/* <Route exact path="/" render={()=>(user !== "noUser") ? <Home/> : <Login/>}  />
<Route exact path="/signup" component={Login} /> */}

// const getUser = async () => {
// 	await axios.get('http://localhost:4000/user',
// 		{
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json'
// 			},
//       withCredentials: true
// 		})
// 		.then((response) => {
//       console.log("This is get USer function")
//       if(response.status === 200){
//       const userName= response.data.personalInformation.name;
//       //const userName = "1";
// 		console.log("Hello Chutiye" + response);
//     console.log(userName);
//     return(userName);
//       }else{
//         console.log("Else Ka response")
//         console.log(response);
//       }

// 		}).catch((error) => {
//       console.log("Error Aaya error")
//       console.log(error);
//       setUser(() => {
//         return "No User";
//       })
//     });
//   };







// getUser().then((data) => {
//   setUser(data);
//   // if(data === "noUser"){
//   //   <Redirect to='/login'/>
//   // }else{
//   //   <Redirect to='/home'/>
//   // }






{/* <Route exact path="/" component={({redirectState}) => {
           
                if (user === 'noUser'|| user === {}) return <Redirect to='/login' />
              else return <Redirect to='/home' />

              
             
            }} /> */}