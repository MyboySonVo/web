import React from "react";

function Atten() {
  return (
    <div style={style.wrapper}>
      <span style={style.note}>Lưu ý:</span>
      <span style={style.line}>
        {" "}
        Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán
        giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </span>
    </div>
  );
}

const style = {
  wrapper: {
    width: "100%", 
    maxWidth: "1200px", 
    margin: "10px auto 0 auto", 
    padding: "0 20px", 
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    textAlign: "center",
    zIndex: 1000,
  },

  note: {
    fontFamily: "'Montserrat', sans-serif",
    color: "#F97316",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    marginRight: "4px", // ✅ cách chữ “Lưu ý” và nội dung
  },

  line: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 400,
    color: "#F97316",
    fontSize: "14px",
    lineHeight: "20px",
  },
};

export default Atten;
