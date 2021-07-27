import React from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Twitter</Link>
      </h1>
      <nav>
        <ul className="main-nav">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <span href="" classNameName="user-name">
              Hello, anh nguyen
            </span>
          </li>
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
