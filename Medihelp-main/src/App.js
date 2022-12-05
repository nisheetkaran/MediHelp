import React from "react";
import Navbar from "./Navbar";
import Navbar1 from "./Navbar1";
import MainBody from "./MainBody";
import symptomsort from "./datasort";
import symptomunsort from "./dataunsort";
import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const mlClick = async () => {
    let count = 0;
    if (symptom1 === "") count++;
    if (symptom2 === "") count++;
    if (symptom3 === "") count++;
    if (symptom4 === "") count++;
    if (symptom5 === "") count++;

    if (count >= 3) setPrediction("Please give atleast 3 symptoms");
    else {
      const inputdata = [];
      for (let i = 0; i < symptomunsort.length; i++) {
        inputdata[i] = 0;
        if (
          symptom1 === symptomunsort[i] ||
          symptom2 === symptomunsort[i] ||
          symptom3 === symptomunsort[i] ||
          symptom4 === symptomunsort[i] ||
          symptom5 === symptomunsort[i]
        ) {
          inputdata[i] = 1;
        }
      }

      for (let i = 0; i < inputdata.length; i++) {
        console.log(inputdata);
      }

      const res = fetch("/predict", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          input: [inputdata],
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((message) => {
          const prediction = message;
          setPrediction(prediction["disease"]);
          console.log(prediction["disease"]);
          console.log(typeof prediction);
        });
    }
  };

  const [symptom1, setSymptom1] = useState("");
  const [symptom2, setSymptom2] = useState("");
  const [symptom3, setSymptom3] = useState("");
  const [symptom4, setSymptom4] = useState("");
  const [symptom5, setSymptom5] = useState("");
  const [prediction, setPrediction] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signupCallback = (childData1, childData2, childData3, childData4) => {
    setFullName(childData1);
    setUsername(childData2);
    setPassword(childData3);
    setEmail(childData4);
    console.log(fullName + " " + username + " " + password + " " + email);
  };

  const handleCallback1 = (childData) => {
    setSymptom1(childData);
  };

  const handleCallback2 = (childData) => {
    setSymptom2(childData);
  };

  const handleCallback3 = (childData) => {
    setSymptom3(childData);
  };

  const handleCallback4 = (childData) => {
    setSymptom4(childData);
  };

  const handleCallback5 = (childData) => {
    setSymptom5(childData);
  };

  return (
    <>
      <Switch>
        <Route
          path="/signup"
          render={() => (
            <div>
              <Navbar />
              <Signup parentCallback={signupCallback} />
            </div>
          )}
        />
        <Route
          path="/home"
          render={() => (
            <div>
              <div className="mainContainer">
                <Navbar1 />

                <MainBody parentCallback={handleCallback1} data={symptomsort} />
                <MainBody parentCallback={handleCallback2} data={symptomsort} />
                <MainBody parentCallback={handleCallback3} data={symptomsort} />
                <MainBody parentCallback={handleCallback4} data={symptomsort} />
                <MainBody parentCallback={handleCallback5} data={symptomsort} />
                <div id="button-container">
                  <button type="button" onClick={() => mlClick()}>
                    Submit
                  </button>
                </div>
                <h1>{prediction}</h1>
              </div>
            </div>
          )}
        />
        <Route
          path="/"
          render={() => (
            <div>
              <Navbar />
              <Login />
            </div>
          )}
        />
      </Switch>
    </>
  );
}

export default App;
