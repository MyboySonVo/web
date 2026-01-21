import React, { useState } from "react";
import { Users, Ticket, Film, Image, Newspaper, Grid, Calendar, ChevronRight, ChevronLeft, LayoutDashboard } from "lucide-react";

export default function SidebarAdmin({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "users", label: "Quản lý người dùng", icon: Users },
    { id: "tickets", label: "Quản lý vé", icon: Ticket },
    { id: "movies", label: "Quản lý phim", icon: Film },
    { id: "banners", label: "Quản lý banner", icon: Image },
    { id: "news", label: "Quản lý news", icon: Newspaper },
    { id: "genres", label: "Quản lý thể loại", icon: Grid },
    { id: "festivals", label: "Quản lý LHP", icon: Calendar },
  ];

  return (
    <div
      style={{
        width: isCollapsed ? "96px" : "280px",
        background: "#fff",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
        position: "relative",
        transition: "width 0.3s ease",
      }}
    >
      {/* Header với Logo */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          padding: isCollapsed ? "30px 16px" : "30px 24px",
          padding: isCollapsed ? "30px 8px" : "30px 24px",
          borderBottom: "1px solid #eee",
          background: "#fff",
          transition: "padding 0.3s ease",
          cursor: "pointer",
        }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
          gap: "12px",
          padding: isCollapsed ? "10px 0" : "10px",
          borderRadius: "16px",
          transition: "all 0.3s ease",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)"
        }}>
          <div style={{
            width: "48px",
            height: "40px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <LayoutDashboard size={28} color="#fff" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 style={{ 
                margin: 0, 
                fontSize: "25px",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: "#fff"
              }}>
                ADMIN
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{ 
        padding: isCollapsed ? "20px 15px" : "40px 12px",
        flex: 1,
        overflowY: "auto",
        transition: "padding 0.3s ease",
      }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ""}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "space-between",
                gap: isCollapsed ? 0 : "12px",
                padding: isCollapsed ? "14px 8px" : "14px 16px",
                margin: "4px 0",
                cursor: "pointer",
                background: isActive 
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
                color: isActive ? "#fff" : "#555",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                fontSize: "15px",
                fontWeight: isActive ? "600" : "500",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.color = "#333";
                  if (!isCollapsed) {
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#555";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                justifyContent: isCollapsed ? "center" : "flex-start",
                width: "100%"
              }}>
                <Icon size={20} style={{ flexShrink: 0 }} />
                {!isCollapsed && <span>{item.label}</span>}
              </div>
              {!isCollapsed && isActive && (
                <ChevronRight size={18} style={{ flexShrink: 0 }} />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}