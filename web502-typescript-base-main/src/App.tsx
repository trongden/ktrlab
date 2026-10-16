import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        {/* Trang đăng ký: công khai */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Trang đăng nhập: công khai */}
        <Route path="/login" element={<LoginPage />} />

        {/* Chỉ bảo vệ trang /add, /edit/:id */}
        <Route element={<PrivateRoute />}>
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;