import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import FileUpload from "../file-upload/file-upload";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'relative',
    width: "50%",
    backgroundColor: "#FFF",
    padding: "1rem",
    borderRadius: "5px",
};

const DocumentDetail = ({ open, handleClose }) => {
    const [payload, setPayload] = useState({
        student: "",
        discipline: "",
        grade: "",
        file: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayload({
            ...payload,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(payload)
    }

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
                    <IconButton onClick={handleClose} sx={{backgroundColor: '#FFF', position: 'absolute', right: 0, top: -40}} aria-label="close" size="small">
                        <CloseIcon sx={{color: 'red'}}/>
                    </IconButton>
                    <form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Student"
                                defaultValue=""
                                name="student"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Discipline"
                                defaultValue=""
                                name="discipline"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Grade"
                                name="grade"
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="File"
                                defaultValue=""
                                name="file"
                                onChange={handleChange}
                            />
                            {/* <FileUpload
                                name="file"
                                onChange={handleChange}
                                value={formValues.file}
                            /> */}
                            <Button variant="contained" sx={{padding: '12px'}} type="submit">Update</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default DocumentDetail;
