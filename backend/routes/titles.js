import express from "express";
import NetflixTitle from "../models/NetflixTitle.js";

const router = express.Router();

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query missing" });
  }

  try {
    const regex = new RegExp(query, "i");

    const results = await NetflixTitle.find({
      $or: [
        { Series_Title: regex },
        { Director: regex },
        { Genre: regex }
      ]
    }).lean();

    const normalized = results.map(item => ({
      title: item.Series_Title,
      description: item.Description,
      release_year: item.Release_Year,
      duration: item.Duration,
      rating: item.IMDB_Rating,
      posterUrl: item.Poster_Link
    }));

    res.json(normalized);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const genre = req.params.genre;

  try {
    const regex = new RegExp(genre, "i");
    const titles = await NetflixTitle.find({ Genre: regex }).lean();

    const normalized = titles.map(item => ({
      title: item.Series_Title,
      description: item.Description,
      release_year: item.Release_Year,
      duration: item.Duration,
      rating: item.IMDB_Rating,
      posterUrl: item.Poster_Link
    }));

    res.json(normalized);
  } catch (error) {
    console.error("Genre fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/hero", async (req, res) => {
  try {
    const topMovie = await NetflixTitle.findOne().sort({ IMDB_Rating: -1 });
    res.json(topMovie);
  } catch (err) {
    console.error("Hero fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
