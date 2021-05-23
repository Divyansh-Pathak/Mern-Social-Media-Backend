import React, { useContext, useEffect, useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import userContext from "../../helpers/userContext";
import logo from "../../icons/logo.png";
import icon from "../../icons/icon.png";




function Header({loggedInState}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userDetails = useContext(userContext);
  const [userName , setUserName]= useState("User")
 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const routeChange = () =>{ 
    history.push("/userProfile");
  }
  

  useEffect(() => {
    console.log("UserDetails from header", userDetails);

    setUserName(userDetails.personalInformation ? userDetails.personalInformation.name : "noUser");

  }, [userDetails])

  const handleLogout = () => {
    axios.get('http://localhost:4000/logout',
    {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((response) => {
      console.log("Logout Executed")
      loggedInState("loggedOut");
    }, (error) => {
    console.log(error);
  });
};

  return (
    <div className="header">

      <div className="header__left">
        <img
          className="header__LeftLogo"
         
         
          src={icon}
          alt="icon"
        />
        {/* <h3>Passion World</h3> */}

        <img className="header__name_logo" src={logo}  alt="logo"/>

      </div>
     
      {(userName!=="noUser") ? (
        <div className="header__Right">
          {/* <button className="button" onClick={() => auth.signOut()}>
            
          </button> */}

          <Avatar
            className="header__RightProfileImg"
            onClick={handleClick}
            style={{ height: "25px", width: "25px" }}
          >
          {userName.charAt(0)}
          </Avatar>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{
              handleClose();
              routeChange();
            }}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => {
              handleLogout();
              handleClose();
              }}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <p>Login/Register first</p>
      )}
    </div>
  );
}

export default Header;



//###############################################################################################################################################


//------------------------------------------------------------LOGO Source Image-------------------------------------------
//https://leadslive.io/wp-content/uploads/2017/05/Miniclip-8-Ball-Pool-Avatar-11.png