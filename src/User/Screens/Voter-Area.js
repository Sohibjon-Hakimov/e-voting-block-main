import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandidates } from "../../Helpers/getData";
import Snackbars from "../../Helpers/SnackBar";
import CandidateCard from "../Components/CandidatesCard";
import CandidatesEmptyPage from "../Components/EmptyPages";

export default function VoterArea() {
  const dispatch = useDispatch();
  const [aadhar, setAadhar] = useState("");
  const [alert, setAlert] = useState("");
  const [state, setState] = useState("");
  const [alertName, setAlertName] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const email = localStorage.getItem("email");

  const eVote = useSelector((state) => state.eVote.eVote);
  const candidatesList = useSelector(
    (state) => state.candidates.candidatesList
  );

  const handleClick = () => {
    if (aadhar === "") {
      setAlertName("You are not registered your aadhar");
      setAlert("warning");
    } else {
      setAlertName("You have already voted");
      setAlert("error");
    }
    setOpen(true);
  };

  const getAadhar = async () => {
    try {
      const res = await eVote.methods.usersList(email).call();
      setAadhar(res.aadhar);
      setIsVoted(res.isVoted);
    } catch (error) {}
  };

  const getState = async () => {
    try {
      const st = await eVote.methods.changeState().call(); // <-- Corrected method
      console.log("Fetched state:", st);
      setState(st);

      // Initialize endTime only once
      const saved = localStorage.getItem("votingEndTime");
      if (st === "Voting") {
        if (saved) {
          setEndTime(parseInt(saved));
        } else {
          const end = Date.now() + 6 * 60 * 60 * 1000;
          localStorage.setItem("votingEndTime", end);
          setEndTime(end);
        }
      } else {
        setEndTime(null);
        localStorage.removeItem("votingEndTime");
      }
    } catch (error) {
      console.error("Error fetching state:", error.message);
    }
  };

  useEffect(() => {
    getCandidates(dispatch, eVote);
    getAadhar();
    getState();
  }, [dispatch, eVote]);

  useEffect(() => {
    let interval = null;

    if (endTime) {
      interval = setInterval(() => {
        const remaining = Math.max(0, endTime - Date.now());
        setTimeLeft(remaining);

        if (remaining <= 0) {
          setState("Result");
          clearInterval(interval);
          localStorage.removeItem("votingEndTime");
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [endTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  if (candidatesList.length === 0 || state === "Registration") {
    return (
      <CandidatesEmptyPage
        image="https://img.freepik.com/free-vector/voters-inserting-forms-into-ballot-boxes_74855-4585.jpg"
        header={"Hold on! admin is adding candidates"}
      />
    );
  }

  if (state === "Result") {
    return (
      <CandidatesEmptyPage
        image="https://img.freepik.com/free-vector/voters-inserting-forms-into-ballot-boxes_74855-4585.jpg"
        header={"Voting is done, Results are announced"}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: 20,
      }}
    >
      {/* Timer */}
      {state === "Voting" && (
        <div style={{ width: "100%", textAlign: "center", marginBottom: 20 }}>
          <h2 style={{ color: "#3366FF", fontWeight: "bold" }}>
            Voting ends in: {formatTime(timeLeft)}
          </h2>
        </div>
      )}

      {/* Candidates */}
      {candidatesList.map((data, index) => (
        <CandidateCard
          key={index}
          id={data.id}
          name={data.name}
          partyName={data.party}
          imageUrl={data.imageUrl}
          aadhar={aadhar}
          email={email}
          isVoted={isVoted}
          handleClick={handleClick}
        />
      ))}

      <Snackbars
        alertName={alertName}
        alert={alert}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
