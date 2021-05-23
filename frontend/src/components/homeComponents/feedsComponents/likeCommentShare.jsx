import React, { useContext, useEffect, useState } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import './likeCommentShare.css';
import ChatIcon from '@material-ui/icons/Chat';
import ShareIcon from '@material-ui/icons/Share';
import postRoutes from '../../../apiCall/posts';
import userContext from '../../../helpers/userContext';

export default ({commentClicked, id, likes}) => {
    const [likeState , setLikeState] = useState(false);
    const [processLike, setProcessLike] = useState(false);
    const [commentState , setCommentState] = useState(false);
    const [shareState , setShareState] = useState(false);
    const [likeButtonClass , setLikeButtonClass] = useState("lcs-blocks");
    const [commentButtonClass , setCommentButtonClass] = useState("lcs-blocks");
    const [shareButtonClass , setShareButtonClass] = useState("lcs-blocks");

    const userDetails = useContext(userContext);
    const userEmail = userDetails.contactDetails ? userDetails.contactDetails.email : "";

    useEffect(() => {
        
        let check = likes.indexOf(userEmail);
        
        if(check<0){
            setLikeState(false);
            setLikeButtonClass("lcs-blocks");

        }else{
            setLikeState(true);
            setLikeButtonClass("lcs-blocks on-button");
        }
    }, [userEmail, likes]);

    const handleLikeClick = (State) => {
        if(State===false) {
            setProcessLike(true);
            postRoutes.postLike({postID : id , isLiked : true}).then((res)=>{
                if(res.likeRequest==="successfull"){
                    console.log("liked");
                    setLikeState(true);
                    setLikeButtonClass("lcs-blocks on-button");
                }
            }).catch(err => console.log({errorInLike: err})).finally(()=> setProcessLike(false));
           
        }else{
            setProcessLike(true);
            postRoutes.postLike({postID : id , isLiked : false}).then((res)=>{
                if(res.likeRequest==="successfull"){
                    console.log("disliked");
                    setLikeState(false);
                    setLikeButtonClass("lcs-blocks");
                }
            }).catch(err => console.log({errorInLike: err})).finally(()=> setProcessLike(false));

        }
        // if(State===true) {
        //     setLikeState(false);
            
        // }      
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
                Like <strong style={{"color":"grey"}}>{likes.length}</strong>
            </button>
            {/* <div className="noOfLike">
                <p>{likes.length}</p>
            </div> */}
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