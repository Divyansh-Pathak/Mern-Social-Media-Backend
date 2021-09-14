import React, { useContext, useEffect, useState } from "react";
import "./TextPost.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import postRoutes from '../../../apiCall/posts';
import SelectTags from './selectTag';
import dataRoutes from '../../../apiCall/dataFromBackend';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button, makeStyles } from "@material-ui/core";
import { SnackbarContext } from "../../HelperComponents/snackbar";
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#FF4B2B',
      borderRadius: 20,
      border: 0,
      color: 'white',
      fontSize: "80%",
      height: 40,
      padding: '0 15px',
      width: "25%",
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      overflow: "hidden",
      margin: "5px"
  },
}));

function TextPost({ user }) {

  const classes = useStyles();
  const setStateSnackbarContext = useContext(SnackbarContext);

  const [progress, setProgress] = useState(100);
  const [tagIsTouched, setTagTouched] = useState(false);
  const [tags, setTags] = useState([]);
  // let tags = new Array;
  function getTags(values) {
    setTags(values);
  }




  const [textArea, setTextArea] = useState("");
  const textAreaChanged = (event) => {
    setTextArea(event.target.value);
  };

  const [tagsOptions, setTagOptions] = useState([])
  useEffect(() => {
    //Calling communities options from the server and pushing it in communitiesOptions array such that it can be used with react-select
    dataRoutes.requestAllCommunities().then((response) => {
      response.map((interests) => {
        tagsOptions.push({
          value: interests.communityName,
          label: interests.communityName,
        });
      });
    }).catch(err => console.log("Something went wrong during calling interests Data", err))
  }, []);



  function uploadFile(caption, tags, userName, setProgress) {
    if (caption !== "") {
      postRoutes.postText(caption, tags, userName, setProgress);
      window.location.reload();
    } else {
      setStateSnackbarContext(
        true,
        "Write something in textarea",
        "warning"
    );
    }

  };

  return (
    <div className="app__createPost-text">
      {user ? (
        <div className="App">
          <div className="imageUpload">

            <div className="createAPost__Top">
              <p>What's in your mind? Share Here!!!!!</p>
            </div>

            <div className="createAPost__center">
              <SelectTags
                name="tags"
                onChange={getTags}
                onBlur={(value) => setTagTouched(value)}
                options={tagsOptions}
              />

              {(tagIsTouched && (tags.length === 0)) &&
                <p style={{color:"red"}}>*Select atleast one tag</p>
              }

              <textarea
                className="createAPost__textarea"
                name="create a post"
                rows="4"
                value={textArea}
                placeholder="   Share Your Thoughts..."
                onChange={(event) => textAreaChanged(event)}
              ></textarea>

              {/* <div className="imagePreview">
                {progress === 100 ? (
                  <></>
                ) : (
                  <CircularProgress
                    className="circularProgress"
                    variant="determinate"
                    value={progress}
                  />
                )}
              </div> */}
            </div>



            <div className="imageUpload__bottom">
              <Button
               color="#FF4B2B"
                variant="contained"
                className={classes.button}
                startIcon={<PostAddIcon />}
                onClick={() => uploadFile(textArea, tags, user, setProgress)}
                disabled= {(tags.length===0)}
              >
                Post
              </Button>

              {/* <button
                className="button"
                onClick={() => uploadFile(textArea, tags, user, setProgress)}
                disabled= {tagIsTouched&&(tags.length===0)}
              >
                Upload
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <AuthDialogs label="Login/Register" /> */}
          <p>Login or register to Post</p>
        </div>
      )}
    </div>
  );
}

export default TextPost;






//---------------------------------------------------------------------------------------------------------------------------------------------------

// const uploadFile = (getfile, caption, tags, userName, setProgress) => {
  //   console.log("getfile in upload", getfile);
  //   let formData = new FormData();
  //   for (let i = 0; i < getfile.length; i++) {
  //     formData.append('files', getfile[i])
  //   }
  //   formData.append("caption", caption);
  //   formData.append("tags", tags);
  //   formData.append("uploadedBy", userName);
  //   axios.post("http://localhost:4000/upload", formData, {
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       "content-type": "multipart/form-data"
  //     },
  //     onUploadProgress: function (progressEvent) {
  //       let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //       setProgress(percentCompleted);
  //       console.log("This IS progress event", percentCompleted);
  //     },
  //     withCredentials: true
  //   }).then((response) => {
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };