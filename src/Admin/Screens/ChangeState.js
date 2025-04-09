import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { changeStateAction } from "../../Api/action";
export default function ChangeState() {
  const [value, setValue] = React.useState("");
  const [state, setState] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const dispatch = useDispatch();

  const eVote = useSelector((state) => state.eVote.eVote);
  const account = useSelector((state) => state.account.account);
  const changeState = async () => {
    try {
      await eVote.methods.changeStates(value).send({ from: account });
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
    //dispatch(changeStateAction(value));
  };
  const getState = async () => {
    try {
      const st = await eVote.methods.changeState().call();
      dispatch(changeStateAction(st));
      setState(st);
    } catch (error) {
      //alert(error.message);
    }
  };

  useEffect(() => {
    getState();
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#f5f7fa",
        padding: 20,
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: 30,
          borderRadius: 16,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: 20, color: "#3366FF" }}>
          Current State: {state}
        </h2>
  
        <FormControl component="fieldset">
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Voting"
              control={<Radio color="success" />}
              label="Voting"
            />
            <FormControlLabel
              value="Registration"
              control={<Radio color="success" />}
              label="Registration"
            />
            <FormControlLabel
              value="Result"
              control={<Radio color="success" />}
              label="Result"
            />
          </RadioGroup>
  
          <Button
            onClick={changeState}
            variant="contained"
            style={{
              marginTop: 20,
              backgroundColor: "#3366FF",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            Change State
          </Button>
        </FormControl>
      </Paper>
    </div>
  );
  
}
