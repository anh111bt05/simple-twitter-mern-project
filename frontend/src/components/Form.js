import React from "react";
import '../css/Form.css'

export default function Form() {
  return (
    <section className="form-section">
      <form action="" className="form">
        <textarea
          type="text"
          name="content"
          id="content"
          className="content"
          placeholder="input here"
        ></textarea>
        <button className="btn" type="submit">
          Tweet
        </button>
      </form>
    </section>
  );
}
