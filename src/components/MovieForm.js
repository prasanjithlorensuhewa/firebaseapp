import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { auth } from "../config/firebase";
import { Box, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

const MovieForm = ({ moviesCollectionRef, refreshMovies }) => {
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      refreshMovies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box mt={4} mb={4}>
      <TextField
        fullWidth
        label="Movie Title"
        variant="outlined"
        margin="normal"
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <TextField
        fullWidth
        label="Release Date"
        type="number"
        variant="outlined"
        margin="normal"
        onChange={(e) => setNewReleaseDate(Number(e.target.value))}
      />
      <FormControlLabel
        control={<Checkbox checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />}
        label="Received an Oscar"
      />
      <Button variant="contained" color="primary" onClick={onSubmitMovie}>
        Submit Movie
      </Button>
    </Box>
  );
};

export default MovieForm;