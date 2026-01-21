import React, { useEffect, useState } from "react";
import { Newspaper, Plus, Upload, Trash2, Edit, X, AlertTriangle, RefreshCw, Search } from "lucide-react";

export default function NewsManager() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    imageUrl: "",
    festival_id: "",
  });

  // Hàm lấy token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  // Lấy danh sách tin tức
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:6789/api/v1/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }
      
      const data = await res.json();
      setNewsList(data || []);
    } catch (err) {
      console.error("❌ Lỗi khi tải tin tức:", err);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm hoặc cập nhật tin tức
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Vui lòng điền đầy đủ tiêu đề và nội dung!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      if (editingNews) {
        const res = await fetch(`http://localhost:6789/api/v1/news/${formData.id}`, {
          method: "PUT",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("✅ Cập nhật tin tức thành công!");
        } else {
          alert("Cập nhật thất bại!");
          return;
        }
      } else {
        const res = await fetch("http://localhost:6789/api/v1/news", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("✅ Thêm tin tức thành công!");
        } else {
          alert("Thêm tin thất bại!");
          return;
        }
      }

      fetchNews();
      setFormData({ id: "", title: "", content: "", imageUrl: "", festival_id: "" });
      setEditingNews(null);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Lỗi khi lưu tin tức:", err);
      alert("❌ Lưu tin thất bại!");
    }
  };

  // Mở modal thêm mới
  const handleAddNew = () => {
    setFormData({ id: "", title: "", content: "", imageUrl: "", festival_id: "" });
    setEditingNews(null);
    setShowModal(true);
  };

  // Chỉnh sửa tin
  const handleEdit = (news) => {
    setFormData(news);
    setEditingNews(news);
    setShowModal(true);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setFormData({ id: "", title: "", content: "", imageUrl: "", festival_id: "" });
    setEditingNews(null);
    setShowModal(false);
  };

  // Xóa tin
  const handleDeleteClick = (news) => {
    setDeleteConfirm(news);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:6789/api/v1/news/${deleteConfirm.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        alert("🗑️ Xóa tin thành công!");
        fetchNews();
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("❌ Xóa thất bại!");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <div style={styles.loadingContainer}><p>Đang tải dữ liệu...</p></div>;

  // Lọc tin tức theo tìm kiếm
  const filteredNews = newsList.filter(news => {
    if (!searchTerm.trim()) return true;
    return (
      news.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.festival_id?.toString().includes(searchTerm)
    );
  });

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <Newspaper style={{ marginRight: "8px" }} size={24} /> Quản lý Tin tức
        </h3>
        <div style={styles.buttonGroup}>
          <button onClick={fetchNews} style={styles.btnRefresh}>
            <RefreshCw size={16} /> Làm mới
          </button>
          <button onClick={handleAddNew} style={styles.btnAdd}>
            <Plus size={16} /> Thêm tin tức
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div style={styles.searchContainer}>
        <Search style={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tiêu đề, nội dung hoặc mã lễ hội..."
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

      {/* Bảng danh sách */}
      <div style={styles.sectionStyle}>
        <h4 style={styles.sectionTitle}>
          📰 Danh sách tin tức ({filteredNews.length})
        </h4>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Ảnh</th>
                <th style={styles.th}>Tiêu đề</th>
                <th style={styles.th}>Nội dung</th>
                <th style={styles.th}>Ngày tạo</th>
                <th style={styles.th}>Cập nhật</th>
                <th style={styles.th}>Festival ID</th>
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan="8" style={styles.tdEmpty}>
                    {searchTerm ? "Không tìm thấy tin tức nào" : "Chưa có tin tức nào"}
                  </td>
                </tr>
              ) : (
                filteredNews.map((news) => (
                  <tr key={news.id} style={styles.tr}>
                    <td style={styles.td}><strong>{news.id}</strong></td>
                    <td style={styles.td}>
                      {news.imageUrl ? (
                        <img
                          src={news.imageUrl}
                          alt="news"
                          style={styles.newsImage}
                        />
                      ) : (
                        <div style={styles.noImage}>Không có ảnh</div>
                      )}
                    </td>
                    <td style={styles.td}>
                      <strong>{news.title}</strong>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.contentPreview} title={news.content}>
                        {news.content}
                      </div>
                    </td>
                    <td style={styles.td}>{formatDate(news.createdAt)}</td>
                    <td style={styles.td}>{formatDate(news.updatedAt)}</td>
                    <td style={styles.td}>
                      <span style={styles.festivalBadge}>{news.festival_id}</span>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(news)} style={styles.btnEdit}>
                        <Edit size={14} /> Sửa
                      </button>
                      <button onClick={() => handleDeleteClick(news)} style={styles.btnDelete}>
                        <Trash2 size={14} /> Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Thêm/Sửa */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCancelEdit}>
          <div style={styles.formModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.formModalHeader}>
              <h4 style={styles.formTitle}>
                {editingNews ? (
                  <><Edit size={20} /> Chỉnh sửa tin tức</>
                ) : (
                  <><Plus size={20} /> Thêm tin tức mới</>
                )}
              </h4>
              <button style={styles.closeBtn} onClick={handleCancelEdit}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.formModalBody}>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.label}>
                    Tiêu đề <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề tin tức"
                    required
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>
                    Mã lễ hội (Festival ID) <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    name="festival_id"
                    value={formData.festival_id}
                    onChange={handleChange}
                    placeholder="Nhập mã lễ hội"
                    required
                    style={styles.input}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={styles.label}>URL ảnh</label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={styles.input}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={styles.label}>
                    Nội dung <span style={styles.required}>*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Nhập nội dung tin tức..."
                    required
                    rows="5"
                    style={styles.textarea}
                  />
                </div>
              </div>
            </div>

            <div style={styles.formModalActions}>
              <button style={styles.btnCancel} onClick={handleCancelEdit}>
                <X size={16} /> Hủy
              </button>
              <button onClick={handleSubmit} style={styles.btnSave}>
                {editingNews ? (
                  <><Upload size={16} /> Cập nhật</>
                ) : (
                  <><Plus size={16} /> Thêm mới</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
      {deleteConfirm && (
        <div style={styles.modalOverlay} onClick={() => setDeleteConfirm(null)}>
          <div style={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.deleteModalHeader}>
              <div style={styles.deleteIconBox}>
                <AlertTriangle size={28} />
              </div>
              <h3 style={styles.deleteModalTitle}>Xác nhận xóa tin tức</h3>
            </div>

            <div style={styles.deleteModalBody}>
              <p style={styles.deleteModalText}>
                Bạn có chắc chắn muốn xóa tin tức <strong>"{deleteConfirm.title}"</strong> không?
              </p>
              <p style={styles.deleteModalWarning}>
                ⚠️ Hành động này không thể hoàn tác!
              </p>
            </div>

            <div style={styles.deleteModalActions}>
              <button style={styles.btnCancelDelete} onClick={() => setDeleteConfirm(null)}>
                <X size={16} />
                Hủy
              </button>
              <button style={styles.btnConfirmDelete} onClick={handleDeleteConfirm}>
                <Trash2 size={16} />
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
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

  btnAdd: {
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

  // Form Modal styles
  formModal: {
    backgroundColor: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  formModalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 32px",
    borderBottom: "1px solid #e5e7eb",
  },

  formTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  closeBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    transition: "all 0.2s",
  },

  formModalBody: {
    padding: "24px 32px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px",
  },

  required: {
    color: "#ef4444",
  },

  input: {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#1f2937",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },

  textarea: {
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
    boxSizing: "border-box",
  },

  formModalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    padding: "24px 32px",
    borderTop: "1px solid #e5e7eb",
  },

  btnCancel: {
    backgroundColor: "#6b7280",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },

  btnSave: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
  },

  sectionStyle: {
    marginBottom: "24px",
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "12px",
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

  newsImage: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
  },

  noImage: {
    width: "80px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    fontSize: "11px",
    color: "#9ca3af",
    border: "2px dashed #d1d5db",
  },

  contentPreview: {
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  festivalBadge: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  btnEdit: {
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
  },

  btnDelete: {
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
  },

  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    fontSize: "16px",
    color: "#6b7280",
  },

  // Delete Modal styles
  modalOverlay: {
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
  },

  deleteModal: {
    backgroundColor: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    maxWidth: "480px",
    width: "90%",
  },

  deleteModalHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "32px 32px 24px 32px",
    borderBottom: "1px solid #e5e7eb",
  },

  deleteIconBox: {
    width: "60px",
    height: "60px",
    backgroundColor: "#fee2e2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ef4444",
  },

  deleteModalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center",
  },

  deleteModalBody: {
    padding: "24px 32px",
    textAlign: "center",
  },

  deleteModalText: {
    fontSize: "15px",
    color: "#374151",
    margin: "0 0 16px 0",
    lineHeight: "1.6",
  },

  deleteModalWarning: {
    fontSize: "14px",
    color: "#dc2626",
    margin: 0,
    fontWeight: "500",
    padding: "12px 16px",
    backgroundColor: "#fee2e2",
    borderRadius: "8px",
  },

  deleteModalActions: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    padding: "24px 32px",
    borderTop: "1px solid #e5e7eb",
  },

  btnCancelDelete: {
    backgroundColor: "#6b7280",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },

  btnConfirmDelete: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },
};