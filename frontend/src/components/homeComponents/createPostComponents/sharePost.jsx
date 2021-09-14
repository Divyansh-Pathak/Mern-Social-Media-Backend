import React, { useState } from 'react';
import './sharePost.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CreatePost from './CreatePost';
import TextPost from './TextPost';
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 20,
        border: 0,
        color: 'white',
        fontSize: "80%",
        height: 48,
        padding: '0 15px',
        width: "40%",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        overflow: "hidden",
    },
}));

const SharePost = ({user}) => {
    const classes = useStyles();
    const [postType , setPostType] = useState("");

    return (
        <div>
            <div className={"share-post-main-div"}>
                <h5>Share your thoughts</h5>

                <div className={'share-post-selector-div'}>

                <Button
                onClick={() => setPostType("photo")}
                className={classes.root}
        variant="contained"
        color="#FF4B2B"
        // className={classes.button}
        startIcon={<PhotoLibraryIcon />}
      >
        Photo/Video
      </Button>

                {/* <button className={'share-post-select-button'} onClick={() => setPostType("photo")}>

                <div className={'share-post-select-button-content'}>
                        <PhotoLibraryIcon />
                        <p>Photos</p>
                        <p>/</p>
                        <p>Videos</p>
                    </div>

                </button> */}


                    {/* <button className={'share-post-select-button'} onClick={() => setPostType("text")}>
                    <div className={'share-post-select-button-content'}>
                        <ChromeReaderModeIcon />
                        <p>Text/Thoughts</p>
                    </div>

                    </button> */}

                    <Button
                    onClick={() => setPostType("text")}
                className={classes.root}
        variant="contained"
        color="#FF4B2B"
        // className={classes.button}
        startIcon={<ChromeReaderModeIcon />}
      >
        Text/Thoughts
      </Button>

                  

                </div>

                {postType===""?
            <></>:(postType==="photo" ? <CreatePost user={user} />: <TextPost user={user}/>)
            }


            </div>
           
        </div>
    );
};

export default SharePost;