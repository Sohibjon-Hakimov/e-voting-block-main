import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import Snackbars from "../../Helpers/SnackBar";

export default function VoterRegistration() {
  const [aadhar, setAadhar] = useState("");
  const [alert, setAlert] = useState("");
  const [alertName, setAlertName] = useState("");
  const [open, setOpen] = useState(false);
  const eVote = useSelector((state) => state.eVote.eVote);
  const account = useSelector((state) => state.account.account);
  const email = localStorage.getItem("email");
  const addAadhar = async () => {
    try {
      const res = await eVote.methods.usersList(email).call();
      const aadharRes = await eVote.methods.aadharList(aadhar).call();
      if (res.aadhar) {
        setAlert("warning");
        setAlertName("You already registered with ID");
        setOpen(true);
        return;
      }
      if (aadharRes.accountAddress !== "") {
        setAlert("warning");
        setAlertName("ID already used");
        setOpen(true);
        return;
      }
      await eVote.methods
        .createAdharEmail(aadhar, account, email)
        .send({ from: account });

      // window.location.reload();
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <div style={pageWrapper}>
      <Paper style={card} elevation={3}>
        <h2 style={title}>Verify Your ID</h2>
  
        <img
          alt="scanner"
          style={image}
          src="https://media4.giphy.com/media/Q7xOBMP7DcOdxSRAsi/200w.webp?cid=ecf05e47ixhwnkuiqwfq5nu707slp9gph0zts09dyoiimwlt&rid=200w.webp&ct=g"
        />
  
        <Divider style={{ width: "100%", margin: "20px 0" }} />
  
        <div style={formSection}>
          <label style={label}>ID Number *</label>
          <input
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            style={input}
            placeholder="Enter your ID"
          />
  
          <Button
            onClick={addAadhar}
            variant="contained"
            style={verifyButton}
          >
            Verify
          </Button>
        </div>
      </Paper>
  
      <Snackbars
        alertName={alertName}
        alert={alert}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
  
}
const pageWrapper = {
  backgroundColor: "#f4f7fb",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
};

const card = {
  width: "100%",
  maxWidth: 500,
  padding: 30,
  borderRadius: 16,
  backgroundColor: "#ffffff",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const title = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#2f3c7e",
  marginBottom: 20,
};

const image = {
  height: 160,
  width: 160,
  objectFit: "contain",
};

const formSection = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const label = {
  fontWeight: "bold",
  fontSize: 14,
  marginBottom: 5,
};

const input = {
  padding: 12,
  fontSize: 15,
  borderRadius: 8,
  border: "1.5px solid #2f3c7e",
  outline: "none",
};

const verifyButton = {
  marginTop: 10,
  backgroundColor: "#3949ab",
  fontWeight: "bold",
};
