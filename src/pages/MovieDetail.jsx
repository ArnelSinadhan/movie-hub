import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Spinner,
  Alert,
  ListGroup,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch movie details by ID
    fetch(`${import.meta.env.VITE_API_URL}/movies/getMovie/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    // Fetch comments
    fetch(`${import.meta.env.VITE_API_URL}/movies/getComments/${movieId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [movieId]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/movies/addComment/${movieId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.updatedMovie) {
          setComments((prevComments) => [...prevComments, data.updatedMovie]);
          setNewComment("");
          setLoading(false);
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Comment added successfully",
          });
        } else {
          throw new Error("Failed to add comment");
        }
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Failed to add comment",
        });
      });
  };

  return (
    <Container fluid className="mt-4 movieDetailsContainer">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h2 className="text-center my-5 pt-5 movieDetails">
              Movie Details
            </h2>
            {loading && <Spinner animation="border" variant="primary" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {movie && (
              <Card className="movieDetailsCard">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description}</Card.Text>
                  <Card.Text>Director: {movie.director}</Card.Text>
                  <Card.Text>Genre: {movie.genre}</Card.Text>
                </Card.Body>
              </Card>
            )}

            <h3 className="mt-4 commentHead">Comments</h3>
            <Form onSubmit={handleCommentSubmit} className="mb-4">
              <Form.Group controlId="comment">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-2 movieDetailSubmit">
                Submit
              </Button>
            </Form>
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ListGroup>
                {comments.map((comment) => (
                  <ListGroup.Item key={comment._id} className="mb-2">
                    <strong>{comment.userId}</strong>
                    <p>{comment.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
