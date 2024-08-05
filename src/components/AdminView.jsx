import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";

export default function AdminMovieManagement() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
  });
  const [updateMovie, setUpdateMovie] = useState({
    id: "",
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
  });
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/getMovies`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((error) => setError(error.message));
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/movies/addMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Movie added successfully",
        });
        fetchMovies();
        setNewMovie({
          title: "",
          director: "",
          year: "",
          description: "",
          genre: "",
        });
        setShowAddModal(false);
      })
      .catch((error) => setError(error.message));
  };

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    fetch(
      `${import.meta.env.VITE_API_URL}/movies/updateMovie/${updateMovie.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: updateMovie.title,
          director: updateMovie.director,
          year: updateMovie.year,
          description: updateMovie.description,
          genre: updateMovie.genre,
        }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Movie updated successfully",
        });
        fetchMovies();
        setUpdateMovie({
          id: "",
          title: "",
          director: "",
          year: "",
          description: "",
          genre: "",
        });
        setShowUpdateModal(false);
      })
      .catch((error) => setError(error.message));
  };

  const handleDeleteMovie = (movieId) => {
    fetch(`${import.meta.env.VITE_API_URL}/movies/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then(() => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Movie deleted successfully",
        });
        fetchMovies();
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Container fluid className="mt-5 pt-5 adminView">
      <h2 className="text-center mb-4">Admin Movie Management</h2>
      {error && <Alert variant="danger">Error: {error}</Alert>}

      {/* Add Movie Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        size="lg">
        <Modal.Body className="addMovieModal">
          <Modal.Header closeButton>
            <Modal.Title>Add Movie</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleAddMovie}>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                placeholder="Title"
                value={newMovie.title}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="director">
              <Form.Control
                type="text"
                placeholder="Director"
                value={newMovie.director}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, director: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Control
                type="number"
                placeholder="Year"
                value={newMovie.year}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, year: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={newMovie.description}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Control
                type="text"
                placeholder="Genre"
                value={newMovie.genre}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, genre: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Movie
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Update Movie Modal */}
      <Modal
        size="lg"
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        centered>
        <Modal.Body className="updateModal">
          <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleUpdateMovie}>
            <Form.Group controlId="movieId">
              <Form.Control
                type="text"
                placeholder="Movie ID"
                value={updateMovie.id}
                onChange={(e) =>
                  setUpdateMovie({ ...updateMovie, id: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                placeholder="Title"
                value={updateMovie.title}
                onChange={(e) =>
                  setUpdateMovie({ ...updateMovie, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="director">
              <Form.Control
                type="text"
                placeholder="Director"
                value={updateMovie.director}
                onChange={(e) =>
                  setUpdateMovie({ ...updateMovie, director: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Control
                type="number"
                placeholder="Year"
                value={updateMovie.year}
                onChange={(e) =>
                  setUpdateMovie({ ...updateMovie, year: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={updateMovie.description}
                onChange={(e) =>
                  setUpdateMovie({
                    ...updateMovie,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Control
                type="text"
                placeholder="Genre"
                value={updateMovie.genre}
                onChange={(e) =>
                  setUpdateMovie({ ...updateMovie, genre: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button type="submit">Update Movie</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Container>
        {/* Add Movie Button */}
        <Button
          variant="primary"
          className="my-5 adminAddMovieBtn"
          onClick={() => setShowAddModal(true)}>
          Add New Movie
        </Button>
        {movies.length === 0 ? (
          <p>No movies available to delete.</p>
        ) : (
          <Row>
            {movies.map((movie) => (
              <Col md={4} lg={4} key={movie._id} className="mb-4">
                <Card className="adminCards">
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
                      <Col lg={6}>
                        <Button
                          className="adminUpdateBtn"
                          onClick={() => {
                            setUpdateMovie({
                              id: movie._id,
                              title: movie.title,
                              director: movie.director,
                              year: movie.year,
                              description: movie.description,
                              genre: movie.genre,
                            });
                            setShowUpdateModal(true);
                          }}>
                          Update Movie
                        </Button>
                      </Col>
                      <Col lg={6}>
                        <Button
                          className="float-end adminDeleteBtn"
                          onClick={() => handleDeleteMovie(movie._id)}>
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}
