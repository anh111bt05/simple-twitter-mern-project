import React, { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import PostItem from "./PostItem";
import "../css/Post.css";
import axios from "axios";
import AppContext from "./AppContext";

export default function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  const postList = posts ?  posts : []
 
  const getAllPosts = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "/api/v1/posts",
      };
      const response = await axios(options);
      const posts = response.data.data.posts;
      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const newPosts = 
  postList.map(
      (post) => {
        if (user) {
          return post.author.name === user.userName
            ? { ...post, isEditable: true }
            : post;
        } else {
          return { ...post, isEditable: false };
        }
      }
  );

  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post, index) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
    </section>
  );
}
