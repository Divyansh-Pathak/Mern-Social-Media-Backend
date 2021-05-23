import React, { useState } from "react";
import "./TextPost.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import postRoutes from '../../../apiCall/posts';
import SelectTags from './selectTag';

function TextPost({ user }) {

  const [progress, setProgress] = useState(100);
  const [tagIsTouched , setTagTouched] = useState(false);
  const [tags , setTags] = useState([]);
  // let tags = new Array;
  function getTags(values) {
      setTags(values);  
  }




  const [textArea, setTextArea] = useState("");
  const textAreaChanged = (event) => {
    setTextArea(event.target.value);
  };

  const [tagsOptions, setTagOptions] = useState(
    [{ value: 'Reading Books', label: 'Reading Books' },
    { value: 'Football', label: 'Foodball' },
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Painting', label: 'Painting' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Public Speaking', label: 'Public Speaking' }])


  function uploadFile(caption, tags, userName, setProgress) {
    if(caption!==""){
      postRoutes.postText(caption, tags, userName, setProgress);
    }else{
      alert("Write in the textarea!");
    }
   
  };

  return (
    <div className="app__createPost">
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

              {(tagIsTouched&&(tags.length===0))&&
                <p>*Select atleast one tag</p>
              }

              <textarea
                className="createAPost__textarea"
                name="create a post"
                rows="4"
                value={textArea}
                placeholder="Share Your Thoughts..."
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
              <button
                className="button"
                onClick={() => uploadFile(textArea, tags, user, setProgress)}
                disabled= {tagIsTouched&&(tags.length===0)}
              >
                Upload
              </button>
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