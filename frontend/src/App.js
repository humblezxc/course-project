import Header from "./common/header/Header";

import { BrowserRouter} from "react-router-dom";
import AppRoutes from "./common/routes/AppRoutes";

function App() {
  return (
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
