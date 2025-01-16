import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./auth.css";
import { Snackbar, Alert, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSnackbar({ open: true, message: "Logged in successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Login failed!", severity: "error" });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSnackbar({ open: true, message: "Logged in successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Login with Google failed!", severity: "error" });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSnackbar({ open: true, message: "Logged out successfully!", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Logout failed!", severity: "error" });
    }
  };

  return (
    <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Movie App</h2>
          <input
            className="auth-input"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button className="auth-button" onClick={signIn}>
              Sign In
            </button>
            <button className="auth-button auth-button-google" onClick={signInWithGoogle}>
              Sign In With Google
            </button>
          </div>
        </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
