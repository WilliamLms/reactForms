import React, { useState } from "react";

export default function Authenticate({ token }) {
  const [username, setUsername] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setSuccessMessage(result.message);
      setUsername(result.data.username);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="authenticate-container">
      <h2>Authenticate</h2>
      {successMessage && (
        <p className="success-message">
          {successMessage} {username && `Welcome, ${username}!`}
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleClick} disabled={!token}>
        Authenticate Token!
      </button>
    </div>
  );
}
