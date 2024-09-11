import { useEffect, useState } from "react";
import { ethers } from "ethers";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Box, Button } from "@mui/material";
import DocumentDetail from "./modal/DocumentDetail";

const GradeDocuments = ({ state }) => {
    const [gradeDocument, setGradeDocument] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(null);
    const { contract } = state;

    const [open, setOpen] = useState(false);
    const handleOpen = (gradeDoc) => (setSelectedGrade(gradeDoc), setOpen(true));
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const gradesList = async () => {
            const grades = await contract.getGrades();
            console.log('grades', grades);
            setGradeDocument(grades);
        };   
        contract && gradesList();
    }, [contract]);
   
    return (
        <>
            <TableContainer component={Paper} sx={{width: 'calc(65%-1rem)'}}>
                <Table className="table-content" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center">Student</TableCell>
                            <TableCell align="center">Discipline</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">Timestamp</TableCell>
                            <TableCell align="center">Document</TableCell>
                            <TableCell align="center">From</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeDocument && gradeDocument.length > 0 ? (
                            gradeDocument.map((gradeDoc, index) => {
                                const grade = ethers.formatUnits(gradeDoc.grade, 0) / 100;
                                const timestamp = new Date(Number(gradeDoc.timestamp) * 1000).toLocaleString();
                                return (
                                    <TableRow key={index} sx={{"&:last-child td, &:last-child th": {border: 0 }}}>
                                        <TableCell align="center" sx={{ minWidth: 150 }}><Button type="button" variant="outlined" href={`https://gold-far-raven-8.mypinata.cloud/ipfs/${gradeDoc.document}`}>View Document</Button></TableCell>
                                        <TableCell align="center" sx={{ minWidth: 150 }}><Button type="button" variant="outlined" onClick={() => handleOpen(gradeDoc)}>Update</Button></TableCell>
                                        <TableCell align="center" sx={{ minWidth: 150 }}>{gradeDoc.student}</TableCell>
                                        <TableCell align="center" sx={{ minWidth: 150 }}>{gradeDoc.discipline}</TableCell>
                                        <TableCell align="center">{grade}</TableCell>
                                        <TableCell align="center" sx={{ minWidth: 150 }}>{timestamp}</TableCell>
                                        <TableCell align="center">{gradeDoc.document}</TableCell>
                                        <TableCell align="center">{gradeDoc.from}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                        <TableRow>
                    <TableCell colSpan={8} align="center">No grades available</TableCell>
                    </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
			<Box sx={{position: 'absolute'}}>{open && <DocumentDetail state={state} open={open} handleClose={handleClose} grade={selectedGrade} />}</Box>
        </>
    );
};

export default GradeDocuments;
