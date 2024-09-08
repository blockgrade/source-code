import { Box, Stack, Typography, Divider } from "@mui/material";
import { StyledButton } from "../styled-components/styled-button/styled-button";
import { FormField } from "../styled-components/form-field/form-field";
import { useState } from "react";
import { ethers } from "ethers";

export const FormCard = ({ state }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formValues);

    const { contract } = state;
    console.log(contract)
    const gradeValue = ethers.toBigInt(
      Math.round(parseFloat(formValues.grade) * 100)
    );

    const amount = { value: ethers.parseEther("0.001") };
    const transaction = await contract.submitGradeWithFee(
      formValues.student,
      formValues.discipline,
      gradeValue,
      formValues.file,
      amount
    );
    await transaction.wait();
    console.log("Transaction is successful");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#a6a2a0",
        borderRadius: 1,
        boxShadow: "1px 32px 39px -3px rgba(0,0,0,0.75);",
        width: 'calc(45%-1rem)',
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
        <FormField
          name="file"
          label="File"
          color="black"
          value={formValues.file}
          onChange={handleChange}
          fullWidth
        />
        {/* <FileUpload
          name="file"
          onChange={handleChange}
          value={formValues.file}
        /> */}
        <StyledButton variant="contained" onClick={handleSubmit}>
          Register
        </StyledButton>
      </Stack>
    </Box>
  );
};
