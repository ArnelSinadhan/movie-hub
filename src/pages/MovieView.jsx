// src/pages/MovieView.js
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import GetMovies from "../components/GetMovies";
import AdminView from "../components/AdminView";
import { isAdmin } from "../auth"; // Adjust the path if needed

export default function MovieView() {
  const [showAdminView, setShowAdminView] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowAdminView(isAdmin(token));
    }
  }, []);

  return (
    <Container fluid className="p-0 movieView">
      {showAdminView ? <AdminView /> : <GetMovies />}
    </Container>
  );
}
