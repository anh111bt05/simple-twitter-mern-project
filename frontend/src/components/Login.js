import React, { useContext, useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import AppContext from "./AppContext";
import { useHistory } from "react-router";

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  // onchange handler
  const onChangeHandle = (e) => {
    //e.target.name -> tro den name trong input
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  //Submit form
  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      const options = {
        method: "post",
        url: "/api/v1/auth/login",
        data: userInput,
      };
      const response = await axios(options);
      const { token, userName } = response.data.data;
      localStorage.setItem("token", token);
      dispatch({ type: "CURRENT_USER", payload: { userName } });
      history.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <section className="auth-container">
      <form className="auth-form" onSubmit={onSubmitHandle}>
        <h2>Enter your account</h2>
        {errorMessage && (
          <div className="error-message">Error: {errorMessage} </div>
        )}
        <input
          type="email"
          name="email"
          id=""
          required
          placeholder="Email"
          value={userInput.email}
          onChange={onChangeHandle}
        />
        <input
          type="password"
          name="password"
          id=""
          required
          placeholder="Password"
          value={userInput.password}
          onChange={onChangeHandle}
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}
