import React from "react";
import "./Comment.css";
import Avatar from "@material-ui/core/Avatar";

function Comment({ username, comment }) {
  return (
    <div className="comment">
      <Avatar
            alt={username.toLowerCase()}
            style={{ height: "25px", width: "25px" }}
          >
            {username.charAt(0)}
      </Avatar>
      <div className ="comment-wrapper">
      <p className="username">{username}</p>
      <p className="comment">{comment}</p>
      </div>
     
    </div>
  );
}

export default Comment;
