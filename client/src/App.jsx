import { useContext } from "react";
import "./App.css";
import { Chip, ThemeProvider } from "@mui/material";

import GradeDocuments from "./components/GradeDocuments";
import { FormCard } from "./components/form-card/form-card.component";
import { theme } from "./common/theme";
import GradeContext from "./context/grade.context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function App() {
  const { account } = useContext(GradeContext);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Chip
          sx={{
            backgroundColor: "#d3c8bb",
            marginBottom: 2,
            alignSelf: "flex-end",
          }}
          avatar={<AccountCircleIcon />}
          label={`${account}`}
        />
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
- retirar botão preto do form-card e incluir ipfs ANTES de registrar na blockchain X
- incluir hiperlink do ipfs no botão de download de cada tupla da tablea X
- incluir botão de upload do ipfs no modal de editar

*/
