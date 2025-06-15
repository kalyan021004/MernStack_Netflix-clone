import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import MainHome from "./components/AfterSignin/MainHome";
import SearchResult from "./components/AfterSignin/SearchResult";
import GenrePage from "./components/AfterSignin/Movies";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/genre/:genre" element={<GenrePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
