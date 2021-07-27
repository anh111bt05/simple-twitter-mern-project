import React, { useCallback, useEffect } from "react";
import PostItem from "./PostItem";
import "../css/Post.css";
import axios from "axios";

export default function PostList() {
  const getAllPosts = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "/api/v1/posts",
      };
      const response = await axios(options);
      const posts = response.data.data.posts;
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);
  return (
    <section className="post-section">
      <div className="post-list">
        <PostItem />
      </div>
    </section>
  );
}
