import React, { useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import { LinkedIn } from "@mui/icons-material";

const App = () => {
  const [query, setQuery] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // Default type
  const [connectionsSent, setConnectionsSent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [automationComplete, setAutomationComplete] = useState(false); // New state to track completion

  const cancelAutomation = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/cancel");
      setCancelled(true);
      setMessageType("warning");
      setMessage("⚠️ Automation cancelled.");
      setConnectionsSent(response.data.connectionsSent || 0);
    } catch (error) {
      console.error("❌ Error:", error);
      setMessageType("error");
      setMessage("❌ Failed to cancel automation.");
    } finally {
      setLoading(false);
    }
  };

  const startAutomation = async () => {
    if (!query.trim() || !maxPages || maxPages <= 0) {
      setMessageType("error");
      setMessage("Please enter a valid search query and number of pages (greater than 0).");
      return;
    }

    try {
      setLoading(true);
      setMessage(""); // Clear any previous messages
      setConnectionsSent(0); // Reset connections sent counter
      setAutomationComplete(false); // Reset automation complete flag

      const response = await axios.post("http://127.0.0.1:5000/start", { query, max_pages: Number(maxPages) });

      if (!response.data || !response.data.message) {
        throw new Error("Invalid response from the server.");
      }

      setMessageType("success");
      setMessage(response.data.message);
      setConnectionsSent(response.data.connectionsSent || 0);
      setAutomationComplete(true); // Set the automation as complete
    } catch (error) {
      setMessageType("error");
      setMessage("Failed to start automation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      px={2}
    >
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <LinkedIn sx={{ fontSize: 95, color: "#0077B5" }} />
          <Typography variant="h4" fontWeight="bold" color="#333" ml={2} sx={{ textAlign: "center", width: "100%" }}>
            LinkedIn Networking Automation Tool
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Explanation Text */}
        <Typography variant="body2" color="textSecondary" paragraph>
          This tool automates LinkedIn connection requests. Search users by
          keywords and specify the number of pages to process, making it a fast
          way to expand your network.
        </Typography>

        {/* Search Query Input */}
        <TextField
          label="Search Query"
          variant="outlined"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query (e.g., HR recruiters)"
          sx={{ fontSize: "14px" }}
        />

        {/* Number of Pages Input */}
        <TextField
          label="Number of Pages"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={maxPages}
          onChange={(e) => setMaxPages(e.target.value)}
          inputProps={{ min: 1 }}
          sx={{ fontSize: "14px" }}
        />

        {/* Error or Success Message */}
        {message && (
          <Alert severity={messageType} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}

        {/* Start Automation Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 1,
            mt: 2,
            fontWeight: "bold",
            fontSize: "16px",
            height: 48,
          }}
          onClick={startAutomation}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="secondary" /> : "Start Automation"}
        </Button>

        {/* Cancel Automation Button */}
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{
            py: 1,
            mt: 2,
            fontWeight: "bold",
            fontSize: "16px",
            height: 48,
          }}
          onClick={cancelAutomation}
          disabled={loading || cancelled}
        >
          Cancel Automation
        </Button>

        {/* Loading Spinner */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress size={40} />
          </Box>
        )}

        {/* Success Message for Connections Sent */}
        {automationComplete && connectionsSent > 0 && (
          <Alert severity="success" sx={{ mt: 3 }}>
            ✅ {connectionsSent} connection requests sent successfully!
          </Alert>
        )}

        
      </Paper>
    </Box>
  );
};

export default App;
