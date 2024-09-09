import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'relative',
    width: "50%",
    backgroundColor: "#FFF",
    padding: "1rem",
    borderRadius: "5px",
};

const DocumentDetail = ({ state, open, handleClose, grade }) => {
    const [payload, setPayload] = useState({
        'id': '',
        'student': '', 
        'discipline': '', 
        'grade': '', 'document': ''
    });

    useEffect(() => {
        if (grade) setPayload({
            'id': grade.id,
            'student': grade.student || '', 
            'discipline': grade.discipline || '', 
            'grade': ethers.formatUnits(grade.grade, 0) / 100 || '', 
            'document': grade.document || ''
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
        const gradeValue = ethers.toBigInt(Math.round(parseFloat(payload.grade) * 100));
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
    }

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={style}>
                    <IconButton onClick={handleClose} sx={{ backgroundColor: '#FFF', position: 'absolute', right: 0, top: -40 }} aria-label="close" size="small"><CloseIcon sx={{ color: 'red' }} /></IconButton>
                    <form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <TextField required id="outlined-required" label="Student" name="student" value={payload.student} onChange={handleChange} />
                            <TextField required id="outlined-required" label="Discipline" name="discipline" value={payload.discipline} onChange={handleChange} />
                            <TextField required id="outlined-required" label="Grade" name="grade" value={payload.grade} onChange={handleChange} />
                            <TextField required id="outlined-required" label="File" name="file" value={payload.file} onChange={handleChange} />
                            <Button variant="contained" sx={{ padding: '12px' }} type="submit" onClick={updateGradeInfo}>Update</Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default DocumentDetail;
