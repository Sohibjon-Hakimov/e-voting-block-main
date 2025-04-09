import React, { useEffect } from "react";
import { StyleRoot } from "radium";
import Button from "@mui/material/Button";
import { loadBlockchainData, loadWeb3 } from "../../Helpers/Web3Helpers";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    loadWeb3();
  }, []);
  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [dispatch]);
  return (
    
    <StyleRoot>
    <div style={rootDiv}>
      <div style={card}>
        <div style={leftDiv}>
          <h1 style={rightTitle}>Start voting in minutes</h1>
          <p style={rightCatption}>
            Polling made easy for all types of events. Manage polls and outcomes.
          </p>
          <div style={buttonsDiv}>
            <Button href="/Login" style={button} variant="contained">User Login</Button>
            <Button href="/AdminLogin" style={button} variant="contained">Admin Login</Button>
          </div>
        </div>
  
        <div style={rightDiv}>
          <img
            alt="Voting Illustration"
            src={require("../../voting2-removebg.png")}
            style={{ width: "80%", maxHeight: "300px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  </StyleRoot>
  
  );
}
const rootDiv = {
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f4f6f9, #dee3ea)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Poppins', sans-serif",
};

const card = {
  background: "#fff",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "80%",
  maxWidth: "1100px",
  display: "flex",
  overflow: "hidden",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    width: "90%",
  },
};

const leftDiv = {
  flex: 1,
  padding: "40px 30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const rightDiv = {
  flex: 1,
  backgroundColor: "#f4f6f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const rightTitle = {
  fontSize: "2rem",
  fontWeight: 700,
  marginBottom: "1rem",
  color: "#2c3e50",
};

const rightCatption = {
  fontSize: "1rem",
  color: "#5d6d7e",
  marginBottom: "2rem",
};

const buttonsDiv = {
  display: "flex",
  gap: "15px",
};

const button = {
  backgroundColor: "#3f51b5",
  color: "#fff",
  borderRadius: "8px",
  padding: "10px 20px",
  textTransform: "capitalize",
  fontWeight: "bold",
  fontSize: "1rem",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
};

