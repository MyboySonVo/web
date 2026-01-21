import React, { useState } from "react";
import phim1 from "../assets/phim1.png"
import phim2 from "../assets/phim2.png"
import phim3 from "../assets/phim3.png"
import phim4 from "../assets/phim4.png"
import phim5 from "../assets/phim5.png"
import phim6 from "../assets/phim6.png"
import phim7 from "../assets/phim7.png"
import phim8 from "../assets/phim8.png"
import phim9 from "../assets/phim9.png"
import phim10 from "../assets/phim10.png"
import phim11 from "../assets/phim11.png"
import phim12 from "../assets/phim12.png"
import phim13 from "../assets/phim13.png"
import phim14 from "../assets/phim14.png"
import phim15 from "../assets/phim15.png"

function LichChieu() {
  const [selectedDate, setSelectedDate] = useState("12-11-2024");

  const dates = ["12-11-2024", "13-11-2024", "14-11-2024", "15-11-2024"];

  const movies = [
    {
      title: "AI OÁN TRONG VƯỜN XUÂN - T18",
      genre: "Kinh dị",
      duration: "91 phút",
      country: "Hàn Quốc",
      release: "08/11/2024",
      rating:"T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim1 ,
      type: "2D",
      times: ["18:15", "19:55", "23:25"],
    },

    {
      title: "MẬT MÃ ĐỎ-K - PHỤ ĐỀ",
      genre: "Hành động",
      duration: "120 phút",
      country: "Mỹ",
      release: "08/11/2024",
      rating:"K - Phim được phổ biến đến người xem dưới 13 tuổi có người bảo hộ đi kèm",
      image: phim2,
      type: "2D",
      times: ["18:25", "20:00", "20:35", "21:30", "22:10", "23:15"],
    },

    {
      title: "ĐÔI BẠN HỌC YÊU-T18",
      genre: "Tâm lý, tình cảm",
      duration: "115 phút",
      country: "Hàn Quốc",
      release: "08/11/2024",
      rating:
        "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim3,
      type: "2D",
      times: ["18:15", "19:45", "20:30", "21:50", "22:20", "23:20"],
    },

    {
      title: "HỌC VIỆN ANH HÙNG: YOU’RE NEXT-K",
      genre: "",
      duration: "108 phút",
      country: "Nhật Bản",
      release: "08/11/2024",
      rating: "K - Phim được phổ biến đến người xem dưới 13 tuổi và có người bảo hộ đi kèm",
      image: phim4,
      type: "2D",
      times: ["20:20"],
    },

    {
      title: "ĐỪNG BUÔNG TAY-T18",
      genre: "Kinh dị",
      duration: "101 phút",
      country: "Mỹ",
      release: "08/11/2024",
      rating: "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim5,
      type: "2D",
      times: ["16:25"],
    },

    {
      title: "TIẾNG GỌI CỦA OÁN HỒN-T18",
      genre: "Kinh dị",
      duration: "100 phút",
      country: "Nhật bản",
      release: "01/11/2024",
      rating: "P - Phim được phổ biến rộng rãi đến mọi đối tượng",
      image: phim6,
      type: "2D",
      times: ["22:45"],
    },

    {
      title: "VÙNG ĐẤT BỊ NGUYỀN RỦA-T18",
      genre: "Kinh dị",
      duration: "117 phút",
      country: "Thái Lan",
      release: "01/11/2024",
      rating: "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim7,
      type: "2D",
      times: ["21:25","23:30"],
    },

    {
      title: "THẦN DƯỢC-T18",
      genre: "Kinh dị",
      duration: "139 phút",
      country: "Mỹ",
      release: "01/11/2024",
      rating: "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim8,
      type: "2D",
      times: ["17:55","22:10"],
    },

    {
      title: "VÂY HÃM TẠI ĐÀI BẮC-T18",
      genre: "",
      duration: "100 phút",
      country: "Mỹ",
      release: "01/11/2024",
      rating: "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim9,
      type: "2D",
      times: ["21:35"],
    },

    {
      title: "NGÀY XƯA CÓ MỘT CHUYỆN TÌNH - T16",
      genre: "Tâm lý, tình cảm",
      duration: "135 phút",
      country: "Viet Nam",
      release: "28/10/2024",
      rating: "T16 - Phim được phổ biến đến người xem từ đủ 16 tuổi trở lên (16+)",
      image: phim10,
      type: "2D",
      times: ["17:35", "18:35", "20:20","21:00","22:20"],
    },

    {
      title: "VENOM: THE LAST DANCE-T13",
      genre: "Khoa học viễn tưởng",
      duration: "100 phút",
      country: "Mỹ",
      release: "25/10/2024",
      rating: "T13: Phim được phổ biến đến khán giả từ đủ 13 tuổi trở lên;",
      image: phim11,
      type: "2D",
      times: ["17:00", "18:00", "19:00","20:00","21:00","22:55"],
    },

    {
      title: "ELLI VÀ BÍ ẨN CHIẾC TÀU MA-K - Lồng tiếng",
      genre: "Hoạt hình",
      duration: "86 phút",
      country: "Đức",
      release: "25/10/2024",
      rating: "Phim được phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám…",
      image: phim12,
      type: "2D",
      times: ["18:15"],
    },

    {
      title: "CÔ DÂU HÀO MÔN- T18",
      genre: "Tâm lý, tình cảm",
      duration: "114 phút",
      country: "Viet Nam",
      release: "18/10/2024",
      rating: "T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)",
      image: phim13,
      type: "2D",
      times: ["18:20", "20:25", "22:30"],
    },

    {
      title: "ROBOT HOANG DÃ-P - Lồng tiếng",
      genre: "Khoa học viễn tưởng",
      duration: "95 phút",
      country: "Mỹ",
      release: "11/10/2024",
      rating: "P: Phim được phổ biến đến khán giả ở mọi độ tuổi;",
      image: phim14,
      type: "2D",
      times: ["20:25"],
    },

    {
      title: "CẬU BÉ CÁ HEO-P - Lồng tiếng",
      genre: "Hoạt hình",
      duration: "85 phút",
      country: "Mỹ",
      release: "27/09/2023",
      rating: "P: Phim được phổ biến đến khán giả ở mọi độ tuổi",
      image: phim15,
      type: "2D",
      times: ["19:50"],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "150px",
        fontFamily: "'Montserrat', sans-serif",
        marginBottom:"0px",
        
      }}
    >
      {/* --- Tiêu đề --- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "white",
          fontSize: "20px",
          fontWeight: 700,
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: "#EF4444",
          }}
        ></span>
        <span>Phim đang chiếu</span>
      </div>

      {/* --- Chọn ngày --- */}
      <div style={{ display: "flex", gap: "12px" }}>
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border:
                selectedDate === date
                  ? "none"
                  : "1px solid rgba(255,255,255,0.2)",
              background:
                selectedDate === date
                  ? "linear-gradient(90deg, #EF4444, #DC2626)"
                  : "transparent",
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {date}
          </button>
        ))}
      </div>

      {/* --- Ghi chú --- */}
      <p
        style={{
          color: "#F97316",
          fontSize: "14px",
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      {/* --- Danh sách phim --- */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          marginTop: "40px",
          width: "90%",
          maxWidth: "1250px",
          lineHeight:"20px",
          letterSpacing:"0%"
           

        }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
              style={{
              display: "flex",
              backgroundColor: "#111827",
              borderRadius: "12px",
              padding: "1px",
              color: "white",
              gap: "16px",
              alignItems: "flex-start",
              position: "relative",
              border: "1px solid #374151",
              
              
            }}
          >
            {/* Ô 2D */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "6px",
                padding: "8px 9px 5px 9px",
                fontSize: "16px",
                fontWeight: "400",
                color: "white",
                opacity: 0.9,

              }}
            >
              {movie.type}
            </div>

            <img
              src={movie.image}
              alt={movie.title}
              style={{
                width: "220px",
                height: "308px",
                objectFit: "cover",
                borderRadius: "8px",
                borderTop:"12px",
                borderBottom:"12px"
                
                
              }}
            />

            <div style={{ flex: 1 }}>
              <p style={{ color: "#9CA3AF", fontSize: "13px" }}>
                {movie.genre}  &nbsp;&nbsp;&nbsp;&nbsp; {movie.duration}
              </p>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  margin: "6px 0",
                  
                  
                }}
              >
                {movie.title}
              </h3>
              <p style={{ fontSize: "14px", opacity: 0.9 ,fontWeight:"400"   }}>
                Xuất xứ: {movie.country}
              </p>
              <p style={{ fontSize: "14px", opacity: 0.9,fontWeight:"400" }}>
                Khởi chiếu: {movie.release}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#EF4444",
                  marginTop: "4px",
                }}
              >
                {movie.rating}
              </p>

              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                Lịch chiếu
              </h4>

              <div
                style={{
                  marginTop: "6px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {movie.times.map((t) => (
                  <button
                    key={t}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "1px solid #FFFFFF",
                      background: "transparent",
                      color: "white",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "rgba(239,68,68,0.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "transparent")
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LichChieu;
