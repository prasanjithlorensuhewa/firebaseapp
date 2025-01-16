import { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const MovieList = ({ movieList, refreshMovies }) => {
  const [updatedTitle, setUpdatedTitle] = useState("");

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      refreshMovies();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      refreshMovies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      {movieList.map((movie) => (
        <Paper key={movie.id} elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <Typography variant="h5" style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </Typography>
          <Typography variant="body1">Release Date: {movie.releaseDate}</Typography>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteMovie(movie.id)}
              style={{ marginRight: "8px" }}
            >
              Delete Movie
            </Button>
            <TextField
              label="New Title"
              variant="outlined"
              size="small"
              onChange={(e) => setUpdatedTitle(e.target.value)}
              style={{ marginRight: "8px" }}
            />
            <Button variant="contained" color="primary" onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default MovieList;