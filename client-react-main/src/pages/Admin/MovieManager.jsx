import React, { useEffect, useState } from "react";
import { Film, RefreshCw, Plus, Trash2, Edit, Search } from "lucide-react";

export default function MovieManager() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "",
    duration: "",
    releaseDate: "",
    descriptions: "",
    image: "",
    trailer: "",
    status: "",
  });

  const [isAddingMovie, setIsAddingMovie] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  // Lấy danh sách phim
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:6789/api/v1/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.status === 401) {
        alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }
      
      const data = await res.json();
      setMovies(data || []);
    } catch (err) {
      console.error("❌ Lỗi khi lấy danh sách phim:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Mở form sửa
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setIsAddingMovie(false);
    const releaseDateValue = movie.releaseDate ? movie.releaseDate.split("T")[0] : "";
    setFormData({
      title: movie.title || "",
      author: movie.author || "",
      type: movie.type || "",
      duration: movie.duration || "",
      releaseDate: releaseDateValue,
      descriptions: movie.descriptions || "",
      image: movie.image || "",
      trailer: movie.trailer || "",
      status: movie.status || "",
    });
  };

  // Hàm format releaseDate trước khi gửi BE
  const formatDateTimeForBE = (dateTimeStr) => {
    if (!dateTimeStr) return null;
    const d = new Date(dateTimeStr);
    const yyyy = d.getFullYear();
    const mm = (d.getMonth() + 1).toString().padStart(2, "0");
    const dd = d.getDate().toString().padStart(2, "0");
    const hh = d.getHours().toString().padStart(2, "0");
    const min = d.getMinutes().toString().padStart(2, "0");
    const ss = d.getSeconds().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  };

  const handleUpdate = async () => {
    if (!formData.title || !formData.author || !formData.releaseDate || !formData.type) {
      alert("Vui lòng điền đầy đủ thông tin: Tên phim, Tác giả, Ngày phát hành và Thể loại.");
      return;
    }
    const validTypes = ["2D","3D"];
    if (!validTypes.includes(formData.type)) {
      alert(`Thể loại không hợp lệ: ${validTypes.join(", ")}`);
      return;
    }

    const updatedData = { ...formData, releaseDate: formatDateTimeForBE(formData.releaseDate) };

    try {
      const res = await fetch(`http://localhost:6789/api/v1/movies/${editingMovie.id}`, {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      
      if (res.ok) {
        alert("✅ Cập nhật phim thành công!");
        setEditingMovie(null);
        fetchMovies();
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  const handleAddMovie = async () => {
    if (!formData.title || !formData.author || !formData.releaseDate || !formData.type) {
      alert("Vui lòng điền đầy đủ thông tin: Tên phim, Tác giả, Ngày phát hành và Thể loại.");
      return;
    }
    const validTypes = ["2D","3D"];
    if (!validTypes.includes(formData.type)) {
      alert(`Thể loại không hợp lệ: ${validTypes.join(", ")}`);
      return;
    }

    const updatedFormData = {
      ...formData,
      releaseDate: formatDateTimeForBE(formData.releaseDate),
      createdAt: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:6789/api/v1/movies", {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFormData)
      });
      
      if (response.ok) {
        alert("✅ Thêm phim thành công!");
        setIsAddingMovie(false);
        setFormData({
          title:"", author:"", type:"", duration:"", releaseDate:"", descriptions:"", image:"", trailer:"", status:""
        });
        fetchMovies();
      } else {
        const errorData = await response.text();
        alert("Thêm phim thất bại! " + errorData);
      }
    } catch (err) {
      console.error(err.message);
      alert("Thêm phim thất bại! " + err.message);
    }
  };

  // Xóa phim
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này không?")) return;
    try {
      const res = await fetch(`http://localhost:6789/api/v1/movies/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (res.ok) {
        alert("🗑️ Xóa phim thành công!");
        fetchMovies();
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      console.error("❌ Lỗi khi xóa phim:", err);
      alert("Xóa thất bại!");
    }
  };

  if (loading) return <div style={loadingContainer}><p>Đang tải dữ liệu...</p></div>;

  // Lọc phim theo tìm kiếm và trạng thái
  const filteredMovies = movies.filter(movie => {
    // Lọc theo search term
    const matchesSearch = !searchTerm.trim() || (
      movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Lọc theo status
    const matchesStatus = statusFilter === "ALL" || movie.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>
          <Film style={{ marginRight: "8px" }} size={24} /> Quản lý phim
        </h3>
        <div style={buttonGroupStyle}>
          <button onClick={fetchMovies} style={btnRefresh}>
            <RefreshCw style={{ marginRight: "4px" }} size={16} /> Làm mới
          </button>
          <button onClick={() => { setIsAddingMovie(true); setEditingMovie(null); }} style={btnAdd}>
            <Plus style={{ marginRight: "4px" }} size={16} /> Thêm phim
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div style={searchContainer}>
        <Search style={searchIcon} size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên phim, tác giả hoặc loại phim..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInput}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")} 
            style={clearButton}
          >
            ✕
          </button>
        )}
      </div>

      {/* Bộ lọc trạng thái */}
      <div style={filterContainer}>
        <span style={filterLabel}>Lọc theo trạng thái:</span>
        <div style={filterButtons}>
          <button 
            style={statusFilter === "ALL" ? filterButtonActive : filterButton}
            onClick={() => setStatusFilter("ALL")}
          >
            Tất cả ({movies.length})
          </button>
          <button 
            style={statusFilter === "NOW_SHOWING" ? filterButtonActiveShowing : filterButtonShowing}
            onClick={() => setStatusFilter("NOW_SHOWING")}
          >
            🎥 Đang Chiếu ({movies.filter(m => m.status === "NOW_SHOWING").length})
          </button>
          <button 
            style={statusFilter === "COMING_SOON" ? filterButtonActiveSoon : filterButtonSoon}
            onClick={() => setStatusFilter("COMING_SOON")}
          >
            🎬 Sắp Chiếu ({movies.filter(m => m.status === "COMING_SOON").length})
          </button>
        </div>
      </div>

      {/* Bảng tất cả phim */}
      <div style={sectionStyle}>
        <h4 style={sectionTitle}>
          🎬 Danh Sách Phim 
          {statusFilter !== "ALL" && (
            <span style={resultCount}>
              ({filteredMovies.length} kết quả)
            </span>
          )}
        </h4>
        <div style={tableWrapper}>
          <table style={tableStyle}>
            <thead style={theadStyle}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Tên phim</th>
                <th style={thStyle}>Tác giả</th>
                <th style={thStyle}>Loại Phim</th>
                <th style={thStyle}>Thời lượng</th>
                <th style={thStyle}>Ngày phát hành</th>
                <th style={thStyle}>Trạng thái</th>
                <th style={thStyle}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                  <tr key={movie.id} style={trStyle}>
                    <td style={tdStyle}>{movie.id}</td>
                    <td style={tdStyle}><strong>{movie.title}</strong></td>
                    <td style={tdStyle}>{movie.author}</td>
                    <td style={tdStyle}><span style={typeBadge}>{movie.type}</span></td>
                    <td style={tdStyle}>{movie.duration}</td>
                    <td style={tdStyle}>{movie.releaseDate}</td>
                    <td style={tdStyle}>
                      <span style={movie.status === "COMING_SOON" ? statusBadgeComingSoon : statusBadgeNowShowing}>
                        {movie.status === "COMING_SOON" ? "Sắp Chiếu" : "Đang Chiếu"}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => handleEdit(movie)} style={btnEdit}>
                        <Edit size={14} /> Sửa
                      </button>
                      <button onClick={() => handleDelete(movie.id)} style={btnDelete}>
                        <Trash2 size={14} /> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tdStyleEmpty} colSpan="8">
                    {searchTerm ? "Không tìm thấy phim nào" : "Không có phim nào"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form thêm hoặc sửa phim */}
      {(editingMovie || isAddingMovie) && (
        <div style={modalOverlay}>
          <div style={editBox}>
            <h4 style={formTitle}>{isAddingMovie ? "➕ Thêm phim mới" : "✏️ Chỉnh sửa phim"}</h4>
            <div style={formGrid}>
              <input
                type="text"
                placeholder="Tên phim"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Tác giả"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                style={inputStyle}
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                style={inputStyle}
              >
                <option value="">-- Chọn loại phim --</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
              </select>
              <input
                type="text"
                placeholder="Thời lượng (VD: 120 phút)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                style={inputStyle}
              />
              <input
                type="datetime-local"
                placeholder="Ngày giờ phát hành"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                style={inputStyle}
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={inputStyle}
              >
                <option value="">-- Chọn trạng thái --</option>
                <option value="COMING_SOON">Phim Sắp Chiếu</option>
                <option value="NOW_SHOWING">Phim Đang Chiếu</option>
              </select>
            </div>
            <textarea
              placeholder="Mô tả phim"
              value={formData.descriptions}
              onChange={(e) => setFormData({ ...formData, descriptions: e.target.value })}
              style={textareaStyle}
              rows="3"
            />
            <input
              type="text"
              placeholder="URL hình ảnh"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="URL trailer"
              value={formData.trailer}
              onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
              style={inputStyle}
            />
            <div style={formActions}>
              <button onClick={isAddingMovie ? handleAddMovie : handleUpdate} style={btnSave}>
                💾 {isAddingMovie ? "Thêm phim" : "Lưu thay đổi"}
              </button>
              <button onClick={() => { setEditingMovie(null); setIsAddingMovie(false); }} style={btnCancel}>
                ✕ Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 CSS Styles - Optimized */
const containerStyle = {
  padding: "20px",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  padding: "16px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1f2937",
  display: "flex",
  alignItems: "center",
  margin: 0,
};

const buttonGroupStyle = {
  display: "flex",
  gap: "12px",
};

const searchContainer = {
  position: "relative",
  marginBottom: "24px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "12px 16px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
};

const searchIcon = {
  color: "#6b7280",
  marginRight: "12px",
};

const searchInput = {
  flex: 1,
  border: "none",
  outline: "none",
  fontSize: "15px",
  color: "#1f2937",
  padding: "8px",
};

const clearButton = {
  backgroundColor: "transparent",
  border: "none",
  color: "#9ca3af",
  fontSize: "18px",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  transition: "all 0.2s",
};

const filterContainer = {
  marginBottom: "24px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "16px 20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexWrap: "wrap",
};

const filterLabel = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const filterButtons = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const filterButton = {
  backgroundColor: "#f3f4f6",
  color: "#6b7280",
  border: "2px solid transparent",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const filterButtonActive = {
  backgroundColor: "#667eea",
  color: "#fff",
  border: "2px solid #667eea",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s",
  boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
};

const filterButtonShowing = {
  backgroundColor: "#d1fae5",
  color: "#059669",
  border: "2px solid transparent",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const filterButtonActiveShowing = {
  backgroundColor: "#059669",
  color: "#fff",
  border: "2px solid #059669",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s",
  boxShadow: "0 4px 12px rgba(5,150,105,0.3)",
};

const filterButtonSoon = {
  backgroundColor: "#fef3c7",
  color: "#d97706",
  border: "2px solid transparent",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

const filterButtonActiveSoon = {
  backgroundColor: "#d97706",
  color: "#fff",
  border: "2px solid #d97706",
  padding: "10px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s",
  boxShadow: "0 4px 12px rgba(217,119,6,0.3)",
};

const resultCount = {
  fontSize: "14px",
  fontWeight: "400",
  color: "#6b7280",
  marginLeft: "8px",
};

const sectionStyle = {
  marginBottom: "32px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
};

const tableWrapper = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
  fontSize: "16px",
  color: "#6b7280",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const theadStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#fff",
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "14px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const trStyle = {
  borderBottom: "1px solid #e5e7eb",
  transition: "background-color 0.2s",
};

const tdStyle = {
  padding: "14px 16px",
  color: "#374151",
  fontSize: "14px",
};

const tdStyleEmpty = {
  padding: "32px",
  textAlign: "center",
  color: "#9ca3af",
  fontStyle: "italic",
};

const typeBadge = {
  backgroundColor: "#ede9fe",
  color: "#7c3aed",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const statusBadgeComingSoon = {
  backgroundColor: "#fef3c7",
  color: "#d97706",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const statusBadgeNowShowing = {
  backgroundColor: "#d1fae5",
  color: "#059669",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const btnEdit = {
  backgroundColor: "#3b82f6",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  marginRight: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "all 0.2s",
};

const btnDelete = {
  backgroundColor: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "all 0.2s",
};

const btnRefresh = {
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
  transition: "all 0.2s",
};

const btnAdd = {
  backgroundColor: "#6366f1",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  transition: "all 0.2s",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "20px",
};

const editBox = {
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  maxWidth: "700px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
};

const formTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#1f2937",
  marginBottom: "24px",
  display: "flex",
  alignItems: "center",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginBottom: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "2px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1f2937",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const textareaStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "2px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1f2937",
  outline: "none",
  transition: "border-color 0.2s",
  resize: "vertical",
  fontFamily: "inherit",
  marginBottom: "16px",
  boxSizing: "border-box",
};

const formActions = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "24px",
};

const btnSave = {
  backgroundColor: "#10b981",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s",
};

const btnCancel = {
  backgroundColor: "#6b7280",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
  transition: "all 0.2s",
};