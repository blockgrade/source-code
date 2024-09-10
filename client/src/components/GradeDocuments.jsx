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
import { StyledButton } from "./styled-components/styled-button/styled-button";
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
      setGradeDocument(grades);
    };
    contract && gradesList();
  }, [contract]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "calc(65%-1rem)", backgroundColor: "#a6a2a0" }}
      >
        <Table className="table-content" aria-label="simple table">
          <TableHead
            sx={{ backgroundColor: "#1f222e", borderBottomColor: "#1f222e" }}
          >
            <TableRow>
              <TableCell sx={{ color: "white" }} align="center"></TableCell>
              <TableCell sx={{ color: "white" }} align="center"></TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Student
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Discipline
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Grade
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Timestamp
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Document
              </TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                From
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#1f222e" }}>
            {gradeDocument && gradeDocument.length > 0 ? (
              gradeDocument.map((gradeDoc, index) => {
                const grade = ethers.formatUnits(gradeDoc.grade, 0) / 100;
                const timestamp = new Date(
                  Number(gradeDoc.timestamp) * 1000
                ).toLocaleString();
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      ...(index % 2 == 0 && {
                        backgroundColor: "#d3c8bb",
                      }),
                      ...(index % 2 != 0 && {
                        backgroundColor: "#a6a2a0",
                      }),
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{ minWidth: 150, borderBottomColor: "#1f222e" }}
                    >
                      <StyledButton
                        sx={{ backgroundColor: "#7f90a4" }}
                        type="button"
                      >
                        View Document
                      </StyledButton>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 150, borderBottomColor: "#1f222e" }}
                    >
                      <StyledButton
                        sx={{ backgroundColor: "#7f90a4" }}
                        type="button"
                        onClick={() => handleOpen(gradeDoc)}
                      >
                        Update
                      </StyledButton>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 150, borderBottomColor: "#1f222e" }}
                    >
                      {gradeDoc.student}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 150, borderBottomColor: "#1f222e" }}
                    >
                      {gradeDoc.discipline}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottomColor: "#1f222e" }}
                    >
                      {grade}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ minWidth: 150, borderBottomColor: "#1f222e" }}
                    >
                      {timestamp}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottomColor: "#1f222e" }}
                    >
                      {gradeDoc.document}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderBottomColor: "#1f222e" }}
                    >
                      {gradeDoc.from}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No grades available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: "absolute" }}>
        {open && (
          <DocumentDetail
            state={state}
            open={open}
            handleClose={handleClose}
            grade={selectedGrade}
          />
        )}
      </Box>
    </>
  );
};

export default GradeDocuments;
