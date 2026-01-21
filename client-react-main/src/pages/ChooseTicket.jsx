import React, { useState } from "react";
import ticket from "../assets/ticket.png";
import { useNavigate } from "react-router-dom";

function ChooseTicket() {
  const navigate = useNavigate();

  // Các hàng ghế
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
  const cols = Array.from({ length: 15 }, (_, i) => i + 1);

  // Ghế VIP
  const vipSeats = [];
  ["D", "E", "F", "G", "H", "I", "J"].forEach((r) => {
    for (let i = 3; i <= 12; i++) vipSeats.push(`${r}${i}`);
  });

  // ✅ State
  const [bookedSeats, setBookedSeats] = useState(["B5", "C7", "E10"]); // demo ghế đã đặt
  const [selectedSeats, setSelectedSeats] = useState([]); // ghế người dùng chọn

  // ✅ Chọn/bỏ chọn ghế
  const toggleSeat = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // không chọn ghế đã đặt
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  // ✅ Tính tổng tiền
  const totalPrice = selectedSeats.reduce((total, seat) => {
    if (vipSeats.includes(seat)) return total + 90000;
    return total + 70000;
  }, 0);

  // ✅ Thanh toán giả lập
  const handlePayment = () => {
    if (selectedSeats.length === 0) {
      alert("⚠️ Vui lòng chọn ít nhất 1 ghế!");
      return;
    }

    alert(
      `✅ Bạn đã đặt ${selectedSeats.join(", ")}\nTổng tiền: ${totalPrice.toLocaleString(
        "vi-VN"
      )}đ`
    );

    // Cập nhật danh sách ghế đã đặt
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);

    // Chuyển hướng demo
    navigate("/payment",{
      state: {
        movieData:{

          selectedSeats,
          totalPrice,
        },
      },

    },
      
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#0e1117",
        color: "white",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <main style={{ flex: 1, paddingBottom: "40px" }}>
        {/* --- Ảnh vé --- */}
        <div
          style={{
            width: "898px",
            height: "110px",
            margin: "50px auto 0",
          }}
        >
          <img src={ticket} alt="movie" style={{ width: "100%" }} />
        </div>

        {/* --- Giờ chiếu và thời gian --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "900px",
            margin: "20px auto",
            position: "relative",
            bottom: "200px",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "16px" }}>Giờ chiếu: 18:00</div>
          <div
            style={{
              border: "1px solid #EF4444",
              borderRadius: "12px",
              padding: "8px 20px",
            }}
          >
            Thời gian chọn ghế: 10:00
          </div>
        </div>

        {/* --- Phòng chiếu --- */}
        <div
          style={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "20px",
            marginTop: "40px",
          }}
        >
          Phòng chiếu số 2
        </div>

        {/* --- Sơ đồ ghế --- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
            width: "100%",
            overflowX: "auto",
            padding: "0 10px",
            boxSizing: "border-box",
          }}
        >
          {rows.map((row) => (
            <div
              key={row}
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {cols.map((col) => {
                const seatId = `${row}${col}`;
                const isVIP = vipSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                let bgColor = "#2E2E2E";
                if (isVIP) bgColor = "#F97316";
                if (isSelected) bgColor = "#2563EB";
                if (isBooked) bgColor = "#1F2937";

                return (
                  <div
                    key={seatId}
                    onClick={() => toggleSeat(seatId)}
                    style={{
                      width: "clamp(24px, 5vw, 35px)",
                      height: "clamp(24px, 5vw, 35px)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: bgColor,
                      color: "#fff",
                      cursor: isBooked ? "not-allowed" : "pointer",
                      fontSize: "clamp(10px, 2vw, 13px)",
                      fontWeight: 500,
                      transition: "transform 0.1s ease",
                    }}
                  >
                    {isBooked ? "X" : seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* --- Ghi chú màu --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            fontSize: "14px",
            marginTop: "60px",
            flexWrap: "wrap",
          }}
        >
          {[
            { color: "#1F2937", text: "Đã đặt", label: "X" },
            { color: "#2563EB", text: "Ghế bạn chọn" },
            { color: "#2E2E2E", text: "Ghế thường" },
            { color: "#F97316", text: "Ghế VIP" },
            { color: "#DC2626", text: "Ghế đôi" },
          ].map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: item.color,
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.label || ""}
              </div>
              {item.text}
            </div>
          ))}
        </div>

        {/* --- Tổng tiền & Ghế --- */}
        <div
          style={{
            marginTop: "40px",
            textAlign: "left",
            fontSize: "16px",
            lineHeight: "1.6",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            width: "100%",
            maxWidth: "1200px",
            margin: "40px auto 0",
            fontFamily: "'Montserrat', sans-serif",
            color: "#e0e0e0",
            padding: "0 16px",
            boxSizing: "border-box",
            position: "relative",
            left: "100px",
          }}
        >
          <p>
            Ghế đã chọn:{" "}
            <span style={{ fontWeight: "700" }}>
              {selectedSeats.length > 0 ? selectedSeats.join(", ") : ""}
            </span>
          </p>
          <p>
            Tổng tiền:{" "}
            <span style={{ fontWeight: "800", color: "#ffffff" }}>
              {totalPrice.toLocaleString("vi-VN")}đ
            </span>
          </p>
        </div>

        {/* --- Nút --- */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
            margin: "40px auto 0",
            width: "100%",
            maxWidth: "1200px",
            padding: "0 20px",
            right: "180px",
            position: "relative",
            bottom: "90px",
          }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              flex: "1 1 120px",
              maxWidth: "150px",
              height: "40px",
              backgroundColor: "#0f0f0f",
              border: "1px solid white",
              borderRadius: "9999px",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Quay lại
          </button>

          <button
            onClick={handlePayment}
            style={{
              flex: "1 1 140px",
              maxWidth: "160px",
              height: "40px",
              background: "linear-gradient(90deg, #EF4444, #F87171)",
              border: "none",
              borderRadius: "9999px",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Thanh toán
          </button>
        </div>
      </main>
    </div>
  );
}

export default ChooseTicket;
