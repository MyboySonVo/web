import React, { useState } from "react";

const TabList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { month: "Th.11", date: "13", day: "Thứ tư" },
    { month: "Th.11", date: "14", day: "Thứ năm" },
    
  ];

  return (
    <div style={styles.wrapper}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          style={{
            ...styles.tabItem,
            ...(activeIndex === index ? styles.active : {}),
          }}
          onClick={() => setActiveIndex(index)}
          onMouseOver={(e) => {
            if (activeIndex !== index) e.currentTarget.style.backgroundColor = "#333";
          }}
          onMouseOut={(e) => {
            if (activeIndex !== index) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <span style={styles.month}>{tab.month}</span>
          <span style={styles.date}>{tab.date}</span>
          <span style={styles.day}>{tab.day}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#1b1e24",
    padding: "10px 20px",
    position: "relative",
    bottom: "8px",
    right: "10px",
    width: "110%",         
    maxWidth: "100vw",     
    height: "auto",        
    flexWrap: "wrap",     
    boxSizing: "border-box",
  },
  tabItem: {
    width: "70px",
    minWidth: "60px",
    height: "80px",
    backgroundColor: "transparent",
    color: "#d0d0d0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    cursor: "pointer",
    flexShrink: 0,
  },
  active: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    transform: "scale(1.05)",
  },
  month: {
    fontSize: "12px",
    opacity: 0.8,
    fontFamily: "'Montserrat', sans-serif",
  },
  date: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "4px 0",
    fontFamily: "'Montserrat', sans-serif",
  },
  day: {
    fontSize: "12px",
    fontFamily: "'Montserrat', sans-serif",
  },
};

export default TabList;
