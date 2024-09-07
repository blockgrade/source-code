import {
  Box,
  styled,
  TextField,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const FormField = styled(TextField)({
  "& .MuiInputBase-input": {
    backgroundColor: "#d3c8bb",
    borderRadius: "10px",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#292d3d",
  "&:hover": {
    backgroundColor: "#4e5a6a",
  },
  padding: "10px 0px 10px 0px",
});

export const FormCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#a6a2a0",
        borderRadius: 1,
        boxShadow: "1px 32px 39px -3px rgba(0,0,0,0.75);",
        width: 500,
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
        <FormField label="Student" color="black" fullWidth />
        <FormField label="Discipline" color="black" fullWidth />
        <FormField label="Grade" color="black" fullWidth />
        {/* file input here */}
        <StyledButton variant="contained">Register</StyledButton>
      </Stack>
    </Box>
  );
};
