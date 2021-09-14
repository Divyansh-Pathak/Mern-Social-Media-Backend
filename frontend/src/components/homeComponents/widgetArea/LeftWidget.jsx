import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import "./LeftWidget.css";
import userContext from "../../../helpers/userContext";
import { green, blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Icon from '@material-ui/core/Icon';
import { Link } from "react-router-dom";





const useStyles = makeStyles((muiBaseTheme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: muiBaseTheme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: blue[500],
        position: 'absolute',
        top: -6,
        left: -7,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    card: {
        maxWidth: 300,
        margin: "auto",
        transition: "0.3s",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        }
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        textAlign: "left",
        padding: muiBaseTheme.spacing.unit * 3
    },
    divider: {
        margin: `${muiBaseTheme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit
        },
        width: muiBaseTheme.spacing(10),
        height: muiBaseTheme.spacing(10),
        marginTop: "-10%",
    },
    small: {
        width: muiBaseTheme.spacing(3),
        height: muiBaseTheme.spacing(3),
    },
    large: {

    },
}));

export default () => {
    const classes = useStyles();
    const user = useContext(userContext);
    const userName = user.personalInformation ? user.personalInformation.name : "User";
    const aboutUser = user.Bio ? user.Bio : null;
    const userProfilePicURL = user.profileImageURL ? `http://localhost:4000/image/${user.profileImageURL}` : "https://cdn5.vectorstock.com/i/1000x1000/00/69/man-profile-cartoon-vector-19490069.jpg";
    const completeness = user.checkComplete ? user.checkComplete : {};
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [completenessValue, setCompletenessValue] = useState(0);
    const [read , setRead] = useState(false);

    const calCompleteness = ({ personalInformation,
        contactDetails,
        interests,
        Bio,
        profileImageURL,
        coverImageURL, }) => {



        const no = 4 + personalInformation + contactDetails + interests + Bio + profileImageURL;

        const c = Math.round((no / 9) * 100);

        return c;



    }


    useEffect(() => {
        const val = calCompleteness(completeness);
        setCompletenessValue(val);
        if (val !== 100) {
            setSuccess(false);
            setLoading(true);
        }
        if (val === 100) {
            setSuccess(true);
            setLoading(false);
        }

        console.log("Hello value ", val);
    }, [completeness])

    return (
        <aside class="widget-area">
            <div className="profile-card">
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={
                            "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                        }
                    />

                    <Avatar className={classes.avatar} src={userProfilePicURL} />

                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h6"}
                            gutterBottom
                        >
                            {userName}
                        </Typography>
                        {aboutUser ?
                            <Typography
                                className={"MuiTypography--subheading"}
                                variant={"caption"}
                            >
                                {read? aboutUser : aboutUser.substring(0, 90)}
                                {(aboutUser.length >90) ? <Link onClick={() => setRead((prev) => !prev)}>{read? "...Read Less" : "...Read More"}</Link>: <></>}
                            </Typography>
                            : <></>
                        }

                        <Divider className={classes.divider} light />
                        <h5>Profile Status</h5>
                        <div style={{marginLeft:"40px"}} className={classes.root}>
                            <div className={classes.wrapper}>
                                <Fab
                                    aria-label="save"
                                    color="secondary"
                                    className={success? classes.buttonSuccess : null}
                                    // onClick={handleButtonClick}
                                >
                                    {success ? <CheckIcon /> : <Icon style={{ color: "#fff", padding: "0" }} ><p style={{fontSize:"18px"}}>{completenessValue}</p></Icon>}
                                </Fab>
                                {<CircularProgress size={68} variant="determinate" value={completenessValue} className={classes.fabProgress} />}
                            </div>

                        </div>
                        <p>Your Profile is {completenessValue} % complete</p>

                    </CardContent>
                </Card>
            </div>


        </aside>
    );
}









// <div class="card card-profile widget-item p-0">
//                   <div class="profile-banner">
//                       <figure class="profile-banner-small">
//                           <a href="profile.html">
//                               <img src="https://cultivatedculture.com/wp-content/uploads/2020/06/LinkedIn-Banner-Image-Example-of-Someone-Hiking-In-The-Mountains.png" alt=""/>
//                           </a>
//                           <a href="profile.html" class="profile-thumb-2">
//                               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2BM0rkhOz_yrzecDNNxiddeX8LqaDrPyphCzwIpT7eB3H2giYlEmuM6B0L7ESCYd_4oI&usqp=CAU" alt=""/>
//                           </a>
//                       </figure>
//                       <div class="profile-desc text-center">
//                           <h6 class="author"><a href="profile.html">Dimbel Lebmid</a></h6>
//                           <p>Any one can join with but Social network us if you want Any one can join with us if you want</p>
//                       </div>
//                   </div>
//               </div>