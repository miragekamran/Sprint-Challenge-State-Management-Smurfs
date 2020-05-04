import React, { useContext, useState } from "react";
import { SmurfsContexts } from "../contexts/SmurfsContexts";
import axios from "axios";

export default function Smurfs() {
  const value = useContext(SmurfsContexts);

  const [newSmurf, setNewSmurf] = useState({
    name: "",
    age: "",
    height: "",
  });

  const handleChanges = (event) => {
    setNewSmurf({
      ...newSmurf,
      [event.target.name]: event.target.value,
    });
    console.log(newSmurf)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then((res) => {
        console.log(res);
        value.smurfs.push("/");
      })
      .catch((err) => console.log(err))
      .finally(() => window.location.reload());
  };

  function deleteSmurf(event, id) {
    event.preventDefault();
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log("delete", err))
      .finally(() => window.location.reload());
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Name: &nbsp;
        <input
          type="text"
          name="name"
          value={newSmurf.value}
          onChange={handleChanges}
        />
        <br />
        Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="age"
          value={newSmurf.value}
          onChange={handleChanges}
        />
        <br />
        Height: {""};
        <input
          type="text"
          name="height"
          value={newSmurf.value}
          onChange={handleChanges}
        />
        <br />
        <button type="submit">Add Smurfs</button>
      </form>


      {value.smurfs
        ? value.smurfs.map((smurf) => (
            <div key={smurf.id}>
              <p>
                Name: {smurf.name}
                <br />
                Age: {smurf.age}
                <br />
                Height: {smurf.height}
              </p>
              <button onClick={(e) => deleteSmurf(e, smurf.id)}>Delete</button>
            </div>
          ))
        : "Importing Smurfs"}
    </div>
  );
}
