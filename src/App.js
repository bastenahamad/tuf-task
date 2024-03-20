import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Submission from "./Submission";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/submission" element={<Submission />} />
    </Routes>
  );
}
export default App;
