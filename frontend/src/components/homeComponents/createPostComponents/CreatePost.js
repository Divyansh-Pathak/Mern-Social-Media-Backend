import React, { useState } from "react";
import "./CreatePost.css";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tagdropdown from './tagdropdown';
import postRoutes from '../../../apiCall/posts';
import SelectTags from './selectTag';

function CreatePost({ user }) {

  const [progress, setProgress] = useState(100);
  const [tagIsTouched , setTagTouched] = useState(false);
  const [tags , setTags] = useState([]);
  // let tags = new Array;
  function getTags(values) {
      console.log("from cricket",values);
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


  const [images, setImages] = useState(null);
  const [prevImage, setPrev] = useState([]);
  const fileSelected = (event) => {
    setImages(event.target.files);
    setPrev([...event.target.files]);
    console.log({images: prevImage});
  };


  function uploadFile(getfile, caption, tags, userName, setProgress) {
    if(getfile){
      postRoutes.postPosts(getfile, caption, tags, userName, setProgress);
    }else{
      alert("Please select an image...");
    }
   
  };

  function deleteFile(e) {
    const s = prevImage.filter((item, index) => index !== e);
    setPrev(s);
    console.log(s);
  };

  return (
    <div className="app__createPost">
      {user ? (
        <div className="App">
          <div className="imageUpload">

            <div className="createAPost__Top">
              <p>Create a Post</p>
            </div>

            <div className="createAPost__center">
              {/* <Tagdropdown reciveTags={getTags} /> */}

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
                rows="2"
                value={textArea}
                placeholder="Enter a caption..."
                onChange={(event) => textAreaChanged(event)}
              ></textarea>

              <div className="imagePreview">
                {prevImage ?
                  prevImage.map((image, i) => <div key={i} display="flex" flexDirection="row">
                    <img src={URL.createObjectURL(image)} onClick={() => console.log("Preview Image Clicked")} id="image-1-preview" alt="imagePreview" />
                    <button type="button" onClick={() => deleteFile(i)}>
                      delete
                </button>
                  </div>
                  )
                  : <></>}
                {progress === 100 ? (
                  <></>
                ) : (
                  <CircularProgress
                    className="circularProgress"
                    variant="determinate"
                    value={progress}
                  />
                )}
              </div>
            </div>

            <div className="imageUpload__bottom">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <CameraAltIcon style={{ marginTop: "5px" }} />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept="image/*,video/*"
                  name="file"
                  onChange={(e) => fileSelected(e)}
                  multiple='multiple'
                />

              </div>

              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}

              <button
                className="button"
                onClick={() => uploadFile(images, textArea, tags, user, setProgress)}
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

export default CreatePost;






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