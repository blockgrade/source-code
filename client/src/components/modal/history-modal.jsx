import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";

export const HistoryModal = ({ open, handleClose }) => {
  const [history, setHistory] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose}></Modal>
    </div>
  );
};
