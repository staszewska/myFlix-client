import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

const ProfileView = () => {
  const [user, setUser] = useState({
    Name: "",
    Password: "",
    Email: "",
    Birthday: newDate(),
    Country: "",
    Gender: "",
  });

  return <h1>Profile</h1>;
};
