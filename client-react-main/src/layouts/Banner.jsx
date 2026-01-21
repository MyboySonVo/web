import React from "react";
import bannerBg from "../assets/Banner.png";
import a1 from "../assets/a1.png";


function Banner() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "473px",
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "'Montserrat', sans-serif",
        padding: "40px 20px",
        position:"relative",
        bottom:"9px",
        right:"8px",
        
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "40px",
          width: "100%",
          maxWidth: "1200px", // ✅ Giới hạn responsive
          margin: "0 auto",
        }}
      >
        {/* Poster */}
        <img
          src={a1}
          alt="Poster"
          style={{
            width: "238px",
            height: "333px",
            borderRadius: "12px",
            objectFit: "cover",
            position:"relative",
            top:"30px"
          }}
        />

        {/* Nội dung bên phải */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
            minWidth: "280px",
            maxWidth: "600px",
            position:"relative",
            top:"45px"
          }}
        >
          {/* Tiêu đề + 2D */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "32px",
              }}
            >
              CƯỜI XUYÊN BIÊN GIỚI - T13
            </div>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                border: "1px solid #ffffff",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              2D
            </div>
          </div>

          {/* Thông tin phụ */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              fontSize: "14px",
            }}
          >
            <span>Hài</span>
            <span>Hàn Quốc</span>
            <span>113 phút</span>
            <span>Đạo diễn: KIM Chang-ju</span>
          </div>

          {/* Diễn viên */}
          <div style={{ fontSize: "14px", lineHeight: "20px", marginTop: "8px", position:"relative", bottom:"10px" }}>
            <p>
              Diễn viên: Ryu Seung-ryong, Jin Sun-kyu, Igor Rafael PEDROSO, Luan
              BRUM DE ABREU E LIMA, JB João Batista GOMES DE OLIVEIRA, Yeom
              Hye-ran và Go Kyoung-pyo, Lee Soon-won
            </p>
            <p>Khởi chiếu: 15/11/2024</p>
          </div>

          {/* Nội dung phim */}
          <div style={{ fontSize: "14px", lineHeight: "20px", marginTop: "4px",position:"relative", bottom:"1px" }}>
            Cười Xuyên Biên Giới kể về hành trình của Jin-bong (Ryu Seung-ryong) - 
            cựu vô địch bắn cung quốc gia. Sau khi nghỉ hưu, anh trở thành một 
            nhân viên văn phòng bình thường. Đứng trước nguy cơ bị sa thải, 
            Jin-bong phải nhận một nhiệm vụ bất khả thi là bay đến nửa kia của 
            trái đất trong nỗ lực tuyệt vọng để sinh tồn.
          </div>

          {/* Kiểm duyệt */}
          <div
            style={{
              color: "#ff4d4d",
              fontSize: "14px",
              marginTop: "6px",
              fontWeight: "500",
              position:"relative",
              top:"5px"
            }}
          >
            Kiểm duyệt: T13 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 13 TUỔI TRỞ
            LÊN (13+)
          </div>

          {/* Nút */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "16px",
              alignItems: "center",
              position:"relative",
              bottom:"1px"
            }}
          >
            <button
              style={{
                color: "white",
                background: "none",
                border: "none",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "14px",
                cursor:"pointer"
              }}

              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              Chi tiết nội dung
            </button>
            <button
              style={{
                color: "#EAB308",
                backgroundColor: "transparent",
                border: "1px solid #EAB308",
                borderRadius: "9999px",
                padding: "10px 40px",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#EAB308";
                e.target.style.color = "black";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#EAB308";
              }}
            >
              Xem trailer
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
