import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import dkdn from "../assets/dkdn.jpg";

export default function DangKy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:6789/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Đăng ký thành công
        Swal.fire({
          title: "Đăng ký thành công!",
          text: "Vui lòng kiểm tra email để xác thực tài khoản.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#e81b1b",
        }).then(() => {
          navigate("/dangnhap");
        });
      } 
      // ⚠️ Nếu email đã tồn tại
      else if (
        res.status === 400 ||
        res.status === 409 ||
        (data.message && data.message.toLowerCase().includes("email"))
      ) {
        Swal.fire({
          title: "Email đã được sử dụng!",
          text: "Vui lòng dùng email khác để đăng ký.",
          icon: "warning",
          confirmButtonText: "OK",
          confirmButtonColor: "#e81b1b",
        });
      } 
      // ❌ Các lỗi khác
      else {
        Swal.fire({
          title: "Đăng ký thất bại!",
          text: data.message || "Có lỗi xảy ra, vui lòng thử lại.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#e81b1b",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Lỗi kết nối server!",
        text: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#e81b1b",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${dkdn})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          textAlign: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="Họ"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{
              width: "95%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            name="lastName"
            type="text"
            placeholder="Tên"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{
              width: "95%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "95%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "95%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#e81b1bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Đăng ký
          </button>
        </form>
        <p style={{ marginTop: "15px" }}>
          Đã có tài khoản?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/dangnhap")}
          >
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
