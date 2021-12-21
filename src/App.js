import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import TopNav from "./components/topnav";
import Home from "./routes/home";

function App() {
  return (
    <>
      <TopNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
