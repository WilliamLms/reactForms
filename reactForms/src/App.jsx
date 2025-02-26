import React, { useState } from "react";
import SignUpForm from "./components/SignUpForm";
import Authenticate from "./components/Authenticate";
import "./App.css"; // Import the CSS file

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="container">
      <SignUpForm setToken={setToken} />
      <Authenticate token={token} />
    </div>
  );
}
