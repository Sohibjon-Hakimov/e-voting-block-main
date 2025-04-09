import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import Snackbars from "../../Helpers/SnackBar";

export default function AddCandidate() {
  const account = useSelector((state) => state.account.account);
  const eVote = useSelector((state) => state.eVote.eVote);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [party, setParty] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [alertName, setAlertName] = useState("");
  const [alert, setAlert] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setAlertName("Please fill all details");
    setAlert("warning");
    setOpen(true);
  };
  const addCandidates = async () => {
    setLoading(true);
    try {
      await eVote.methods
        .createCandidate(name, age, party, qualification)
        .send({ from: account });
      setAlertName("Transaction Successfull");
      setAlert("success");
      setOpen(true);
    } catch (error) {
      setAlertName("Something went wrong 😥, please try again");
      setAlert("error");
    }

    setLoading(false);
    setName("");
    setAge("");
    setParty("");
    setQualification("");
  };
  const getState = async () => {
    try {
      const st = await eVote.methods.changeState().call();
      setState(st);
    } catch (error) {}
  };
  useEffect(() => {
    getState();
  });

  return (
    
    
    <div
    
    style={{
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    }}
  >
      <Paper style={paper} elevation={3}>
        <h3 style={labels}>
          Name <span style={{ color: "red" }}>*</span>
        </h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputs}
          placeholder="Name"
        />
        <h3 style={labels}>
          Age <span style={{ color: "red" }}>*</span>
        </h3>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={inputs}
          placeholder="Age"
        />
        <h3 style={labels}>
          Party <span style={{ color: "red" }}>*</span>
        </h3>
        <input
          value={party}
          onChange={(e) => setParty(e.target.value)}
          style={inputs}
          placeholder="Party"
        />

        <h3 style={labels}>
          Qualification <span style={{ color: "red" }}>*</span>
        </h3>
        <input
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          style={inputs}
          placeholder="Qualification"
        />
        <br />
        <Button
          onClick={() => {
            if (!name || !age || !party || !qualification) {
              handleClick();
            } else if (state === "Registration" && !loading) {
              addCandidates();
            } else if (loading) {
              setAlertName("Please wait until transaction complete");
              setAlert("warning");
              setOpen(true);
            } else {
              setAlertName("Please change state to registration");
              setAlert("warning");
              setOpen(true);
            }
          }}
          style={button}
          variant="contained"
        >
          {loading ? (
            <ReactLoading
              height={25}
              width={25}
              type={"spinningBubbles"}
              color="white"
            />
          ) : (
            "Add Candidate"
          )}
        </Button>
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
const paper = {
  backgroundColor: "#ffffff",
  width: "100%",
  maxWidth: 500,
  padding: 30,
  borderRadius: 16,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const inputs = {
  height: 45,
  margin: "8px 0 20px 0",
  fontSize: 16,
  borderRadius: 8,
  outline: "none",
  border: "1px solid #ccc",
  padding: "10px 14px",
  transition: "0.3s",
};

const labels = {
  color: "#17202A",
  marginBottom: 5,
  fontSize: 14,
  fontWeight: "bold",
};

const button = {
  height: 45,
  borderRadius: 8,
  backgroundColor: "#3366FF",
  color: "white",
  fontWeight: "bold",
  fontSize: 15,
  marginTop: 15,
  transition: "0.3s",
  textTransform: "capitalize",
  ":hover": {
    backgroundColor: "#254EDB",
  },
};
