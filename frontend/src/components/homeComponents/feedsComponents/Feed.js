import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import "./Feed.css";
import postRoutes from '../../../apiCall/posts';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getPosts = () =>  postRoutes.getPosts();
                                              
  
  useEffect(() => {
    setLoading(true);
    getPosts().then((data) => {
      console.log("data from prosts routes", data);
      if(data !== "No Post Yet"){
        data.reverse();
        setPosts(data);
      }
      
    })
    .catch((err) => console.log({err}))
    .finally(() => {
      console.log("Finnally block from feeds");
      setLoading(false)});

  }, []);

  //If Data is Loading....
  const loadComponent = (posts) => {

    

    if(posts.length !== 0){
      return  <div className="feed">
      <div className="feed__posts">
        {posts.map((post, i) => (
          <PostCard
            key={i}
            id={post.postID}
            profileImageURL={post.uploadedBy.profileImageURL}
            userProfileUrl={post.uploadedBy.userProfileUrl}
            userName= {post.uploadedBy.userName}
            postImageUrl={post.postFileURL}
            postFileType={post.fileType}
            caption={post.caption}
            likes= {post.likes}
            comments={post.CommentBox}
            date={post.date}
            user={user}
          />
        ))}
      </div>
    </div>
     
    }else{
      return(
        <h1>No Post Yet</h1>
      );
     
    }

  }
  return (
    isLoading? <h1>Loading...</h1> : loadComponent(posts)
  );
}

export default Feed;





















//------------------------------------------------------------------------------------------------------------------------------------

 /// useEffect -> runs a piece of code baded on a specific condition
  // useEffect(() => {
  //   // this is where the code runs
  //   posts.push({
  //     id: 1,
  //     userProfileUrl: "https://www.google.com/",
  //     userName: "Divyansh Pathak",
  //     postImageUrl: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fforbestechcouncil%2Ffiles%2F2019%2F01%2Fcanva-photo-editor-8-7.jpg",
  //     caption: "Resolving Errors",
  //     comments:[
  //     {
  //       userName: "Amir",
  //       comment: "Seems to be a Hard Day"
  //     },
  //     {
  //       userName: "Kishore",
  //       comment: "Interesting"
  //     }
  //   ]
  //   });
    
  //   posts.push({
  //     id: 2,
  //     userProfileUrl: "https://www.google.com/",
  //     userName: "Jitender",
  //     postImageUrl: "http://localhost:4000/image/a18474a801171345d7a0c2d03412b0d4.jpg",
  //     caption: "A night view",
  //     comments:[
  //     {
  //       userName: "Amir",
  //       comment: "Nice One"
  //     },
  //     {
  //       userName: "Kishore",
  //       comment: "Beautiful than Kathmandu"
  //     }
  //   ]
  //   });
  // }, []);