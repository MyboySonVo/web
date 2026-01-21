import React from "react";
import fb from "../assets/fb.png";
import yt from "../assets/yt.png";
import zalo from "../assets/zalo.png";
import chlplay from "../assets/chplay.png";
import appstort from "../assets/appstort.png";
import thongbao from "../assets/thongbao.png";

function Footer() {
  const Quest = [
    { foter: "Chính sách", link: "/chinh-sach" },
    { foter: "Lịch chiếu", link: "/lich-chieu" },
    { foter: "Tin tức", link: "/tin-tuc" },
    { foter: "Giá vé", link: "/gia-ve" },
    { foter: "Hỏi đáp", link: "/hoi-dap" },
    { foter: "Liên hệ", link: "/lien-he" },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0B0D13",
      color: "white",
      padding: "60px 10px 30px 10px",
      fontFamily: "'Montserrat', sans-serif",
      width: "100%",
      height: "auto",
      marginTop: "100px",
    },
    linkRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      marginBottom: "40px",
      flexWrap: "wrap",
    },
    link: {
      color: "#e0e0e0",
      textDecoration: "none",
      fontSize: "16px",
      fontWeight: "400",
      transition: "transform 0.2s ease, color 0.2s ease",
    },
    linkHover: {
      transform: "translateY(-5px)",
      color: "#EF4444",
    },
    iconRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "60px",
      marginBottom: "40px",
    },
    group: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
    },
    icon: {
      height: "30px",
      width: "30px",
      cursor: "pointer",
      transition: "transform 0.2s ease, opacity 0.2s ease",
    },
    icon1: {
      height: "42px",
      width: "140px",
      cursor: "pointer",
      transition: "transform 0.2s ease, opacity 0.2s ease",
    },
    icon2: {
      height: "49px",
      width: "130px",
      cursor: "pointer",
      transition: "transform 0.2s ease, opacity 0.2s ease",
    },
    iconHover: {
      transform: "translateY(-5px)",
      opacity: 0.8,
    },
    textSection: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "8px",
      fontSize: "16px",
      lineHeight: "25px",
      opacity: 0.8,
      width: "90%",
      maxWidth: "703px",
      fontWeight:"400",
      

    },
  };

  const handleMouseEnter = (e, type) => {
    if (type === "link") {
      e.target.style.transform = styles.linkHover.transform;
      e.target.style.color = styles.linkHover.color;
    } else {
      e.target.style.transform = styles.iconHover.transform;
      e.target.style.opacity = styles.iconHover.opacity;
    }
  };

  const handleMouseLeave = (e, type) => {
    e.target.style.transform = "none";
    e.target.style.opacity = "1";
    if (type === "link") e.target.style.color = "#e0e0e0";
  };

  return (
    <footer style={styles.container}>
      {/* Menu liên kết */}
      <div style={styles.linkRow}>
        {Quest.map((item, index) => (
          <a
            key={index}
            href={item.link}
            style={styles.link}
            onMouseEnter={(e) => handleMouseEnter(e, "link")}
            onMouseLeave={(e) => handleMouseLeave(e, "link")}
          >
            {item.foter}
          </a>
        ))}
      </div>

      {/* Icon mạng xã hội */}
      <div style={styles.iconRow}>
        <div style={styles.group}>
          <img src={fb} alt="Facebook" style={styles.icon} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
          <img src={zalo} alt="Zalo" style={styles.icon} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
          <img src={yt} alt="YouTube" style={styles.icon} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
        </div>

        <div style={styles.group}>
          <img src={chlplay} alt="Google Play" style={styles.icon1} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
          <img src={appstort} alt="App Store" style={styles.icon1} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
        </div>

        <div style={styles.group}>
          <img src={thongbao} alt="Bộ Công Thương" style={styles.icon2} onMouseEnter={(e) => handleMouseEnter(e, "icon")} onMouseLeave={(e) => handleMouseLeave(e, "icon")} />
        </div>
      </div>

      {/* Thông tin bản quyền */}
      <div style={styles.textSection}>
        <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
        <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
        <p>Giấy phép số: 224/GP-TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức Tùng – Giám đốc.</p>
        <p>Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại: 024.35141791</p>
        <p>© 2023 By NCC - All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
