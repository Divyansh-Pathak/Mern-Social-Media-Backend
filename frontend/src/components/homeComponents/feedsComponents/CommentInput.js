import React, { useState } from "react";
import "./CommentInput.css";
import commentApi from "../../../apiCall/posts";

function CommentInput({id, user, getComment }) {
  const [comment, setComment] = useState("");
  const addComment = () => {
   getComment({commentByUser : {userName: user} , comment: comment});
   commentApi.postComment({postID : id , comment : comment});
    setComment("");
  };

  return (
    <div className="commentInput">
      <textarea
        rows="1"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="commentInput__textarea"
        placeholder="Add a comment.."
      ></textarea>
      <button
        onClick={addComment}
        className="button commentInput__button"
        style={{
          color: comment ? "gray" : "lightgrey",
          fontWeight: comment ? "600" : "500",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CommentInput;
