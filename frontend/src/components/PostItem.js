import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext";

export default function PostItem({ post }) {
  const { dispatch } = useContext(AppContext);
  const [postToEdit, setPostToEdit] = useState(post);
  const [openEditFom, setOpenEditFom] = useState(false);
  const [openDeletetFom, setOpenDeleteFom] = useState(false);

  const updatePost = useCallback(async () => {
    try {
      setOpenEditFom(false);
      const token = localStorage.getItem("token");
      const options = {
        method: "put",
        url: `/api/v1/posts/${post._id}`,
        data: postToEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(options);
      dispatch({ type: "UPDATE_ONE_POST", payload: { ...postToEdit } });
    } catch (error) {
      console.log(error);
    }
  });

  let date = new Date(post.createdAt);
  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <div className="post-infors">
          <span>by {post.author.name}</span>
          <span>
            Date:{" "}
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </span>
        </div>
        {post.isEditable && (
          <div className="post-edit-delete">
            {openDeletetFom ? (
              <>
                <span className="delete-question">Are you sure?</span>
                <span>Yes</span>
                <span>No</span>
              </>
            ) : (
              <>
                <span onClick={() => setOpenEditFom(true)}>Edit</span>
                <span
                  className="delete-question"
                  onClick={() => setOpenDeleteFom(true)}
                >
                  Delete
                </span>
              </>
            )}
          </div>
        )}
      </div>
      {openEditFom && (
        <div className="post-edit-form">
          <form action="" className="edit-form" >
            <textarea
              type="text"
              name="content"
              id="content"
              className="content"
              placeholder="input here"
              value={postToEdit.content}
              onChange={(e) => {
                setPostToEdit({ ...postToEdit, content: e.target.value });
              }}
            ></textarea>
            <div className="btn-container">
              <button className="btn" type="submit" onClick={updatePost}>
                Update
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setOpenEditFom(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
