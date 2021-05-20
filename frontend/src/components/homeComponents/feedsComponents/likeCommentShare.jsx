import React, { useState } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './likeCommentShare.css';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';

export default ({commentClicked}) => {
    const [likeState , setLikeState] = useState(false);
    const [commentState , setCommentState] = useState(false);
    const [shareState , setShareState] = useState(false);
    const [likeButtonClass , setLikeButtonClass] = useState("lcs-blocks");
    const [commentButtonClass , setCommentButtonClass] = useState("lcs-blocks");
    const [shareButtonClass , setShareButtonClass] = useState("lcs-blocks");

    const handleLikeClick = (State) => {
        if(State===false) {
            setLikeState(true);
            setLikeButtonClass("lcs-blocks on-button");
        }
        if(State===true) {
            setLikeState(false);
            setLikeButtonClass("lcs-blocks");
        }      
    }

    const handleCommentClick = (State) => {
        if(State===false) {
            setCommentState(true);
            setCommentButtonClass("lcs-blocks on-button");
            commentClicked(true);
        }
        if(State===true) {
            setCommentState(false);
            setCommentButtonClass("lcs-blocks");
            commentClicked(false);
        }      
    }

    const handleShareClick = (State) => {
        if(State===false) {
            setShareState(true);
            setShareButtonClass("lcs-blocks on-button");
        }
        if(State===true) {
            setShareState(false);
            setShareButtonClass("lcs-blocks");
        }      
    }

    


    return <div className="like-comment-share">
        <div className={`${likeButtonClass} like`} onClick={() => handleLikeClick(likeState)}>
        <div className="lcs-icons">
                    <ThumbUpAltIcon />
                </div>
            <button className="lcs-button like-button">
               

                Like
            </button>
        </div>

        <div className={`${commentButtonClass} comment`} onClick={() => handleCommentClick(commentState)}>
            <div className="lcs-icons"> <ChatIcon /></div>
            <button className="lcs-button like-button">
                Comments
            </button>
        </div>

        <div className={`${shareButtonClass} comment`} onClick={() => handleShareClick(shareState)}>
        <div className="lcs-icons"> <ShareIcon /></div>
            <button className="lcs-button like-button">
           

                Share
            </button>
        </div>
    </div>
}