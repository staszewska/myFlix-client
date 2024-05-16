import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "dotenv/config";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      Country: country,
      Gender: gender,
    };

    // fetch(`${process.env.DEV_API_URL}/users`, {
    fetch(`https://movies-api-ms-b2173cbfa01b.herokuapp.com/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          // window.location.reload()
          navigate("/login");
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username: </Form.Label>

        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday: </Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Country: </Form.Label>
        <Form.Control
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formGender">
        <Form.Label>Gender: </Form.Label>
        <Form.Control
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
