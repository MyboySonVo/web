import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dkdn from "../assets/dkdn.jpg";

export default function DangNhap() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Thiếu thông tin",
        text: "Vui lòng nhập đầy đủ email và mật khẩu!",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:6789/api/v1/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = res.data?.data || {};

      if (token) {
        localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));

        // ✅ Hiển thị 2 nút: OK và Đăng xuất
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          text: `Xin chào, ${user.fullName || user.email}`,
          showCancelButton: true,
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Đăng xuất",
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#d33",
          
        }).then((result) => {
          if (result.isConfirmed) {
            // Nhấn OK → chuyển về trang chủ
            navigate("/");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Nhấn Đăng xuất → xóa token + user
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            Swal.fire({
              icon: "info",
              title: "Đã đăng xuất",
              text: "Bạn có thể đăng nhập bằng tài khoản khác!",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi máy chủ",
          text: "Không nhận được token từ server!",
        });
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message?.toLowerCase() || "";

        if (status === 401) {
          Swal.fire({
            icon: "error",
            title: "Sai thông tin",
            text: "Sai email hoặc mật khẩu!",
          });
        } else if (status === 403 || message.includes("unverified")) {
          Swal.fire({
            icon: "info",
            title: "Tài khoản chưa xác thực",
            text: "Vui lòng kiểm tra email để xác thực tài khoản!",
          });
        } else if (status === 404 || message.includes("chưa được đăng ký")) {
          Swal.fire({
            icon: "warning",
            title: "Tài khoản chưa được đăng ký",
            text: "Email này chưa được đăng ký. Vui lòng tạo tài khoản mới!",
            showCancelButton: true,
            confirmButtonText: "Đăng ký ngay",
            cancelButtonText: "Đóng",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/dangky");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi đăng nhập",
            text: "Có lỗi xảy ra, vui lòng thử lại!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Mất kết nối",
          text: "Không thể kết nối tới server!",
        });
      }
    }
  };

    return (
    <div
      style={{
        backgroundImage: `url(${dkdn})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
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
        <h2 style={{ marginBottom: "20px" }}>Đăng nhập</h2>
        <form onSubmit={handleSubmit}>
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
          <p
          onClick={() => navigate("/forgot-password")}
          style={{
            textAlign: "right",
            margin: "5px 5px 15px 0",
            cursor: "pointer",
            color: "#007bff",
            fontSize: "14px"
          }}
        >
          Quên mật khẩu?
        </p>
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
            Đăng nhập
          </button>
        </form>
        <p style={{ marginTop: "15px" }}>
          Chưa có tài khoản?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/dangky")}
          >
            Đăng ký
          </span>
        </p>
        
      </div>
    </div>
  );
}
