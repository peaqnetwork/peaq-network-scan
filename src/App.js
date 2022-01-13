import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import TopNav from "./components/topnav";
import Blocks from "./routes/blocks";
import Home from "./routes/home";

function App() {
  return (
    <>
      <TopNav />
      <BrowserRouter>
        <Routes>
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
