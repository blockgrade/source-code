import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import FileUpload from "../file-upload/file-upload";

const style = {
    width: "50%",
    backgroundColor: "#FFF",
    padding: "1rem",
    borderRadius: "5px",
};

const DocumentDetail = ({ open, handleClose }) => {
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
                    <form>
                        <Stack gap={2}>
                            <TextField
                                required
                                id="outlined-required"
                                label="Student"
                                defaultValue=""
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Discipline"
                                defaultValue=""
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Grade"
                                defaultValue=""
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="File"
                                defaultValue=""
                            />
                            <Button variant="contained" sx={{padding: '12px'}} type="submit">Update</Button>
                            {/* <FileUpload
                                name="file"
                                onChange={handleChange}
                                value={formValues.file}
                            /> */}
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default DocumentDetail;
