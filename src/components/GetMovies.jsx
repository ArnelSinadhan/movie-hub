import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function GetMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = localStorage.getItem("token"); // Check if token exists

  useEffect(() => {
    // Fetch movies when component mounts
    fetch(`${import.meta.env.VITE_API_URL}/movies/getMovies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
      <Row>
        <h2 className="text-center py-5 mt-5 getMoviesTitle">Movies</h2>
        {movies.map((movie) => (
          <Col md={6} lg={4} key={movie._id} className="mb-4">
            <Card className="getMoviesCard">
              <Card.Body>
                <Card.Title className="text-center mb-5">
                  {movie.title}
                </Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Text>{movie.director}</Card.Text>
                <Card.Text>{movie.genre}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col lg={12}>
                    {isAuthenticated ? (
                      <NavLink
                        to={`/movies/${movie._id}`}
                        className="btn btn-primary viewDetailsBtn">
                        View Details
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/login"
                        className="btn btn-primary viewDetailsBtn">
                        Login to View Details
                      </NavLink>
                    )}
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
