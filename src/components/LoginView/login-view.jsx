import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import "dotenv/config";

/**
 * component for user authentication
 * @param {Object} props - The component's props.
 * @param {Function} props.onLoggedIn - Callback function to handle successful login.
 * @returns {JSX.Element} The rendered component.
 */
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * handles form submission to log in the user;
   * prevents default form submission
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: username,
      Password: password,
    };

    // console.log("Login response: ", data);

    // fetch(`${process.env.DEV_API_URL}/login`, {
    fetch("https://movies-api-ms-b2173cbfa01b.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          // alert("Found user! Logging in...");
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username: </Form.Label>

        <Form.Control
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <Button variant="primary " type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};
