import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CloseIcon from "@mui/icons-material/Close";
import { StyledButton } from "../styled-components/styled-button/styled-button";

const style = {
  position: "relative",
  width: "50%",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#d3c8bb",
};

const DocumentDetail = ({ state, open, handleClose, grade }) => {
  const [payload, setPayload] = useState({
    id: "",
    student: "",
    discipline: "",
    grade: "",
    document: "",
  });

  useEffect(() => {
    if (grade)
      setPayload({
        id: grade.id,
        student: grade.student || "",
        discipline: grade.discipline || "",
        grade: ethers.formatUnits(grade.grade, 0) / 100 || "",
        document: grade.document || "",
      });
  }, [grade]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(payload);
  };

  const updateGradeInfo = async (event) => {
    event.preventDefault();

    const { contract } = state;
    const gradeValue = ethers.toBigInt(
      Math.round(parseFloat(payload.grade) * 100)
    );
    const amount = { value: ethers.parseEther("0.001") };
    const transaction = await contract.updateGrade(
      payload.id,
      payload.student,
      payload.discipline,
      gradeValue,
      payload.file,
      amount
    );
    await transaction.wait();

    console.log("Transaction is successful");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              backgroundColor: "transparent",
              alignSelf: "flex-end",
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon sx={{ color: "red" }} />
          </IconButton>
          <Typography
            variant="h3"
            align="center"
            sx={{ color: "black", marginBottom: 4 }}
          >
            Update student
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack gap={2}>
              <TextField
                required
                id="outlined-required"
                label="Student"
                name="student"
                sx={{ backgroundColor: "#f5e8da" }}
                value={payload.student}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Discipline"
                name="discipline"
                sx={{ backgroundColor: "#f5e8da" }}
                value={payload.discipline}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Grade"
                name="grade"
                sx={{ backgroundColor: "#f5e8da" }}
                value={payload.grade}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="File"
                name="file"
                sx={{ backgroundColor: "#f5e8da" }}
                value={payload.file}
                onChange={handleChange}
              />
              <StyledButton
                variant="contained"
                sx={{ padding: "12px" }}
                type="submit"
                onClick={updateGradeInfo}
              >
                Update
              </StyledButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default DocumentDetail;
