import React, { useState } from "react";

const CardDiv = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log('test');
  return (
    <form name={`${props.card.toLowerCase()}url`} onSubmit={props.upload}>
      {`${props.card} of ${props.suit}`}
      <input className="suit-form-input" name={props.card.toLowerCase()} value={props.value} onChange={props.type} ></input>
      <input type='file' name={`${props.card.toLowerCase()}url`} onChange={props.type}></input>
      <input type='submit' name={`${props.card.toLowerCase()}url`} value='update' onClick={() => { props.upload }}></input>
    </form>
  )
}


//https://www.pluralsight.com/guides/how-to-use-a-simple-form-submit-with-files-in-react
const App = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </form>
    </div>
  );
};

export default CardDiv;

