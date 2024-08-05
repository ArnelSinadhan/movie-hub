import { useState, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../UserContext"; // Adjust the import path as needed

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.isAdmin);
        setLoading(false);

        if (data.message === "Email and password do not match") {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Email and password do not match",
          });
        } else {
          login(data.access); // Use the login method from context to set the token and update isAuthenticated
          setEmail("");
          setPassword("");
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Login successful",
          });

          navigate("/");
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
          <h2 className="text-center my-3">Login</h2>
          <Form className="loginForm" onSubmit={loginUser}>
            <Form.Group className="mt-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mt-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="loginBtnBox mt-5 d-flex justify-content-center">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </Form>
        </Col>
        <p className="text-center mt-3">
          Don't have an account? <NavLink to="/register">Sign up</NavLink>
        </p>
      </Row>
    </Container>
  );
}
