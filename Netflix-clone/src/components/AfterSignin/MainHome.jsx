import React, { useState, useEffect } from "react";
import MNavbar from "./MNavbar";
import MainScreen from "./MainScreen";
import Action from "./Action";
import Adventure from "./Adventure";
import Animation from "./Animation";
import Fantasy from "./Fantasy";
import History from "./History";
import Drama from "./Drama";
import Crime from "./Crime";
import Comedy from "./Comedy";
import Biography from "./Biography";
import Footer from "../Footer";

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
      <Drama />
      <Biography />
      <Crime />
      <Comedy />
      <Fantasy />
      <History />

      <Footer />
    </>
  );
}

export default MainHome;
