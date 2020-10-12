import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./request";
function App() {
  return (
    <div className="App">
      <h1> Hi There</h1>
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
    </div>
  );
}

export default App;
