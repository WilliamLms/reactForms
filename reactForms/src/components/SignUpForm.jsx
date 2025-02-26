import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const MIN_USERNAME_LENGTH = 8;
  const MIN_PASSWORD_LENGTH = 8;

  const validateUsername = (name) => {
    if (name.length < MIN_USERNAME_LENGTH) {
      setUsernameError(`Username must be at least ${MIN_USERNAME_LENGTH} characters long.`);
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (pass) => {
    if (pass.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`);
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (usernameError || passwordError) {
      setError("Please fix the errors before submitting.");
      return;
    }
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setToken(result.token);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
            minLength={MIN_USERNAME_LENGTH}
          />
        </label>
        {usernameError && <p className="error-message">{usernameError}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={MIN_PASSWORD_LENGTH}
          />
        </label>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
