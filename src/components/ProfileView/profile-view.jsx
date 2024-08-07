import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "dotenv/config";
import { useNavigate } from "react-router-dom";

/**
 * Component to display and update user profile.
 * @param {Object} props - The component's props.
 * @param {Object} props.user - The current user object.
 * @param {Array} props.movies - The list of movies.
 * @param {Function} props.onUserProfileUpdate - Callback function to handle user profile updates.
 * @returns {JSX.Element} The rendered component.
 */
function ProfileView({ user, movies, onUserProfileUpdate }) {
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
  let navigate = useNavigate();

  // console.log(user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      return;
    }

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

  /**
   * Handles input change in the profile form
   * @param {Object} e - The event object.
   */
  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log("name", name);

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }

  /**
   * Handles user deregistration
   */
  function handleDeregisterClick() {
    alert("Caution: This is a destructive operation. Proceed with care");

    // fetch(`${process.env.DEV_API_URL}/users/${user.Name}`, {
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

          console.log("User has been deregistered successfully!");
          // setUserData(null);
          onUserProfileUpdate(null);

          // redirect to /login page
          navigate("/login");
        } else {
          // handle error
          console.error("Failed to delete user account");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  /**
   * handles form submission to update user profile
   * @param {Object} e - The event object.
   */
  function handleSubmit(e) {
    e.preventDefault();
    // Submit updated user data to the server
    console.log("userID is: " + user._id);
    console.log("username is: " + user.Name);

    userData._id = user._id;
    console.log("Updated User Data:", userData);

    // fetch(`${process.env.DEV_API_URL}/users/${user.Name}`, {
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
          return response.json();
        } else {
          // handle error
          console.error("Failed to update user data");
        }
      })
      .then((userData) => {
        console.log("[ProfileView] updated userData:", userData);
        // handle success
        userData.Password = "";
        setUserData(userData);
        onUserProfileUpdate(userData);

        console.log("User data updated successfully!");
        alert("User profile updated successfully!");
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
      <Form onSubmit={handleSubmit}>
        <h2>Profile</h2>
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

        <Row className="mt-3">
          <Col xs={2} lg={4}>
            <h2>Favorite Movies</h2>
          </Col>
          <Row>
            {favoriteMovies.length === 0 ? (
              <div>No movies</div>
            ) : (
              favoriteMovies.map((movie) => (
                <Col xs={12} md={6} lg={4} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>
        </Row>

        <Row className="mt-3">
          <Col xs={12}>
            <Button variant="danger" onClick={handleDeregisterClick}>
              Delete Account
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
