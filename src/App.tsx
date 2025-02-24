import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import "./index.css";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
