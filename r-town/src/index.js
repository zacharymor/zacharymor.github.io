import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let user = 'Zach'
let dob = 1999

let bgcolor = {color: "green", border: "5px dashed yellow"}

let component = 
   <div style={bgcolor}>green div
      <p style={{color: "blue", fontWeight: "bold"}}>
        {user} was born in {dob}
      </p>
      <button>This button does nothing</button>
    </div>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      {component}
      {component}
  </div>


);


{/* <React.StrictMode>
    <App />
  </React.StrictMode> }--------------->>> THIS WAS TAKEN FROM THE root.render function and was the only initial text there*/}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();