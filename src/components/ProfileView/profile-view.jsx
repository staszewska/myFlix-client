import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export const ProfileView = ({ user }) => {
  console.log(user);
  const token = localStorage.getItem("token");

  if (!user) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  return (
    <Container>
      <h1>Profile</h1>
      <p>Username: {user.Name}</p>
      <p>Email: {user.Email}</p>
      <p>Country: {user.Country}</p>

      <h2>Favourite Movies:</h2>
    </Container>
  );
};
