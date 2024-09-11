import { useContext } from "react";
import "./App.css";
import { ThemeProvider } from "@mui/material";

import GradeDocuments from "./components/GradeDocuments";
import { FormCard } from "./components/form-card/form-card.component";
import { theme } from "./common/theme";
import GradeContext from "./context/grade.context";

function App() {
  const { account } = useContext(GradeContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
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


/*
TODO
- retirar botão preto do form-card e incluir ipfs ANTES de registrar na blockchain
- incluir hiperlink do ipfs no botão de download de cada tupla da tablea
- incluir botão de upload do ipfs no modal de editar

*/
