import React from "react";

// Giờ phim
const Time = () => {
  const times = ["18:00", "19:35", "20:05", "21:00", "22:10", "23:15"];

  return (
    <div style={styles.container}>
      {times.map((time, index) => (
        <div
          key={index}
          style={{
            ...styles.timeButton,
            ...(index === 0 ? styles.active : {}), // Giờ đầu tiên active mặc định
          }}
        >
          {time}
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap", 
    gap: "20px",
    justifyContent: "flex-start", 
    alignItems: "center",
    width: "100%", 
    maxWidth: "800px", 
    margin: "40px auto", 
    padding: "0 20px", 
  },

  timeButton: {
    flex: "1 1 120px", 
    maxWidth: "150px", 
    minWidth: "100px",
    height: "40px",
    borderRadius: "9999px",
    border: "1px solid #2b2f36",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Montserrat', sans-serif",
    color: "#e0e0e0",
    fontWeight: "600",
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "0.3s ease",
  },

  active: {
    backgroundColor: "#252a33",
    border: "1px solid #252a33",
  },
};

export default Time;
