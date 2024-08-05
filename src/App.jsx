import React, { useContext } from "react";
import { UserProvider } from "./UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieView from "./pages/MovieView";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <UserProvider>
      <Router basename="/">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<MovieView />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
