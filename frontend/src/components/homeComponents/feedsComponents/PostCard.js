import React, { useState } from "react";
import "./PostCard.css";
import Avatar from "@material-ui/core/Avatar";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import LikeCommentShare from "./likeCommentShare";


function Post({ id, userName, postImageUrl, postFileType, caption, comments, user }) {

  const [commentInput, setCommentInput] = useState(false);

  const [postIterator, setPostIterator] = useState(0);

  const handleIterator = (click) => {
    let maxIteration = postImageUrl ? postImageUrl.length : 0;
    if (click === 'next') {
      setPostIterator((prevValue) => prevValue + 1);
    } else if (click === 'prev') {
      setPostIterator((prevValue) => prevValue - 1);
    }
  }

  const showCommentInput = (click) => {
    console.log("showCommentInput", click);
    setCommentInput(click);
  }

  const addComment = (newComment) => {
    comments.push(newComment);
  }

  return (
    <div className="post card">
      <div className="post__header align-items-center d-flex">

        <div class="profile-thumb">
          <Avatar
            alt={userName.toLowerCase()}
          // style={{ height: "25px", width: "25px" }}
          >
            {userName.charAt(0)}

          </Avatar>

        </div>




        <div className="post-author">
          <h6 class="author">
            <a href="/userProfile">{userName}</a>
          </h6>
          <span class="post-time">20 min ago</span>
        </div>

      </div>


      {/* caption */}
      <div className="post-content">
        <p className="post-desc">{caption}</p>

        

        {/* Image Iterator */}
        {(postImageUrl.length > 1) ?
        <div className="iterator-button">
          <button disabled={postIterator === 0} onClick={() => handleIterator('prev')}>
            prev
            </button>
          <button disabled={postIterator === postImageUrl.length - 1} onClick={() => handleIterator('next')}>
            next
            </button>
        </div>
        : <></>}

        {/* image */}


          {postFileType[0]==="text"? 
          <></>:
          
        <div class="post-thumb-gallery">

        




          {(postFileType[postIterator] === "video/mp4") ?

            <figure class="post-thumb video-popup">

              <video controls>
                <source src={`http://localhost:4000${postImageUrl[postIterator]}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>


            </figure>

            : <figure class="post-thumb img-popup">
              <a href={`http://localhost:4000${postImageUrl[postIterator]}`}>
                <img src={`http://localhost:4000${postImageUrl[postIterator]}`} alt="post image" />
              </a>
            </figure>
          }
        </div>}
      </div>

      <div class="post-meta">

        <LikeCommentShare commentClicked={showCommentInput} />

      </div>



      {(commentInput) ? <CommentInput id={id} user={user} getComment={addComment} /> : <></>}


      {/* username + caption */}





      {/* comment of the post */}

      <div className="comment-box">

        {(comments.length !== 0) ? (
          comments.map((comment, i) => (
            <Comment key={i} username={comment.commentByUser.userName} comment={comment.comment} />
          ))
        ) : (
          <p>No Comments yet...</p>
        )}

      </div>





    </div>
  );
}

export default Post;


//##########################################################################################################################################

{/* <div className="post__bottom">
<Avatar
      alt={userName.toLowerCase()}
      style={{ height: "25px", width: "25px" }}
    >
      {userName.charAt(0)}
    </Avatar>
    <h5><strong>{userName}</strong></h5>
  <p>{caption}</p>
</div> */}





// <button class="post-meta-like">
//           <i class="bi bi-heart-beat"></i>
//           <span>You and 201 people like this</span>
//           <strong>201</strong>
//         </button>
//         <ul class="comment-share-meta">
//           <li>
//             <button class="post-comment">
//               <i class="bi bi-chat-bubble"></i>
//               <span>41</span>
//             </button>
//           </li>
//           <li>
//             <button class="post-share">
//               <i class="bi bi-share"></i>
//               <span>07</span>
//             </button>
//           </li>
//         </ul>