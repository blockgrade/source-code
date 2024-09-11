import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Table,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import GradeContext from "../../context/grade.context";
import { ethers } from "ethers";
import { StyledButton } from "../styled-components/styled-button/styled-button";

const style = {
  position: "relative",
  width: "70%",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#d3c8bb",
  maxHeight: "500px",
};

export const HistoryModal = ({ open, handleClose }) => {
  const { gradeHistory } = useContext(GradeContext);

  const handleViewDocument = (document) => {
    const url = `https://gold-far-raven-8.mypinata.cloud/ipfs/${document}`;
    window.open(url, "_blank");
  };

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
          <IconButton
            onClick={handleClose}
            sx={{
              backgroundColor: "transparent",
              alignSelf: "flex-end",
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon sx={{ color: "red" }} />
          </IconButton>
          <Typography
            variant="h3"
            align="center"
            sx={{ color: "black", marginBottom: 4 }}
          >
            Document history
          </Typography>
          <TableContainer sx={{ marginBottom: 5 }}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "#1f222e",
                  borderBottomColor: "#1f222e",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
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
              <TableBody sx={{ overflowY: "scroll" }}>
                {gradeHistory &&
                  gradeHistory.map((grade, index) => {
                    const gradeNumber =
                      ethers.formatUnits(grade.grade, 0) / 100;
                    const timestamp = new Date(
                      Number(grade.timestamp) * 1000
                    ).toLocaleString();

                    return (
                      <TableRow
                        key={index}
                        sx={{
                          color: "#1F222E51",
                        }}
                      >
                        <TableCell>
                          <MenuItem
                            onClick={() => handleViewDocument(grade.document)}
                          >
                            <StyledButton>
                              <ArticleIcon sx={{ marginRight: 1 }} /> View
                              Document
                            </StyledButton>
                          </MenuItem>
                        </TableCell>
                        <TableCell>{grade.student}</TableCell>
                        <TableCell>{grade.discipline}</TableCell>
                        <TableCell>{gradeNumber}</TableCell>
                        <TableCell>{timestamp}</TableCell>
                        <TableCell>{grade.document}</TableCell>
                        <TableCell>{grade.from}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};
