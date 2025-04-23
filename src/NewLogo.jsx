import React from 'react';
import './assets/styles.css';

export default function NewLogo() {

  return (
    <div className="square">
      <i style={{ "--clr": "#00ff0a" }}></i>
      <i style={{ "--clr": "#ff0057" }}></i>
      <i style={{ "--clr": "#fffd44" }}></i>
      <div className="logo-container">
        <h1 style={{ "--clr": "#FFFFFF" }}>Hour<br/>Meridian</h1>
      </div>
    </div>
  );
}