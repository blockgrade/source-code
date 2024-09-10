import { useContext } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";

import GradeDocuments from "./components/GradeDocuments";
import { FormCard } from "./components/form-card/form-card";
import { theme } from "./common/theme";
import PdfUploader from "./components/ipfs-card/IpfsCard";
import GradeContext from "./context/grade.context";

function App() {
  const { account } = useContext(GradeContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <PdfUploader />
        Connected account: {account}
        <div className="article" style={{ display: "flex", gap: "1rem" }}>
          <FormCard />
          <GradeDocuments></GradeDocuments>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
