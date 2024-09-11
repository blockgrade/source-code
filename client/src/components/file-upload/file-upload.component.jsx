import { useState } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { StyledButton } from "../styled-components/styled-button/styled-button";

const FileUpload = ({ onChange, name, value }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    onChange(event);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload-input").click();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <input
        type="file"
        id="file-upload-input"
        name={name}
        value={value}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <StyledButton
        variant="contained"
        color="primary"
        startIcon={<UploadFileIcon />}
        onClick={handleUploadClick}
      >
        Upload File
      </StyledButton>
      {selectedFile && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
