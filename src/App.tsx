import Footer from "components/Footer";
import BasketPage from "pages/BasketPage";
import MainPage from "pages/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Page404 from "pages/Page404";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
