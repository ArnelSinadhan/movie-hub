import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);

        if (data.message === "Registered Successfully") {
          setFullName("");
          setEmail("");
          setPassword("");

          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Registration successful",
          });

          navigate("/login");
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: data.message || "Registration failed",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred. Please try again.",
        });
      });
  };

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center align-items-center loginRow">
        <Col md={6} lg={6}>
          <h2 className="text-center my-5">Register</h2>
          <Form className="loginForm" onSubmit={registerUser}>
            <Form.Group className="mt-4">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="loginBtnBox mt-5 d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </Form>
        </Col>
        <p className="text-center mt-3">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </Row>
    </Container>
  );
}
