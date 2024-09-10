import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./contractJson/GradeRegistry.json";
import "./App.css";
import { ThemeProvider } from "@mui/material";

import GradeDocuments from "./components/GradeDocuments";
import { FormCard } from "./components/form-card/form-card";
import { theme } from "./common/theme";
import PdfUploader from "./components/ipfs-card/IpfsCard";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x51a19a83b78dfDa55F05900a23D3f90fc81242C5";
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
    template();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PdfUploader />
        Connected account: {account}
        <div className="article" style={{ display: "flex", gap: "1rem" }}>
          <FormCard state={state} />
          <GradeDocuments state={state}></GradeDocuments>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
