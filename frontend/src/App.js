
import Header from "./common/header/Header";

import AppRoutes from "./common/routes/AppRoutes";

import { BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
