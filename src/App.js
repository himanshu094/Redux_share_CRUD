import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import CompanyStockInterface from "./component/CompanyStockInterface";
import DisplayAll from "./component/DisplayAll";


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route element={<CompanyStockInterface/>} path={"/"} />
          <Route element={<DisplayAll/>} path={"/displayall"} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
