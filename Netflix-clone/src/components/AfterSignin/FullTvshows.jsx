import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import MNavbar from "./MNavbar";

function FullTvshows() {
  const [tvshows, setTvshows] = useState([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const res = await axios.get("https://mern-stack-netflix-clone-uatc.vercel.app/tvshows");
        setTvshows(res.data.tvshows || res.data || []);
      } catch (err) {
        console.error("Error fetching TV shows:", err);
      }
    };
    fetchTvShows();
  }, []);

  return (
    <div className="container py-4">
        <MNavbar></MNavbar>
      <h2 className="text-white mb-4">All TV Shows</h2>
      <div className="row">
        {tvshows.map((show, idx) => (
          <div className="col-md-3 mb-4" key={idx}>
            <CardComponent
              title={show.title}
              description={show.description}
              release_year={show.release_year}
              duration={show.duration}
              rating={show.rating}
              posterUrl={show.posterUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FullTvshows;
