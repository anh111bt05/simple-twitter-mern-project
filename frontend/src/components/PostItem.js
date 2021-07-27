import React from 'react'

export default function PostItem() {
  return (
    <div className="post-item">
    <p className="post-content">
      aklsjdlakjdlkasldk
    </p>
    <div className="post-footer">
      <div className="post-infors">
        <span>by Anh</span>
        <span>Date: 12/21</span>
      </div>
      <div className="post-edit-delete">
        <span>Edit</span>
        <span>Delete</span>
        <span className="delete-question">
          Are you sure?
        </span>
        <span>Yes</span>
        <span>No</span>
      </div>
      <div className="post-edit-form">
        <form action="" className="edit-form">
          <textarea
          type="text"
          name="content"
          id="content"
          className="content"
          placeholder="input here"
        >
        JKAHSKJDHAKJ
        </textarea>
        <div className="btn-container">
          <button className="btn" type="button">Update</button>
          <button className="btn" type="button">Cancel</button>
        </div>
        </form>
      </div>
    </div>
  </div>
  )
}
