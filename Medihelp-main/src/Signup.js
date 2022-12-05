import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Signup = (props) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleClick = (data1, data2, data3, data4) => {
    props.parentCallback(data1, data2, data3, data4);
  };

  const changeFullName = (event) => {
    setFullName(event.target.value);
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitform = (event) => {
    event.preventDefault();
    console.log("submitted");
    const registered = {
      fullName,
      username,
      email,
      password,
    };

    axios
      .post("http://localhost:4000/app/signup", registered)
      .then((response) => console.log(response.data));
    setFullName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="formContainer">
        <div class="registration-form">
          <h2>Sign up</h2>
          <form>
            <p>Full Name:</p>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={changeFullName}
              value={fullName}
            />
            <p>Username:</p>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              onChange={changeUsername}
              value={username}
            />
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
            <button
              type="submit"
              //   onClick={() => handleClick("a", "b", "c", "d")}
              onClick={submitform}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
