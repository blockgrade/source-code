import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import CloseIcon from "@mui/icons-material/Close";
import { StyledButton } from "../styled-components/styled-button/styled-button";
import GradeContext from "../../context/grade.context";
import PdfUploader from "../ipfs-card/IpfsCard";
import uploadFile from "../../../utils/uploadFile";
import { fileGlobal } from "../ipfs-card/IpfsCard";
const style = {
  position: "relative",
  width: "50%",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#d3c8bb",
};

const DocumentDetail = ({ open, handleClose, grade }) => {
  const { state, contract } = useContext(GradeContext);
  const [formValues, setFormValues] = useState({
    id: grade.id,
    student: grade.student || "",
    discipline: grade.discipline || "",
    grade: ethers.formatUnits(grade.grade, 0) / 100 || "",
    file: "",
  });

  useEffect(() => {
    console.log("Form values updated:", formValues);
  }, [formValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (file) => {
    console.log("File received in DocumentDetail:", file);
    setFormValues((prevValues) => ({
      ...prevValues,
      file,
    }));
  };

  const updateGrade = async (event) => {
    event.preventDefault();
    console.log("Payload before submission:", formValues);

    const gradeValue = ethers.toBigInt(
      Math.round(parseFloat(formValues.grade) * 100)
    );
    console.log("aquir", fileGlobal);
    const file = await uploadFile(fileGlobal);
    const transaction = await contract.updateGrade(
      formValues.id,
      formValues.student,
      formValues.discipline,
      gradeValue,
      file
    );
    await transaction.wait();
    window.location.reload();
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
          <form onSubmit={updateGrade}>
            <Stack gap={2}>
              <TextField
                required
                id="outlined-required"
                label="Student"
                name="student"
                sx={{ backgroundColor: "#f5e8da" }}
                value={formValues.student}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Discipline"
                name="discipline"
                sx={{ backgroundColor: "#f5e8da" }}
                value={formValues.discipline}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Grade"
                name="grade"
                sx={{ backgroundColor: "#f5e8da" }}
                value={formValues.grade}
                onChange={handleChange}
              />
              <PdfUploader name="fileUpdate" onChange={handleFileChange} />
              <StyledButton
                variant="contained"
                sx={{ padding: "12px" }}
                type="submit"
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
