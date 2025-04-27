import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Container, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SystemLock = () => {
    const [isLocked, setIsLocked] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const correctPassword = "1234"; // Change as needed
    const navigate = useNavigate(); // Correct way to use navigation

    // Handle keypress to lock system (Shift + L)
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.shiftKey && event.key === "L") {
                setIsLocked(true);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    // Disable interactions when locked, but allow input
    useEffect(() => {
        if (isLocked) {
            window.addEventListener("keydown", preventEvent, true);
            window.addEventListener("mousedown", preventEvent, true);
            window.addEventListener("keydown", handleKeyPress);
        } else {
            window.removeEventListener("keydown", preventEvent, true);
            window.removeEventListener("mousedown", preventEvent, true);
            window.removeEventListener("keydown", handleKeyPress);
        }
        return () => {
            window.removeEventListener("keydown", preventEvent, true);
            window.removeEventListener("mousedown", preventEvent, true);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [isLocked]);

    const preventEvent = (e) => {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    // Function to handle Enter key for unlocking
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleUnlock();
        }
    };

    // Function to unlock the system
    const handleUnlock = () => {
        if (password === correctPassword) {
            navigate("/pages/profile/profile-overview");
            setIsLocked(false);
            setPassword("");
            setError("");
        } else {
            setError("Incorrect password! Please try again.");
        }
    };

    // Lock screen UI
    if (isLocked) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "black",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Paper
                    sx={{
                        p: 4,
                        bgcolor: "#1e1e1e",
                        color: "white",
                        width: "90%",
                        maxWidth: "400px",
                        borderRadius: "10px",
                        textAlign: "center",
                    }}
                    elevation={10}
                >
                    <Typography variant="h5" gutterBottom>
                        🔒 System Locked
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Please enter your password to unlock.
                    </Typography>
                    <TextField
                        type="password"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            bgcolor: "white",
                            borderRadius: "5px",
                            mb: 2,
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            bgcolor: "#1976d2",
                            color: "white",
                            "&:hover": { bgcolor: "#1565c0" },
                        }}
                        onClick={handleUnlock}
                    >
                        Unlock
                    </Button>
                    {error && (
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                </Paper>
            </Box>
        );
    }

    // Main UI
    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                System Lock Page
            </Typography>
            {/* <Typography variant="body1">
                Press <strong>Shift + L</strong> to lock the system.
            </Typography>
            <Button
                variant="contained"
                color="error"
                sx={{ mt: 3 }}
                onClick={() => setIsLocked(true)}
            >
                Lock Now
            </Button> */}
        </Container>
    );
};

export default SystemLock;
