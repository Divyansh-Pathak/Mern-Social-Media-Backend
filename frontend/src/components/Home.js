import React, { useState, useEffect, useContext } from "react";
import Feed from "./homeComponents/Feed";
import CreatePost from "./homeComponents/createPostComponents/CreatePost";
import './Home.css';
import CompleteUserProfile from './homeComponents/completeUserProfileComponents/CompleteUserProfile';
import userContext from "../helpers/userContext";
import { Redirect, useHistory } from "react-router";
// import InterestBox from "./homeComponents/interestBox";



function Home() {
  const userDetails = useContext(userContext);
  const user = userDetails.personalInformation ? userDetails.personalInformation.name : "User";
  const [profileComplete, setProfileComplete] = useState(true);

  const History = useHistory();

  useEffect(() => {
    console.log("user details from home", userDetails);
    if (userDetails.checkComplete) {
      setProfileComplete(userDetails.checkComplete.community);
    }

  }, [user]);
    return (
      <div className="home">
        {(!profileComplete) ? <CompleteUserProfile close={() => setProfileComplete(true)} /> : <></>}

        

        <div className="home-body">

        {/* <InterestBox/> */}
          <div className="home-center">
            <CreatePost user={user} />
            <Feed user={user} />
          </div>

        </div>
      </div>
    );

  }

export default Home;







//#######################################################---Prev Codes---###############################################################################

//-------------------------------------------------------Api Calls to user-----------------------------------------------------------------------

// setUser(props.userName);
  // const getUser = async () => {

  //   await axios({
  //     method: 'get',
  //     baseURL:  'http://localhost:4000',
  //     url:"/user",

  //   })
	// 	// await axios.get('http://localhost:4000/user',
	// 	// 	{
	// 	// 	headers: {
	// 	// 		'Access-Control-Allow-Origin': '*',
  //   //     'Content-Type': 'application/json'
	// 	// 		},
  //   //     withCredentials: true
	// 	// 	})
	// 		.then((response) => {
  //       console.log("This is get USer function")
  //       if(response.data!==""){
  //       const userName= response.data.personalInformation.name;
  //       //const userName = "1";
	// 		console.log(response);
  //     console.log(userName);
  //     return(userName);
  //       }else{
  //         console.log("Kuch Nhi h");
  //         return(null);
  //       }
	// 		}, (error) => {
	// 		console.log(error);
	//   });
	// };

  // useEffect(() => {

  //   const userName = getUser();
  //   console.log(userName);
  //   let authUser;

  //   if(userName !== null){
  //    authUser = userName;
  //    console.log("This is useEffect Function")
  //    console.log(userName);
  //   }else{
  //     authUser = null;
  //     console.log("No Response")
  //   }
  //   // const authUser = "1";


  //   if (authUser) {
  //     // user has logged in...
  //     console.log(authUser);
  //     setUser(authUser);
  //     console.log("user has logged in");
  //   } else {
  //     // user has logged out..
  //     setUser(null);
  //     console.log("user has logged out");
  //   }

  //   return console.log("Home Page Use Effect");
  // }, []);

  //_____________________________________________________________Need This________________________________________________________________________

   // personalInformation: "incomplete",
    // contactDetails: "incomplete",
    // hobbies: "incomplete",
    // Bio: "incomplete",
    // profileImageURL: "incomplete",
    // coverImageURL: "incomplete",
    // following: "incomplete",
    // community: "incomplete",


    //-----------------------------------------------
      // const checkComplete = userDetails.checkComplete;
      // if(userDetails!=={}){
      //   if(userDetails.checkComplete.personalInformation==="incomplete"||checkComplete.contactDetails === "incomplete" || checkComplete.hobbies === "incomplete"||
      // checkComplete.Bio === "incomplete"|| checkComplete.profileImageURL === "incomplete"|| checkComplete.coverImageURL === "incomplete" ||
      // checkComplete.following === "incomplete"|| checkComplete.community === "incomplete"){
      //   setComplete(false);
      // }

      // }


       //const getUser =  () => userRoute.getUser();

//   useEffect(() => {
//  const data =   userRoute.getUser()
// //  .then((data) => {
// //       console.log(data);
// //       setUserDetails(data);
// //     });

// console.log("Home is here");

// setUserDetails(data);

    //setTimeout(setComplete(false) , 50000);

  // }, []);