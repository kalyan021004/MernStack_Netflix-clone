import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  Poster_Link: { type: String, required: true },
  Series_Title: { type: String, required: true },
  Released_Year: { type: String, required: true },
  Certificate: { type: String },
  Runtime: { type: String },
  Genre: { type: String },
  IMDB_Rating: { type: Number },
  Overview: { type: String },
  Meta_score: { type: Number },
  Director: { type: String },
  Star1: { type: String },
  Star2: { type: String },
  Star3: { type: String },
  Star4: { type: String },
  No_of_Votes: { type: Number },
  Gross: { type: String }
});

const NetflixTitle = mongoose.model('NetflixTitle', movieSchema);

export default NetflixTitle;
