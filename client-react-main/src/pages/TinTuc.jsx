import React from "react";
import { Link } from "react-router-dom";
import tt1 from "../assets/tt1.png";
import tt2 from "../assets/tt2.png";
import tt3 from "../assets/tt3.png";
import tt4 from "../assets/tt4.png";
import tt5 from "../assets/tt5.png";
import tt6 from "../assets/tt6.png";
import tt7 from "../assets/tt7.png";
import tt8 from "../assets/tt8.png";

const TinTuc = () => {
  // ⭐ dữ liệu giả của trang 1
  const fakeNews = [
    { id: "chuong-trinh-phim-ki-niem-70-nam", date: "03/10/2024", title: "Chương trình phim kỉ niệm nhân dịp 70 năm Giải phóng Thủ đô", img: tt1 },
    { id: "vui-tet-trung-thu", date: "13/09/2024", title: "VUI TẾT TRUNG THU - RINH QUÀ VI VU", img: tt2 },
    { id: "suat-chieu-dac-biet", date: "09/09/2024", title: 'Chương trình "Suất chiếu đặc biệt"...', img: tt3 },
    { id: "qua-tang-tung-bung", date: "04/09/2024", title: "SUẤT CHIẾU ĐẶC BIỆT - QUÀ TẶNG TƯNG BỪNG", img: tt4 },
    { id: "dot-phim-ky-niem-79-nam", date: "21/08/2024", title: "Đợt phim Kỷ niệm 79 năm...", img: tt5 },
    { id: "tuyen-dung-cong-tac-vien", date: "04/08/2024", title: "Tuyển dụng cộng tác viên...", img: tt6 },
    { id: "hoan-thanh-khao-sat", date: "16/07/2024", title: "THÔNG BÁO HOÀN THÀNH KHẢO SÁT", img: tt7 },
    { id: "review-ke-trom-mat-trang-4", date: "12/07/2024", title: "REVIEW PHIM HOẠT HÌNH HOT", img: tt8 },
  ];

  const [newsData, setNewsData] = useState(fakeNews);
  const [page, setPage] = useState(1);

  const token = localStorage.getItem("token");

  // 🔥 Load trang API (trang 2 trở đi)
  const loadPageFromAPI = async (nextPage) => {
    try {
      const res = await fetch(`http://localhost:6789/api/v1/news`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        alert("Không tải được tin tức!");
        return;
      }

      const data = await res.json();

      // ❗ KHÔNG nối thêm — chỉ hiển thị tin của trang API
      setNewsData(data);
      setPage(nextPage);

    } catch (err) {
      console.log(err);
      alert("Lỗi kết nối server!");
    }
  };

  const handleNext = () => {
    const nextPage = page + 1;

    // ⭐ trang 2 trở lên load API
    loadPageFromAPI(nextPage);
  };

  const handlePrev = () => {
    if (page === 1) return;

    // ⭐ quay lại trang 1 → dùng dữ liệu giả
    setNewsData(fakeNews);
    setPage(1);
  };

  return (
    <div
      style={{
        backgroundColor: "#0f1116",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Montserrat, sans-serif",
        padding: "40px 5vw",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2
        style={{
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: "700",
          marginBottom: "30px",
        }}
      >
        Tin tức
      </h2>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          justifyItems: "center",
          alignItems: "stretch",
        }}
      >
        {newsData.map((item, index) => (
          <Link
            key={index}
            to={`/tin-tuc/${item.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <div
              style={{
                backgroundColor: "#14171c",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #374151",
                transition: "all 0.3s ease",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                minHeight: "340px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0px 6px 16px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  padding: "12px",
                  textAlign: "left",
                  flex: 1,
                }}
              >
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "clamp(12px, 1vw, 14px)",
                    marginBottom: "6px",
                  }}
                >
                  {item.date}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(14px, 1.4vw, 16px)",
                    fontWeight: "700",
                    lineHeight: "1.5",
                    color: "#fff",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "40px" }}>
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #2b3038",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            opacity: page === 1 ? 0.4 : 1,
          }}
        >
          Quay lại
        </button>

        <button
          onClick={handleNext}
          style={{
            backgroundColor: "transparent",
            padding: "8px 18px",
            border: "1px solid #2b3038",
            borderRadius: "6px",
            cursor: "pointer",
            color: "white",
          }}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default TinTuc;
