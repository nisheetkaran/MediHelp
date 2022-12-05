import React, { useState, useEffect } from "react";

const MainBody = (props) => {
  const [active, setActive] = useState(false);
  const [symptoms, setSymptoms] = useState("Select Symptoms");

  const handleClick = (value) => {
    props.parentCallback(value);
    setSymptoms(value);
    setActive(false);
    // props.value=symptoms;
  };

  console.log(active);
  return (
    <div className="symptomcontainer">
      <div className="select-box">
        <div className={`options-container ${active ? "active" : ""}`}>
          {props.data.map((symptom) => {
            return (
              <div className="option" onClick={() => handleClick(symptom)}>
                <input
                  type="radio"
                  className="radio"
                  id={symptom}
                  name="category"
                />
                <label for={symptom}>{symptom}</label>
              </div>
            );
          })}
        </div>
        <div className="selected" onClick={() => setActive(!active)}>
          {symptoms}
        </div>
      </div>
      {/* {symptoms} */}
    </div>
  );
};

export default MainBody;
