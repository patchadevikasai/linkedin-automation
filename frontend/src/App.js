import React, { useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap"; // For loading spinner

const App = () => {
  const [query, setQuery] = useState("");
  const [maxPages, setMaxPages] = useState(3); // Default to 3 pages
  const [message, setMessage] = useState("");
  const [connectionsSent, setConnectionsSent] = useState(0); // Track connections sent
  const [loading, setLoading] = useState(false); // Track loading state

  const startAutomation = async () => {
    // Validation: Check if query and maxPages are filled
    if (!query.trim()) {
      setMessage("❌ Please enter a valid search query.");
      return;
    }

    if (maxPages <= 0) {
      setMessage("❌ Please enter a valid number of pages (greater than 0).");
      return;
    }

    try {
      setLoading(true); // Start loading state
      setMessage("⏳ Starting LinkedIn Automation...");
      const response = await axios.post("http://127.0.0.1:5000/start", { 
        query, 
        max_pages: maxPages 
      });

      setMessage(response.data.message); // Assuming your backend sends a message
      setConnectionsSent(response.data.connectionsSent); // Assuming the backend returns connections sent
    } catch (error) {
      console.error("❌ Error:", error);
      setMessage("❌ Failed to start automation.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container p-5 rounded-lg shadow-lg" style={containerStyle}>
        
        {/* LinkedIn Logo with Font Awesome - Increased Size */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <i 
            className="fab fa-linkedin" 
            style={{ fontSize: "70px", color: "#0077B5", marginRight: "10px" }} // Further increased size
          ></i>
          <h2 className="mb-0" style={headerStyle}>LinkedIn Connection Automation</h2>
        </div>

        {/* Search Query */}
        <div className="form-group">
          <label htmlFor="query" style={labelStyle}>Search Query</label>
          <input
            type="text"
            className="form-control my-3"
            id="query"
            placeholder="Enter search query (e.g., HR recruiters)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Max Pages */}
        <div className="form-group">
          <label htmlFor="maxPages" style={labelStyle}>Number of Pages</label>
          <input
            type="number"
            className="form-control my-3"
            id="maxPages"
            placeholder="Enter number of pages (e.g., 3)"
            value={maxPages}
            min="1"
            onChange={(e) => setMaxPages(Number(e.target.value))}
            style={inputStyle}
          />
        </div>

        {/* Start Automation Button */}
        <button 
          className="btn btn-primary w-100" 
          onClick={startAutomation} 
          style={buttonStyle}
          disabled={loading} // Disable button when loading
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Start Automation"}
        </button>

        {/* Message Feedback */}
        {message && <p className="mt-3 text-center" style={messageStyle}>{message}</p>}

        {/* Connections Sent */}
        {connectionsSent > 0 && (
          <p className="mt-3 text-center" style={connectionsSentStyle}>
            ✅ {connectionsSent} connections sent!
          </p>
        )}
      </div>
    </div>
  );
};

// Professional Color Scheme Styles
const containerStyle = {
  maxWidth: "500px",
  backgroundColor: "#ffffff", // White background for a clean look
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow to lift the container
};

const headerStyle = {
  color: "#2c3e50", // Dark gray for header text to convey professionalism
  fontWeight: "700", // Bold for emphasis
  fontSize: "31px", // Slightly larger for header
};

const labelStyle = {
  color: "#34495e", // Soft dark gray for labels
  fontWeight: "600", // Bold to make labels stand out
  fontSize: "16px", // Slightly smaller size for labels
};

const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #bdc3c7", // Subtle border
  transition: "border-color 0.3s ease",
};

const buttonStyle = {
  fontSize: "18px", 
  padding: "14px", 
  borderRadius: "8px", 
  transition: "background-color 0.3s ease",
  backgroundColor: "#2980b9", // Professional blue
  borderColor: "#2980b9", // Blue border to match the button color
  fontWeight: "600",
};

const messageStyle = {
  fontSize: "16px", 
  color: "#e74c3c", // Red color for error messages
};

const connectionsSentStyle = {
  fontSize: "16px", 
  color: "#27ae60", // Green for success message
};

export default App;
