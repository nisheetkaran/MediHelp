import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleClick = (data1, data2, data3, data4) => {
    props.parentCallback(data1, data2, data3, data4);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitform = async (event) => {
    event.preventDefault();
    console.log("submitted");
    const loggedin = {
      email,
      password,
    };
    const res = await axios.post("http://localhost:4000/app/login", loggedin);

    const data = res.data;
    console.log(data);
    if (data) {
      console.log(data);
      setLogin(true);
    } else {
      window.alert("failed");
    }
    setEmail("");
    setPassword("");
  };

  if (isLoggedIn) {
    console.log("Redirecting..");
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="formContainer">
        <div class="registration-form">
          <h2>Log in</h2>
          <form>
            <p>Email:</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={changeEmail}
              value={email}
            />
            <p>Password:</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={changePassword}
              value={password}
            />
            <button type="submit" onClick={submitform}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
