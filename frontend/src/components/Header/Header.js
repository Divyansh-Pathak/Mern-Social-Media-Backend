import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import axios from 'axios';
import { Redirect, useHistory } from "react-router-dom";
import userContext from "../../helpers/userContext";
import logo from "../../icons/logo.png";
import icon from "../../icons/icon.png";
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupIcon from '@material-ui/icons/Group';
import InfoIcon from '@material-ui/icons/Info';
import userApi from '../../apiCall/user';


function Header({ loggedInState }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userDetails = useContext(userContext);
  const [userName, setUserName] = useState("User")


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();


  useEffect(() => {
    setUserName(userDetails.personalInformation ? userDetails.personalInformation.name : "noUser");
  }, [userDetails]);

  const handleLogout = () => {
    userApi.logoutRequest()
      .then((response) => {
        loggedInState("loggedOut");
        history.push("/");
      })
      .catch((err) => {
        console.log({ errorInLogout: err });
      })
  };

  return (
    <div className="header">

      <div className="header__left">
        <img className="header__name_logo" src={logo} alt="logo" />
      </div>

      <div className="navigations">
        <IconButton aria-label="delete" onClick={() => history.push("/home")}>
          <HomeIcon className="navigation_items" style={{ fontSize: '30px' }} />
        </IconButton>
        <IconButton>
          <InfoIcon onClick={() => history.push("/aboutUs")} className="navigation_items" style={{ fontSize: '30px' }} />
        </IconButton>
        <IconButton onClick={() => history.push("/community")}>
          <GroupIcon className="navigation_items" style={{ fontSize: '30px' }} />
        </IconButton>
      </div>

      {(userName !== "noUser") ? (
        <div className="header__Right">

          <div className="header__RightProfileImg">
            <Avatar
              className="header-avtar"
              src={`http://localhost:4000/image/${userDetails.profileImageURL}`}
              onClick={handleClick}
              style={{ height: "50px", width: "50px" }}
            >
              {userName.charAt(0)}
            </Avatar>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginTop: "20px" }}
          >
            <MenuItem onClick={() => {
              handleClose();
              history.push("/userProfile");
            }}>Profile</MenuItem>
            <hr style={{ margin: "0 auto", padding: 0, width: "70%" }}></hr>

            <MenuItem onClick={handleClose}>My account</MenuItem>

            <hr style={{ margin: "0 auto", padding: 0, width: "70%" }}></hr>

            <MenuItem onClick={() => {
              handleLogout();
              handleClose();
            }}>Logout</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button
          variant='contained'
          // color='primary'
          onClick={() => { history.push("/login") }}

          style={{ margin: "5px", padding: "5px 12px", color: "white", backgroundColor: "#FF416C" }}
        // startIcon={<PhotoSizeSelectActualIcon />}
        >
          Login/SignUp
        </Button>
      )}
    </div>
  );
}

export default Header;



//###############################################################################################################################################


//------------------------------------------------------------LOGO Source Image-------------------------------------------
//https://leadslive.io/wp-content/uploads/2017/05/Miniclip-8-Ball-Pool-Avatar-11.png