import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import MainHome from "./components/AfterSignin/MainHome";
import MNavbar from "./components/AfterSignin/MNavbar";
import FullMovies from "./components/AfterSignin/FullMovies";
import FullTvshows from "./components/AfterSignin/FullTvshows";
import SearchResult from "./components/AfterSignin/SearchResult";
import GenrePage from "./components/AfterSignin/Movies";
function App() {
  

  return (
    <BrowserRouter>
      {/* Show either MNavbar or Header - only one */}

      <Routes>
        <Route path="/search" element={<SearchResult />} />

<Route path="/genre/:genre" element={<GenrePage />} />

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/movies" element={<FullMovies />} />
        <Route path="/tvshows" element={<FullTvshows />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
