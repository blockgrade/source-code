import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./contractJson/GradeRegistry.json";
import "./App.css";
import { ThemeProvider } from "@mui/material";

import Register from "./components/Register";
import GradeDocuments from "./components/GradeDocuments";
import { FormCard } from "./components/form-card/form-card";
import { theme } from "./common/theme";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0xe85dA9b277C6b4cf6fe005A7535ea7122C889C9D";
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
        Connected account: {account}
        <div className="article">
          <FormCard />
          <GradeDocuments state={state}></GradeDocuments>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
