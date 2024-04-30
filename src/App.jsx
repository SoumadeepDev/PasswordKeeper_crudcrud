import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import StudentProvider from "./StudentContext";

const App = () => {
  return (
    <Router>
      <StudentProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </StudentProvider>
    </Router>
  );
};

export default App;
