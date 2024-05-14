import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ProfileView = ({ user, movies, onUserProfileUpdate }) => {
  // console.log("movies:", movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userData, setUserData] = useState({
    Name: "",
    Password: "",
    Email: "",
    Birthday: "",
    Country: "",
    Gender: "",
  });

  // console.log(user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user.favoriteMovies) {
      const filteredMovies = movies.filter((movie) => {
        return user.favoriteMovies.includes(movie.id);
      });

      setFavoriteMovies(filteredMovies);
    }

    // update user data state when user prop changes
    setUserData({
      Name: user.Name,
      Email: user.Email,
      Birthday: user.Birthday,
      Country: user.Country,
      Gender: user.Gender,
      Password: user.Password,
    });
  }, [user, movies]);

  // handle form input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log("name", name);

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  function handleDeregisterClick() {
    alert("Caution: This is a destructive operation. Proceed with care");

    fetch(
      `https://movies-api-ms-b2173cbfa01b.herokuapp.com/users/${user.Name}`,
      {
        method: "DELETE",
        body: JSON.stringify({ _id: user._id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // handle success
          setUserData(userData);
          console.log("User has been deregistered successfully!");
        } else {
          // handle error
          console.error("Failed to delete user account");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Submit updated user data to the server
    console.log("userID is: " + user._id);
    console.log("username is: " + user.Name);

    userData._id = user._id;
    console.log("Updated User Data:", userData);

    fetch(
      `https://movies-api-ms-b2173cbfa01b.herokuapp.com/users/${user.Name}`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // handle success
          setUserData(userData);
          onUserProfileUpdate(userData);

          console.log("User data updated successfully!");
          alert("User profile updated successfully!");
        } else {
          // handle error
          console.error("Failed to update user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (!user) {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }

  // console.log(user);
  // console.log(user.favoriteMovies);
  return (
    <>
      <Row>
        <Col xs={2}>
          <h3>Favorite Movies</h3>
        </Col>
        <Row>
          {favoriteMovies.length === 0 ? (
            <div>No movies</div>
          ) : (
            favoriteMovies.map((movie) => (
              <Col xs={12} md={6} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))
          )}
        </Row>
      </Row>

      <Row>
        <h3>Profile</h3>
        <p>Username: {userData.Name}</p>
        <p>Password: {userData.Password}</p>
        <p>Email: {userData.Email}</p>
        <p>Birthday: {userData.Birthday}</p>
        <p>Country: {userData.Country}</p>
        <p>Gender: {userData.Gender}</p>
      </Row>

      <Form onSubmit={handleSubmit}>
        <h2>Update profile</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="Name"
            value={userData.Name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="Password"
            value={userData.Password}
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="Email"
            value={userData.Email}
            onChange={handleInputChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter birthday"
            name="Birthday"
            value={userData.Birthday}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            name="Country"
            value={userData.Country}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            name="Gender"
            value={userData.Gender}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <Button variant="danger" onClick={handleDeregisterClick}>
          Delete Account
        </Button>
      </Form>
    </>
  );
};
