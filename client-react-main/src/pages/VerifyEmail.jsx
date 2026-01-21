import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [message, setMessage] = useState("⏳ Đang xác thực...");
  const [status, setStatus] = useState("loading");
  const [countdown, setCountdown] = useState(3);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("❌ Thiếu token xác thực.");
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(`http://localhost:6789/api/v1/auth/verify?token=${token}`);
        const data = await res.text();

        if (res.ok) {
          setMessage("✅ Xác thực thành công!");
          setStatus("success");
          launchFireworks(); // 🎆 hiệu ứng pháo hoa

          let timeLeft = 3;
          const timer = setInterval(() => {
            setCountdown(timeLeft);
            timeLeft -= 1;
            if (timeLeft < 0) {
              clearInterval(timer);
              navigate("/dangnhap");
            }
          }, 1000);
        } else {
          setMessage("❌ Xác thực thất bại hoặc token không hợp lệ.");
          setStatus("error");
        }
      } catch (err) {
        setMessage("⚠️ Lỗi kết nối máy chủ!");
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, navigate]);

  // 🎇 Hiệu ứng pháo hoa (Confetti)
  const launchFireworks = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 35,
      spread: 360,
      ticks: 70,
      zIndex: 9999,
      colors: ["#ff4d4d", "#ffcc00", "#00ffcc", "#66ff66", "#0099ff", "#cc66ff"],
    };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
      });
    }, 200);
  };

  return (
    <div className={`verify-container ${status}`}>
      <div className="verify-card">
        <div
          className={`verify-icon ${
            status === "success"
              ? "success"
              : status === "error"
              ? "error"
              : "loading"
          }`}
        >
          {status === "success" ? "🎉" : status === "error" ? "⚠️" : "⏳"}
        </div>

        <h2 className="verify-title">{message}</h2>

        {status === "success" && (
          <p className="verify-sub">
            Tự động chuyển hướng sau{" "}
            <span className="count">{countdown}</span> giây...
          </p>
        )}

        {status === "loading" && <p className="verify-sub">Vui lòng đợi...</p>}

        {status === "error" && (
          <button className="verify-btn" onClick={() => navigate("/dangnhap")}>
            🔙 Quay lại đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
