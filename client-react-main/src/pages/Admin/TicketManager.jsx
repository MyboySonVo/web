import React, { useEffect, useState } from "react";
import { Ticket, RefreshCw, Filter, Search, X } from "lucide-react";

export default function TicketManager() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu giả
  const loadFakeTickets = () => {
    setLoading(true);
    setTimeout(() => {
      setTickets([
        {
          id: 1,
          movieName: "Avengers: Endgame",
          seatNumber: "A1, A2",
          showTime: "19:00 - 21:30",
          userName: "Nguyễn Văn A",
          cinema: "CGV Vincom",
          totalPriceMovie: 240000,
          totalSeat: 2,
          bookingDate: "2025-11-04T18:20:00",
        },
        {
          id: 2,
          movieName: "Doraemon: Nobita và Mặt Trăng",
          seatNumber: "C5",
          showTime: "14:00 - 15:45",
          userName: "Trần Thị B",
          cinema: "Lotte Mart",
          totalPriceMovie: 120000,
          totalSeat: 1,
          bookingDate: "2025-11-05T09:10:00",
        },
        {
          id: 3,
          movieName: "Spider-Man: No Way Home",
          seatNumber: "B3, B4, B5",
          showTime: "20:00 - 22:15",
          userName: "Lê Văn C",
          cinema: "Galaxy Nguyễn Du",
          totalPriceMovie: 360000,
          totalSeat: 3,
          bookingDate: "2025-11-03T22:45:00",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadFakeTickets();
  }, []);

  // Lấy danh sách unique values cho dropdown
  const getUniqueValues = (field) => {
    if (field === "bookingDate") {
      // Lấy danh sách ngày unique (không có giờ)
      return [...new Set(tickets.map(t => {
        const d = new Date(t.bookingDate);
        return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
      }))].sort((a, b) => {
        const [dayA, monthA, yearA] = a.split('/');
        const [dayB, monthB, yearB] = b.split('/');
        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
      });
    }
    return [...new Set(tickets.map(t => t[field]))].sort();
  };

  // Hàm định dạng ngày giờ
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getFullYear()).slice(2)} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  // Định dạng tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Lọc và tìm kiếm
  const filteredTickets = tickets.filter((ticket) => {
    // Tìm kiếm toàn bộ
    const matchesSearch = !searchTerm.trim() || (
      ticket.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.cinema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.seatNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Lọc theo tiêu chí
    let matchesFilter = true;
    if (filterType && filterValue) {
      switch(filterType) {
        case "cinema":
          matchesFilter = ticket.cinema === filterValue;
          break;
        case "movieName":
          matchesFilter = ticket.movieName === filterValue;
          break;
        case "showTime":
          matchesFilter = ticket.showTime === filterValue;
          break;
        case "bookingDate":
          const ticketDate = new Date(ticket.bookingDate);
          const ticketDateStr = `${String(ticketDate.getDate()).padStart(2, "0")}/${String(ticketDate.getMonth() + 1).padStart(2, "0")}/${ticketDate.getFullYear()}`;
          matchesFilter = ticketDateStr === filterValue;
          break;
        default:
          matchesFilter = true;
      }
    }

    return matchesSearch && matchesFilter;
  });

  if (loading) return <div style={styles.loadingContainer}><p>Đang tải dữ liệu...</p></div>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <Ticket style={{ marginRight: "8px" }} size={24} /> Quản lý vé
        </h3>
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            style={showFilter ? styles.btnFilterActive : styles.btnFilter}
          >
            <Filter size={16} /> Bộ lọc
          </button>
          <button onClick={loadFakeTickets} style={styles.btnRefresh}>
            <RefreshCw size={16} /> Làm mới
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên phim, rạp, người đặt, ghế..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")} 
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>

      {/* Bộ lọc nâng cao */}
      {showFilter && (
        <div style={styles.filterDropdown}>
          <div style={styles.filterHeader}>
            <span style={styles.filterLabel}>Lọc theo tiêu chí:</span>
            <button style={styles.filterClose} onClick={() => {
              setShowFilter(false);
              setFilterType("");
              setFilterValue("");
            }}>
              <X size={16} />
            </button>
          </div>
          
          <div style={styles.filterGrid}>
            <div>
              <label style={styles.filterInputLabel}>Loại lọc:</label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setFilterValue("");
                }}
                style={styles.filterSelect}
              >
                <option value="">-- Chọn loại lọc --</option>
                <option value="cinema">🎬 Theo rạp chiếu</option>
                <option value="movieName">🎥 Theo tên phim</option>
                <option value="showTime">⏰ Theo suất chiếu</option>
                <option value="bookingDate">📅 Theo ngày đặt vé</option>
              </select>
            </div>

            {filterType && (
              <div>
                <label style={styles.filterInputLabel}>Giá trị:</label>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  style={styles.filterSelect}
                >
                  <option value="">-- Chọn {
                    filterType === "cinema" ? "rạp" : 
                    filterType === "movieName" ? "phim" : 
                    filterType === "showTime" ? "suất chiếu" :
                    "ngày"
                  } --</option>
                  {getUniqueValues(filterType).map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {(filterType && filterValue) && (
            <div style={styles.filterActive}>
              <span style={styles.filterActiveText}>
                Đang lọc: <strong>{filterValue}</strong>
              </span>
              <button 
                style={styles.filterClearBtn}
                onClick={() => {
                  setFilterType("");
                  setFilterValue("");
                }}
              >
                <X size={14} /> Xóa lọc
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bảng vé */}
      <div style={styles.sectionStyle}>
        <h4 style={styles.sectionTitle}>
          📋 Danh sách vé
          {(filterType && filterValue) && (
            <span style={styles.resultCount}> - {filteredTickets.length} kết quả</span>
          )}
        </h4>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Tên phim</th>
                <th style={styles.th}>Ghế</th>
                <th style={styles.th}>Suất chiếu</th>
                <th style={styles.th}>Người đặt</th>
                <th style={styles.th}>Rạp</th>
                <th style={styles.th}>Giá vé</th>
                <th style={styles.th}>Số ghế</th>
                <th style={styles.th}>Ngày giờ đặt</th>
              </tr>
            </thead>

            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} style={styles.tr}>
                    <td style={styles.td}><strong>{ticket.id}</strong></td>
                    <td style={styles.td}><strong>{ticket.movieName}</strong></td>
                    <td style={styles.td}><span style={styles.seatBadge}>{ticket.seatNumber}</span></td>
                    <td style={styles.td}>{ticket.showTime}</td>
                    <td style={styles.td}>{ticket.userName}</td>
                    <td style={styles.td}>{ticket.cinema}</td>
                    <td style={styles.td}><span style={styles.priceBadge}>{formatCurrency(ticket.totalPriceMovie)}</span></td>
                    <td style={styles.td}>{ticket.totalSeat}</td>
                    <td style={styles.td}>{formatDate(ticket.bookingDate)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={styles.tdEmpty} colSpan="9">
                    {searchTerm || (filterType && filterValue) ? "Không tìm thấy vé nào" : "Không có vé nào"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thống kê */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Tổng vé:</span>
          <span style={styles.statValue}>{filteredTickets.length}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Tổng doanh thu:</span>
          <span style={styles.statValue}>
            {formatCurrency(filteredTickets.reduce((sum, t) => sum + t.totalPriceMovie, 0))}
          </span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Tổng số ghế:</span>
          <span style={styles.statValue}>
            {filteredTickets.reduce((sum, t) => sum + t.totalSeat, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ==================== STYLES ====================
const styles = {
  container: {
    padding: "30px",
    minHeight: "500px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#1f2937",
    display: "flex",
    alignItems: "center",
  },

  buttonGroup: {
    display: "flex",
    gap: "12px",
  },

  btnFilter: {
    backgroundColor: "#fbbf24",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },

  btnFilterActive: {
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(245,158,11,0.3)",
  },

  btnRefresh: {
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },

  searchContainer: {
    position: "relative",
    marginBottom: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "12px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
  },

  searchIcon: {
    color: "#6b7280",
    marginRight: "12px",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "15px",
    color: "#1f2937",
    padding: "8px",
  },

  clearButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#9ca3af",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "all 0.2s",
  },

  filterDropdown: {
    marginBottom: "24px",
    background: "#fff",
    border: "2px solid #fbbf24",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(251,191,36,0.2)",
  },

  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },

  filterLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
  },

  filterClose: {
    backgroundColor: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },

  filterGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  filterInputLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: "#6b7280",
    marginBottom: "6px",
  },

  filterSelect: {
    width: "100%",
    padding: "10px 12px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    cursor: "pointer",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },

  filterActive: {
    marginTop: "16px",
    padding: "12px 16px",
    backgroundColor: "#fef3c7",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterActiveText: {
    fontSize: "14px",
    color: "#92400e",
  },

  filterClearBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "all 0.2s",
  },

  sectionStyle: {
    marginBottom: "24px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
  },

  resultCount: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#6b7280",
  },

  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  thead: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
  },

  th: {
    padding: "16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  tr: {
    borderBottom: "1px solid #e5e7eb",
    transition: "background-color 0.2s",
  },

  td: {
    padding: "14px 16px",
    color: "#374151",
    fontSize: "14px",
  },

  tdEmpty: {
    padding: "32px",
    textAlign: "center",
    color: "#9ca3af",
    fontStyle: "italic",
  },

  seatBadge: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "500",
  },

  priceBadge: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
  },

  stats: {
    display: "flex",
    gap: "24px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  statLabel: {
    fontSize: "14px",
    color: "#6b7280",
    fontWeight: "500",
  },

  statValue: {
    fontSize: "18px",
    color: "#1f2937",
    fontWeight: "700",
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    fontSize: "16px",
    color: "#6b7280",
  },
};