import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import dkdn from "../assets/dkdn.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      Swal.fire("Thiếu thông tin", "Vui lòng nhập email!", "warning");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:6789/api/v1/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      Swal.fire("Thành công!", res.data, "success");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.response?.data?.message || "Không thể gửi yêu cầu!",
      });
    }
  };

  return (
    <div style={{
            backgroundImage: `url(${dkdn})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>



        <div  style={{ padding: "40px", textAlign: "center", color: "white" }}>
        <h2>Quên mật khẩu</h2>
        </div>
      

      <input
        type="email"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "300px", marginTop: "20px" }}
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Gửi yêu cầu
      </button>
    </div>
  );
}
