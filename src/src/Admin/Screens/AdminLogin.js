import React, { useState } from "react";
import { StyleRoot } from "radium";
import Button from "@mui/material/Button";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("please fill all details");
      setLoading(false);
      return;
    }
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/AdminHome/Candidate-Details");
      setLoading(false);
    } else {
      alert("please enter valid admin details");
      setLoading(false);
    }
  };

  return (
    <StyleRoot>
    <div style={pageWrapper}>
      <div style={card}>
        <div style={cardLeft}>
          <img
            alt="background"
            src={require("../../voting2-removebg.png")}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
        <div style={cardRight}>
          <img
            alt="login"
       src="data:image/png;base64,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"
            style={{ height: 60, width: 60, marginBottom: 10 }}
          />
          <h3 style={title}>Admin Login</h3>
  
          <h4 style={label}>Email <span style={{ color: "red" }}>*</span></h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            placeholder="Email"
            type="email"
          />
  
          <h4 style={label}>Password <span style={{ color: "red" }}>*</span></h4>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            placeholder="Password"
            type="password"
          />
  
          <Button onClick={login} style={loginBtn} variant="contained">
            {loading ? (
              <ReactLoading height={20} width={20} type="spinningBubbles" color="white" />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    </div>
  </StyleRoot>
  
  );
}
const pageWrapper = {
  backgroundColor: "#f4f7fb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: 20,
};

const card = {
  display: "flex",
  flexDirection: "row",
  width: "85%",
  maxWidth: 1000,
  borderRadius: 20,
  backgroundColor: "white",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const cardLeft = {
  flex: 1,
  backgroundColor: "#f0f3f9",
  padding: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardRight = {
  flex: 1,
  padding: 30,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundColor: "white",
};

const title = {
  marginBottom: 20,
  fontSize: 26,
  fontWeight: "bold",
  color: "#333",
};

const label = {
  marginBottom: 6,
  fontSize: 14,
  color: "#333",
};

const input = {
  padding: "12px 16px",
  marginBottom: 16,
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
};

const loginBtn = {
  backgroundColor: "#3949ab",
  color: "white",
  padding: "12px 0",
  borderRadius: 10,
  fontWeight: "bold",
  marginTop: 10,
};
