import React, { useState, useEffect } from "react";
import MNavbar from "./MNavbar";
import Header from "../Header";
import MainScreen from "./MainScreen";
import Movies from "./Movies";
import Action from "./Action";
import Adventure from "./Adventure";
import Animation from "./Animation";
import Family from "./Family";
import Fantasy from "./Fantasy";
import History from "./History";
import Drama from "./Drama";
import Crime from "./Crime";
import Comedy from "./Comedy";
import Biography from "./Biography";
import Footer from "../Footer";
// Import other genre components here if you have more

function MainHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <MNavbar />
      
      <MainScreen />
      <Action />
      <Adventure />
      <Animation />
      <Drama></Drama>
      <Biography></Biography>

      <Crime></Crime>
      <Comedy></Comedy>
      <Family />
      <Fantasy />
      <History />
      <Footer></Footer>
    </>
  );
}

export default MainHome;
