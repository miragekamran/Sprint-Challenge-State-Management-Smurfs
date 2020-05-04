import React, { useState, useEffect } from "react";
import axios from "axios";
import { SmurfsContexts } from "../contexts/SmurfsContexts";
import "./App.css";
import Smurfs from "./Smurfs";
function App() {
  const [smurfs, setSmurfs] = useState();

  useEffect(() => {
    axios
      .get("ttp://localhost:3333/smurfs")
      .then((res) => {
        console.log(res.data);
        setSmurfs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(smurfs);

  return (
    <div className="App">
      <h1>SMURFS! 2.0 W/ Redux</h1>
      <div>Welcome to your state management version of Smurfs!</div>
      <SmurfsContexts.Provider value={{smurfs}}>
        <Smurfs />
      </SmurfsContexts.Provider>
    </div>
  );
}

export default App;
