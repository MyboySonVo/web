import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Đường dẫn ảnh logo

export default function Logo() {
  const navigate = useNavigate();

  const styles = {
    container: {
      position: "absolute",   // 🔹 Đặt logo chồng lên nền
      top: "20px",
      left: "40px",
      zIndex: 10,             // 🔹 Giúp logo nằm trên form và nền
      cursor: "pointer",
    },
    logo: {
      height: "60px",
      width: "auto",
      transition: "transform 0.2s ease-in-out",
    },
  };

  return (
    <div
      style={styles.container}
      onClick={() => navigate("/")} // Click vào logo để quay lại trang chủ
    >
      <img
        src={logo}
        alt="Logo"
        style={styles.logo}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
    </div>
  );
}
