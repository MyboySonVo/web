import React from "react";
import { useParams } from "react-router-dom";
import tt1 from "../assets/tt1.png";

const TinTucChiTiet = () => {
  const { id } = useParams();

  const newsList = [
    {
      id: "chuong-trinh-phim-ki-niem-70-nam",
      title: "Chương trình phim kỉ niệm nhân dịp 70 năm Giải phóng Thủ đô",

      content3: `Nhân dịp 70 năm ngày Giải phóng Thủ đô (10/10/1954 – 10/10/2024), Trung tâm Chiếu phim Quốc gia tổ chức chương trình phim kỉ niệm tại Trung tâm.`,

      content: `
        Bộ phim được chọn để trình chiếu miễn phí trong chương trình phim lần này là: “Đào, phở và Piano”.
        Tác phẩm tái hiện khung cảnh Hà Nội những ngày cuối cùng trong Trận Hà Nội 1946
        và vừa được chọn làm đại diện cho Điện ảnh Việt Nam dự vòng sơ loại Oscar 2025.
      `,
      content2: `1- Thời gian chiếu phim: Từ 6/10- 10/10/2024

2- Địa điểm: Phòng chiếu số 12

3- Suất chiếu: 10h00 và 20h15

4- Hình thức nhận vé: Khách hàng nhận vé 0 đồng trực tiếp tại quầy vé từ 8h00 đến 23h00 hàng ngày, bắt đầu từ ngày 4/10/2024 đến khi hết vé (khán giả có thể nhận vé trước ngày xem phim và mỗi khách nhận tối đa 02 vé/người).
`,
      date: "03/10/2024",
      image: tt1,
    },
  ];

  const news = newsList.find((n) => n.id === id);

  if (!news) return <h2 style={{ color: "white" }}>Không tìm thấy bài viết</h2>;

  return (
    <div
      style={{
        padding: "40px 5vw",
        color: "white",
        maxWidth: "1280px",
        margin: "0 auto",
        position:"relative",
        top:"30px"
      }}
    >
      <h2
        style={{
          fontSize: "clamp(20px, 2vw, 28px)",
          fontWeight: "700",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: "1.4",
          marginBottom: "20px",
        }}
      >
        {news.title}
      </h2>

      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400",
          fontSize: "clamp(14px, 1.2vw, 18px)",
          lineHeight: "1.6",
          opacity: 0.8,
          top:"10px",
          position:"relative",
        }}
      >
        {news.content3}
      </p>

      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400",
          fontSize: "clamp(14px, 1.2vw, 18px)",
          lineHeight: "1.6",
          opacity: 0.8,
          marginBottom: "20px",
          whiteSpace: "pre-line",
        }}
      >
        {news.content}
      </p>

      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "400",
          fontSize: "clamp(14px, 1.2vw, 18px)",
          lineHeight: "1.6",
          opacity: 0.8,
          whiteSpace: "pre-line",
          marginBottom: "40px",
        }}
      >
        {news.content2}
      </p>

      <img
        src={news.image}
        alt={news.title}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default TinTucChiTiet;
