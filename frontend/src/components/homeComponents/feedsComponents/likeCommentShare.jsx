import React, { useContext, useEffect, useState } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './likeCommentShare.css';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import postRoutes from '../../../apiCall/posts';
import userContext from '../../../helpers/userContext';
import { Badge, Button, IconButton } from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const useStyles = makeStyles((theme) => ({
    lcsButtons: {
        [theme.breakpoints.between("xs",'sm')]: {
            padding: "10px",
            fontSize: "8px",
           
          },
        
    
        [theme.breakpoints.between("sm",'md')]: {
            padding: "0px",
            fontSize: "12px",
           
          },
          [theme.breakpoints.between('md',"lg")]: {
            padding: "0px",
            fontSize: "10px",
           
          },  

          
    },
      
}));


const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#FF4B2B',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
    breakpoints: {
        values: {
          xs: 490,
          sm: 600,
          md: 991,
          lg: 1280,
          xl: 1920,
        },
      },
  });

export default ({ commentClicked, id, likes }) => {
    const classes = useStyles();
    const [likeState, setLikeState] = useState(false);
    const [processLike, setProcessLike] = useState(false);
    const [commentState, setCommentState] = useState(false);
    const [shareState, setShareState] = useState(false);
    const [likeButtonClass, setLikeButtonClass] = useState("lcs-blocks");
    const [commentButtonClass, setCommentButtonClass] = useState("lcs-blocks");
    const [shareButtonClass, setShareButtonClass] = useState("lcs-blocks");

    const userDetails = useContext(userContext);
    const userEmail = userDetails.contactDetails ? userDetails.contactDetails.email : "";

    useEffect(() => {

        let check = likes.indexOf(userEmail);

        if (check < 0) {
            setLikeState(false);
            setLikeButtonClass("lcs-blocks");

        } else {
            setLikeState(true);
            setLikeButtonClass("lcs-blocks on-button");
        }
    }, [userEmail, likes]);

    const handleLikeClick = (State) => {
        if (State === false) {
            setProcessLike(true);
            postRoutes.postLike({ postID: id, isLiked: true }).then((res) => {
                if (res.likeRequest === "successfull") {
                    console.log("liked");
                    setLikeState(true);
                    likes.push("one more");
                    setLikeButtonClass("lcs-blocks on-button");
                }
            }).catch(err => console.log({ errorInLike: err })).finally(() => setProcessLike(false));

        } else {
            setProcessLike(true);
            postRoutes.postLike({ postID: id, isLiked: false }).then((res) => {
                if (res.likeRequest === "successfull") {
                    console.log("disliked");
                    setLikeState(false);
                    setLikeButtonClass("lcs-blocks");
                }
            }).catch(err => console.log({ errorInLike: err })).finally(() => setProcessLike(false));

        }
        // if(State===true) {
        //     setLikeState(false);

        // }      
    }

    const handleCommentClick = (State) => {
        if (State === false) {
            setCommentState(true);
            setCommentButtonClass("lcs-blocks on-button");
            commentClicked(true);
        }
        if (State === true) {
            setCommentState(false);
            setCommentButtonClass("lcs-blocks");
            commentClicked(false);
        }
    }

    const handleShareClick = (State) => {
        if (State === false) {
            setShareState(true);
            setShareButtonClass("lcs-blocks on-button");
        }
        if (State === true) {
            setShareState(false);
            setShareButtonClass("lcs-blocks");
        }
    }




    return <div className="like-comment-share">
    <MuiThemeProvider theme={theme}>




   
    <Button
                variant= 'text'
                fullWidth={true}
                color={likeState?"secondary":"default"}
                className={classes.lcsButtons}
                startIcon={<ThumbUpAltIcon />}
                size = "small"
                // style={{width : "20%"}}
                onClick={() => handleLikeClick(likeState)}
            >
            
                Like<Badge style={{marginLeft: "15px", fontWeight: "bold"}} color="secondary" badgeContent={likes.length}>
            </Badge>
            
                
            </Button>
    
                   
            
               
            
            <Button
                fullWidth={true}
                color={commentState?"secondary":"default"}
                className={classes.lcsButtons}
                // style={{width : "100%"}}
                startIcon={<ChatIcon />}
                onClick={() => handleCommentClick(commentState)}
            >
                comment
            </Button>
        

            

           

         
             
            {/* <div className="shareButton">
            <Button
                variant={shareState?"contained":null}
                color={shareState?"secondary":"secondary"}
                className={classes.lcsButtons}
                startIcon={<ShareIcon />}
                onClick={() => handleShareClick(shareState)}
            >
                Share
            </Button>
            </div> */}
           
            

            </MuiThemeProvider>
       

        
    </div>
}