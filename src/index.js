import React from "react";
import ReactDOM from "react-dom";
import Calender from "./Calender";
import moment from "moment";
import "./styles.css";

function App() {
  return (
    <div className="App">      
      <div className="calendar">
        <Calender selected={moment()} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
