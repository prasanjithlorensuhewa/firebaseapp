import "./App.css";
import { Auth } from "./components/auth";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import { useEffect, useState, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { auth } from "./config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const moviesCollectionRef = useMemo(() => collection(db, "movies"), []);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed!", err);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getMovieList();
    }
  }, [isLoggedIn, moviesCollectionRef]);

  return (
    <Container>
      <Box position="relative">
      <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#007BFF",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
          }}
        >
          🎥 Movie Management App 🎬
        </Typography>
        
        {isLoggedIn && (
          <IconButton
            color="secondary"
            aria-label="logout"
            onClick={handleLogout}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <LogoutIcon />
          </IconButton>
        )}

        {!isLoggedIn && <Auth/>}
      </Box>

      {isLoggedIn && (
        <Box mt={4}>
          <MovieForm
            moviesCollectionRef={moviesCollectionRef}
            refreshMovies={getMovieList}
          />
          <MovieList movieList={movieList} refreshMovies={getMovieList} />
        </Box>
      )}
    </Container>
  );
}

export default App;
