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

import "./GradeDocuments.css";
import { Box, Button } from "@mui/material";
import DocumentDetail from "./modal/DocumentDetail";

const GradeDocuments = ({ state }) => {
    const [gradeDocument, setGradeDocument] = useState([]);
    const { contract } = state;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const gradesList = async () => {
            const grades = await contract.getGrades();
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
                            <TableCell align="center">Student</TableCell>
                            <TableCell align="center">Discipline</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">Timestamp</TableCell>
                            <TableCell align="center">Document</TableCell>
                            <TableCell align="center">From</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gradeDocument.map((gradeDoc, index) => {
                            const grade =
                                ethers.formatUnits(gradeDoc.grade, 0) / 100;
                            const timestamp = new Date(
                                Number(gradeDoc.timestamp) * 1000
                            ).toLocaleString();

                            return (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell
                                        align="center"
                                        sx={{ minWidth: 150 }}
                                    >
                                        <Button type="button" variant="outlined" onClick={handleOpen}>
                                            Detalhe
                                        </Button>
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ minWidth: 150 }}
                                    >
                                        {gradeDoc.student}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ minWidth: 150 }}
                                    >
                                        {gradeDoc.discipline}
                                    </TableCell>
                                    <TableCell align="center">
                                        {grade}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ minWidth: 150 }}
                                    >
                                        {timestamp}
                                    </TableCell>
                                    <TableCell align="center">
                                        {gradeDoc.document}
                                    </TableCell>
                                    <TableCell align="center">
                                        {gradeDoc.from}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
			<Box sx={{position: 'absolute'}}>{open && <DocumentDetail open={open} handleClose={handleClose}/>}</Box>
        </>
    );
};

export default GradeDocuments;
