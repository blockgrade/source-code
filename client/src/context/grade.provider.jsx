import React, { useEffect, useState } from "react";
import GradeContext from "./grade.context";
import { ethers } from "ethers";
import abi from "../contractJson/GradeRegistry.json";

export const GradeProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");
  const [gradeDocument, setGradeDocument] = useState([]);
  const [gradeHistory, setGradeHistory] = useState();

  const connectToContract = async () => {
    const contractAddress = "0x080409b66603fDd783EacECE5DdA5691f799f919";
    const contractABI = abi.abi;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Ethereum object not found, install Metamask.");
        return;
      }

      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(account[0]);

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setState({ provider, signer, contract });
    } catch (error) {
      if (error.message.includes("User denied transaction")) {
        alert("Transaction was denied by the user.");
      } else {
        console.error("App :: useEffect() :: Error:", error);
        alert("An unexpected error occurred. Please check your connection.");
      }
    }
  };

  const getGradesList = async () => {
    const grades = await state.contract.getGrades();
    setGradeDocument(grades);
  };

  const getGradeHistory = async (gradeId) => {
    const gradeHistory = await state.contract.getGradeHistory(gradeId);
    setGradeHistory(gradeHistory);
  };

  useEffect(() => {
    connectToContract();
  }, []);

  return (
    <GradeContext.Provider
      value={{
        state,
        account,
        gradeDocument,
        getGradesList,
        getGradeHistory,
        gradeHistory,
        contract: state.contract,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
