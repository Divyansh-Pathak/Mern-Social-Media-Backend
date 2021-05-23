import React, { useState } from 'react';
import './sharePost.css';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import CreatePost from './CreatePost';
import TextPost from './TextPost';


const SharePost = ({user}) => {
    const [postType , setPostType] = useState("");

    return (
        <div>
            <div className={"share-post-main-div"}>
                <h5>Share your thoughts</h5>

                <div className={'share-post-selector-div'}>

                <button className={'share-post-select-button'} onClick={() => setPostType("photo")}>

                <div className={'share-post-select-button-content'}>
                        <PhotoLibraryIcon />
                        <p>Photos</p>
                        <p>/</p>
                        <p>Videos</p>
                    </div>

                </button>


                    <button className={'share-post-select-button'} onClick={() => setPostType("text")}>
                    <div className={'share-post-select-button-content'}>
                        <ChromeReaderModeIcon />
                        <p>Text/Thoughts</p>
                    </div>

                    </button>

                  

                </div>

                {postType===""?
            <></>:(postType==="photo" ? <CreatePost user={user} />: <TextPost user={user}/>)
            }


            </div>
           
        </div>
    );
};

export default SharePost;