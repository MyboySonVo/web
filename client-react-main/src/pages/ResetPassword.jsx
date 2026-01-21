// src/pages/ResetPassword.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { resetPassword } from "../services/apiService";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (!token) {
      Swal.fire("Lỗi", "Token không hợp lệ!", "error");
      navigate("/dangnhap");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      Swal.fire("Lỗi", "Vui lòng nhập đầy đủ!", "error");
      return;
    }
    if (password !== confirm) {
      Swal.fire("Lỗi", "Mật khẩu không khớp!", "error");
      return;
    }

    try {
      await resetPassword({
        token: token,
        newPassword: password,
      });

      Swal.fire("Thành công", "Mật khẩu đã được đặt lại.", "success").then(() => {
        navigate("/dangnhap");
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      Swal.fire("Lỗi", msg, "error");
    }
  };

  return (
    <div style={{ width: 400, margin: "80px auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Đặt lại mật khẩu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu mới"
          style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc" }}
          required
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Xác nhận mật khẩu"
          style={{ width: "100%", padding: 10, marginBottom: 12, borderRadius: 6, border: "1px solid #ccc" }}
          required
        />
        <button
          type="submit"
          style={{ width: "100%", padding: 10, background: "#28a745", color: "#fff", border: "none", borderRadius: 6 }}
        >
          Xác nhận đặt lại
        </button>
      </form>
    </div>
  );
}
