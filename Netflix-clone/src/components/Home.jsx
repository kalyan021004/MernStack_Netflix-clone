import { useState } from 'react'
import Header from './Header'
import Mainhero from './MainHero'
import Trending from './Trending'
import SecondaryHero from './SecondaryHero'
import Faqs from './Faqs'
import Footer from './Footer'

import "../index.css";  // go up one folder, then import index.css
function Home() {

  return (
    <>
    <Header></Header>
    
    <Mainhero></Mainhero>
    <Trending></Trending>
   <SecondaryHero></SecondaryHero>
   <Faqs></Faqs>
   <Footer></Footer>
    </>
  )
}

export default Home;
