import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Users, Ticket, Film, Grid, Calendar, TrendingUp } from "lucide-react";
import SidebarAdmin from "./SidebarAdmin";
import UserManager from "./UserManager";
import TicketManager from "./TicketManager";
import MovieManager from "./MovieManager";
import BannerManager from "./BannerManager";
import NewsManager from "./NewsManage";
import GenreManager from './GenreManager'; 
import FestivalManager from './FestivalManager';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserManager />;
      case "tickets":
        return <TicketManager />;
      case "movies":
        return <MovieManager />;
      case "banners":
        return <BannerManager />;
      case "news":
        return <NewsManager />;
      case "genres":
        return <GenreManager />;
      case "festivals":
        return <FestivalManager />;
      default:
        return <UserManager />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case "users":
        return "Quản lý người dùng";
      case "tickets":
        return "Quản lý vé";
      case "movies":
        return "Quản lý phim";
      case "banners":
        return "Quản lý banner";
      case "news":
        return "Quản lý tin tức";
      case "genres":
        return "Quản lý thể loại"; 
      case "festivals": 
        return "Quản lý Liên hoan phim";
      default:
        return "Trang Admin";
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case "users":
        return "Quản lý và điều hành người dùng";
      case "tickets":
        return "Theo dõi và quản lý vé bán ra";
      case "movies":
        return "Quản lý danh mục phim";
      case "banners":
        return "Quản lý banner quảng cáo";
      case "news":
        return "Quản lý tin tức và bài viết";
      case "genres":
        return "Phân loại và quản lý thể loại phim";
      case "festivals":
        return "Tổ chức và quản lý sự kiện";
      default:
        return "Quản lý và điều hành hệ thống";
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case "users":
        return <Users size={28} />;
      case "tickets":
        return <Ticket size={28} />;
      case "movies":
        return <Film size={28} />;
      case "genres":
        return <Grid size={28} />;
      case "festivals":
        return <Calendar size={28} />;
      default:
        return <Users size={28} />;
    }
  };

  return (
    <div style={styles.container}>
      <SidebarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div style={styles.mainContent}>
        {/* Header Bar */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <div style={styles.iconBox}>
                {getIcon()}
              </div>
              <div>
                <h2 style={styles.title}>
                  {getTitle()}
                </h2>
                <p style={styles.description}>
                  {getDescription()}
                </p>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/")}
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
              }}
            >
              <ArrowLeft size={20} />
              Quay lại trang chủ
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {/* Breadcrumb */}
          <div style={styles.breadcrumb}>
            <Home size={16} />
            <span style={styles.breadcrumbSeparator}>/</span>
            <span>Admin</span>
            <span style={styles.breadcrumbSeparator}>/</span>
            <span style={styles.breadcrumbActive}>{getTitle()}</span>
          </div>

          {/* Stats Cards - Đưa lên đầu */}
          <div style={styles.statsGrid}>
            <div 
              style={{
                ...styles.statCard,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: hoveredCard === 0 
                  ? "0 12px 40px rgba(102,126,234,0.4)" 
                  : "0 8px 30px rgba(102,126,234,0.3)",
                transform: hoveredCard === 0 ? "translateY(-8px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statHeader}>
                <div style={styles.statIconBox}>
                  <Users size={28} />
                </div>
                <span style={styles.statValue}>1,234</span>
              </div>
              <p style={styles.statTitle}>Tổng người dùng</p>
              <div style={styles.statFooter}>
                <TrendingUp size={14} />
                <span>+12% so với tháng trước</span>
              </div>
            </div>

            <div 
              style={{
                ...styles.statCard,
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                boxShadow: hoveredCard === 1 
                  ? "0 12px 40px rgba(245,87,108,0.4)" 
                  : "0 8px 30px rgba(245,87,108,0.3)",
                transform: hoveredCard === 1 ? "translateY(-8px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statHeader}>
                <div style={styles.statIconBox}>
                  <Ticket size={28} />
                </div>
                <span style={styles.statValue}>5,678</span>
              </div>
              <p style={styles.statTitle}>Vé đã bán</p>
              <div style={styles.statFooter}>
                <TrendingUp size={14} />
                <span>+8% so với tháng trước</span>
              </div>
            </div>

            <div 
              style={{
                ...styles.statCard,
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                boxShadow: hoveredCard === 2 
                  ? "0 12px 40px rgba(79,172,254,0.4)" 
                  : "0 8px 30px rgba(79,172,254,0.3)",
                transform: hoveredCard === 2 ? "translateY(-8px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statHeader}>
                <div style={styles.statIconBox}>
                  <Film size={28} />
                </div>
                <span style={styles.statValue}>156</span>
              </div>
              <p style={styles.statTitle}>Phim đang chiếu</p>
              <div style={styles.statFooter}>
                <TrendingUp size={14} />
                <span>+15% so với tháng trước</span>
              </div>
            </div>

            <div 
              style={{
                ...styles.statCard,
                background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                boxShadow: hoveredCard === 3 
                  ? "0 12px 40px rgba(250,112,154,0.4)" 
                  : "0 8px 30px rgba(250,112,154,0.3)",
                transform: hoveredCard === 3 ? "translateY(-8px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.statHeader}>
                <div style={styles.statIconBox}>
                  <Calendar size={28} />
                </div>
                <span style={styles.statValue}>12</span>
              </div>
              <p style={styles.statTitle}>Liên hoan phim</p>
              <div style={styles.statFooter}>
                <TrendingUp size={14} />
                <span>+5% so với tháng trước</span>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div style={styles.contentCard}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },

  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "24px 40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  iconBox: {
    width: "60px",
    height: "60px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },

  title: {
    fontWeight: "700",
    color: "white",
    margin: 0,
    fontSize: "32px",
    letterSpacing: "-0.5px",
  },

  description: {
    color: "rgba(255,255,255,0.85)",
    margin: "4px 0 0 0",
    fontSize: "14px",
    fontWeight: "400",
  },

  backButton: {
    background: "white",
    color: "#667eea",
    border: "none",
    borderRadius: "12px",
    padding: "14px 28px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  },

  contentArea: {
    padding: "40px",
    flex: 1,
  },

  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
    fontSize: "14px",
    color: "#6b7280",
    backgroundColor: "white",
    padding: "12px 20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },

  breadcrumbSeparator: {
    color: "#d1d5db",
    fontWeight: "300",
  },

  breadcrumbActive: {
    color: "#667eea",
    fontWeight: "600",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },

  statCard: {
    borderRadius: "20px",
    padding: "28px",
    color: "white",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },

  statHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  statIconBox: {
    width: "50px",
    height: "50px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
  },

  statValue: {
    fontSize: "36px",
    fontWeight: "700",
    letterSpacing: "-1px",
  },

  statTitle: {
    margin: "0 0 12px 0",
    opacity: 0.95,
    fontSize: "15px",
    fontWeight: "500",
  },

  statFooter: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    opacity: 0.9,
    fontSize: "13px",
    fontWeight: "500",
    marginTop: "16px",
    padding: "8px 12px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "8px",
    backdropFilter: "blur(10px)",
  },

  contentCard: {
    background: "white",
    borderRadius: "20px",
    padding: "0",
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
};