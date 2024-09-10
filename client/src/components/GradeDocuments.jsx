import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledButton } from "./styled-components/styled-button/styled-button";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import DocumentDetail from "./modal/DocumentDetail";
import LaunchIcon from "@mui/icons-material/Launch";
import HistoryIcon from "@mui/icons-material/History";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import { HistoryModal } from "./modal/history-modal";
import GradeContext from "../context/grade.context";

const GradeDocuments = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, gradeDocument, getGradesList, contract } =
    useContext(GradeContext);

  const [documentModalOpen, setDocumentModalOpenOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const handleOpen = () => {
    handleMenuClose();
    // setSelectedGrade(gradeDoc);
    setDocumentModalOpenOpen(true);
  };
  const handleClose = () => setDocumentModalOpenOpen(false);

  const handleHistoryModal = () => {
    setHistoryModalOpen(true);
  };

  const handleMenuClick = (event, gradeDoc) => {
    setAnchorEl(event.currentTarget);
    setSelectedGrade(gradeDoc);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    contract && getGradesList();
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
          <TableBody>
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
                    <TableCell>
                      <StyledButton
                        onClick={(event) => handleMenuClick(event, gradeDoc)}
                        sx={{ width: 50, height: 50 }}
                      >
                        <LaunchIcon sx={{ color: "white" }} />
                      </StyledButton>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={anchorEl ? true : false}
                        onClose={handleMenuClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem onClick={handleMenuClose}>
                          <HistoryIcon sx={{ marginRight: 1 }} /> History
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                          <ArticleIcon sx={{ marginRight: 1 }} /> View Document
                        </MenuItem>
                        <MenuItem onClick={() => handleOpen()}>
                          <EditIcon sx={{ marginRight: 1 }} /> Update
                        </MenuItem>
                      </Menu>
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
        {documentModalOpen && (
          <DocumentDetail
            open={documentModalOpen}
            handleClose={handleClose}
            grade={selectedGrade}
          />
        )}

        {historyModalOpen && <HistoryModal />}
      </Box>
    </>
  );
};

export default GradeDocuments;
