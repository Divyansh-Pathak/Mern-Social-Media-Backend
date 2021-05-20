import React, { useState } from "react";
import "./Post.css";
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
    <div className="post">
      <div className="post__header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userName.toLowerCase()}
            style={{ height: "25px", width: "25px" }}
          >
            {userName.charAt(0)}
          </Avatar>

          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}>{userName}</p>
          </div>
        </div>
      </div>


      {/* headr --> avatar + username + time */}
      <div className="post__bottom">
        <p>{caption}</p>
      </div>

      {/* file Iterator */}

      {(postImageUrl.length !== 0) ?

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

      {(postFileType[postIterator] === "video/mp4") ?
        <video controls>
          <source src={`http://localhost:4000${postImageUrl[postIterator]}`} type="video/mp4" />
        Your browser does not support the video tag.
        </video> : <img className="post__image" src={`http://localhost:4000${postImageUrl[postIterator]}`} />
      }

      <LikeCommentShare commentClicked={showCommentInput} />

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