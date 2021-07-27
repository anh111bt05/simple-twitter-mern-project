import React, { useContext, useState } from "react";
import "../css/Auth.css";
import axios from "axios";
import AppContext from "./AppContext";
import { useHistory } from "react-router";

export default function Register() {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
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
        url: "/api/v1/auth/register",
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
      <form action="" className="auth-form" onSubmit={onSubmitHandle}>
        <h2>Register your account</h2>
        {errorMessage && (Array.isArray(errorMessage) ? (
          errorMessage.map((err) => (
            <div className="error-message">Error: {err} </div>
          ))
        ) : (
          <div className="error-message">Error: {errorMessage} </div>
        ))}
        <input
          type="text"
          name="name"
          id=""
          required
          placeholder="Name"
          value={userInput.name}
          onChange={onChangeHandle}
        />
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
          Register
        </button>
      </form>
    </section>
  );
}
