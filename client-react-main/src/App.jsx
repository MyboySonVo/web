import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import VerifyEmail from "./pages/VerifyEmail";

// Layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Banner from "./layouts/Banner";
import Tablist from "./layouts/Tablist";
import Time from "./layouts/Time";
import Logo from "./layouts/Logo";

// Pages
import ChooseTicket from "./pages/ChooseTicket";
import LichChieu from "./pages/LichChieu";
import TinTuc from "./pages/TinTuc";
import TinTucChiTiet from "./pages/TinTucChiTiet";
import DangKy from "./pages/DangKy";
import DangNhap from "./pages/DangNhap";
import Info from "./pages/Info";
import Home from "./pages/Home"; 
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import PromotionPage from "./pages/PromotionPage";
import PricingPage from "./pages/PricingPage";
import FestivalPage from './pages/FestivalPage';

// 👇 Thêm 2 trang mới
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin
import AdminPage from "./pages/Admin/AdminPage";

const HomePage = () => <Home />;

function LayoutWrapper() {
  const location = useLocation();
  const isAuthPage =  location.pathname === "/dangnhap" ||
                      location.pathname === "/dangky" ||
                      location.pathname === "/forgot-password" ||
                      location.pathname === "/reset-password" ;
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Nếu là trang đăng nhập / đăng ký → chỉ hiện Logo */}
      {isAuthPage ? <Logo /> : !isAdminPage && <Header />}

      <Routes>
        {/* Trang người dùng */}
        <Route path="/" element={<HomePage />} /> 
        <Route
          path="/banner"
          element={
            <>
              <Banner />
              <Tablist />
              <Time />
              <ChooseTicket />
            </>
          }
        />
        <Route path="/lich-chieu" element={<LichChieu />} />
        <Route path="/tin-tuc" element={<TinTuc />} />
        <Route path="/tin-tuc/:id" element={<TinTucChiTiet />} />
        <Route path="/dangnhap" element={<DangNhap />} />
        <Route path="/dangky" element={<DangKy />} />
        <Route path="/thongtin" element={<Info />} />
        <Route path="/gia-ve" element={<PricingPage />} /> 
        <Route path="/payment-success" element={<Success />} /> 
        <Route path="/khuyen-mai" element={<PromotionPage />} />         
        <Route path="/payment" element={<Payment />} />
        <Route path="/lien-hoan-phim" element={<FestivalPage />} />

        <Route path="/verify" element={<VerifyEmail />} />

        {/* 🔥 THÊM 2 ROUTE QUÊN MẬT KHẨU */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      {/* Footer chỉ hiển thị ở trang user */}
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
