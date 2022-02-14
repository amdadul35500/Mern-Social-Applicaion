import { useRef } from "react";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Password dont match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">AmdadulSocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on AmdadulSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              className="loginInput"
              type="text"
              required
              ref={username}
            />
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              min="6"
              required
              ref={password}
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              type="password"
              min="6"
              required
              ref={passwordAgain}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <NavLink to="/login" style={{ textAlign: "center" }}>
              <button className="loginRegisterButton">Log into Account</button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
