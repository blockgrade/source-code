import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload-input").click();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <input
        type="file"
        id="file-upload-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadFileIcon />}
        onClick={handleUploadClick}
      >
        Upload File
      </Button>
      {selectedFile && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Selected File: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
