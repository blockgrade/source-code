import { Box, Stack, Typography, Divider } from "@mui/material";
import { StyledButton } from "../styled-components/styled-button/styled-button";
import { FormField } from "../styled-components/form-field/form-field";
import { useContext, useState } from "react";
import { ethers } from "ethers";
import GradeContext from "../../context/grade.context";
import PdfUploader from "../ipfs-card/IpfsCard";
import uploadFile from "../../../utils/uploadFile";

export const FormCard = () => {
  const { state, contract } = useContext(GradeContext);

  const [formValues, setFormValues] = useState({
    student: "",
    discipline: "",
    grade: "",
    file: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (file) => {
    setFormValues({
      ...formValues,
      file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const gradeValue = ethers.toBigInt(
      Math.round(parseFloat(formValues.grade) * 100)
    );
    const file = await uploadFile(formValues.file);
    const amount = { value: ethers.parseEther("0.001") };
    const transaction = await contract.submitGradeWithFee(
      formValues.student,
      formValues.discipline,
      gradeValue,
      file,
      amount
    );
    await transaction.wait();
    window.location.reload();
    console.log("Transaction is successful");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#a6a2a0",
          borderRadius: 1,
          width: "calc(45%-1rem)",
          margin: "auto",
          paddingX: 3,
          paddingY: 5,
        }}
      >
        <Typography variant="h2" sx={{ color: "black" }}>
          {"Student's grade"}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Stack spacing={3} sx={{ width: 400, margin: "auto" }}>
          <FormField
            name="student"
            label="Student"
            color="black"
            value={formValues.student}
            onChange={handleChange}
            fullWidth
          />
          <FormField
            name="discipline"
            label="Discipline"
            color="black"
            value={formValues.discipline}
            onChange={handleChange}
            fullWidth
          />
          <FormField
            name="grade"
            label="Grade"
            color="black"
            value={formValues.grade}
            onChange={handleChange}
            fullWidth
          />
          <PdfUploader
            name="file"
            onChange={handleFileChange}
            value={formValues.file}
          />
          <StyledButton variant="contained" onClick={handleSubmit}>
            Register
          </StyledButton>
        </Stack>
      </Box>
    </>
  );
};
