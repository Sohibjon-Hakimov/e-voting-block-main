import React, { useEffect, useState } from "react";
import { StyleRoot } from "radium";
import Button from "@mui/material/Button";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBlockchainData, loadWeb3 } from "../../Helpers/Web3Helpers";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const eVote = useSelector((state) => state.eVote.eVote);
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("please fill all details");
      setLoading(false);
      return;
    }

    try {
      const res = await eVote.methods.usersList(email).call();

      if (res.password === password) {
        navigate("/UserHome/Voter-Registration");
        localStorage.setItem("email", email);
      } else {
        alert("wrong user credintinals or please signup");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
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
          <img
            alt="illustration"
            src={require("../../voting2-removebg.png")}
            style={{ width: "80%", maxHeight: 350, objectFit: "contain" }}
          />
        </div>
  
        <div style={rightDiv}>
          <img
            alt="login icon"
       src="data:image/png;base64,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"
            style={{ height: 60, marginBottom: 10 }}
          />
          <div style={inputDiv}>
            <h3 style={{ fontSize: 24, marginBottom: 20, color: "#2c3e50" }}>Login</h3>
            <label style={labels}>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputs}
              placeholder="Email"
              type="email"
            />
  
            <label style={labels}>
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputs}
              placeholder="Password"
              type="password"
            />
  
            <Button onClick={login} style={button} variant="contained">
              {loading ? (
                <ReactLoading
                  height={30}
                  width={30}
                  type={"spinningBubbles"}
                  color="white"
                />
              ) : (
                "Login"
              )}
            </Button>
  
            <Button href="/SignUp" style={create}>
              Create a new account
            </Button>
          </div>
        </div>
      </div>
    </div>
  </StyleRoot>
  
  );
}
const rootDiv = {
  background: "linear-gradient(135deg, #f4f6f9, #dee3ea)",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'Poppins', sans-serif",
};

const card = {
  background: "#fff",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  width: "90%",
  maxWidth: "1000px",
  display: "flex",
  overflow: "hidden",
  minHeight: "500px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
  },
};

const leftDiv = {
  flex: 1,
  backgroundColor: "#f4f6f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  "@media (max-width: 768px)": {
    display: "none",
  },
};

const rightDiv = {
  flex: 1,
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 20px",
};

const inputDiv = {
  width: "80%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
};

const labels = {
  marginBottom: 5,
  fontWeight: "bold",
  color: "#2c3e50",
};

const inputs = {
  backgroundColor: "#f0f3f7",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #d1d9e6",
  marginBottom: 20,
  fontSize: 16,
  outline: "none",
};

const button = {
  backgroundColor: "#3f51b5",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  borderRadius: "8px",
  height: 45,
  marginBottom: 15,
};

const create = {
  fontSize: "0.9rem",
  fontWeight: "bold",
  color: "#3f51b5",
  textTransform: "uppercase",
  textAlign: "center",
  marginTop: 10,
};
