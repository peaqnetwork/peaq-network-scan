import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import TopNav from "./components/topnav";
import Blocks from "./routes/blocks";
import Home from "./routes/home";
import NotFound from "./components/not-found";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <TopNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blocks" element={<Blocks />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Provider>
  );
}

export default App;
