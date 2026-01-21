import React, { useEffect, useState } from "react";
import { Image, Plus, Upload, Trash2, Edit, X, AlertTriangle, RefreshCw, ExternalLink } from "lucide-react";

const API_URL = "http://localhost:6789/api/v1/banners";
const BANNER_POSITIONS = ["Trên", "Dưới"];
const BANNER_TYPES = {
  IMAGE: "Hình ảnh",
  VIDEO: "Video",
};
const INITIAL_FORM_DATA = {
  position: "Trên", 
  type: "IMAGE", 
  url: "",
};

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    position: "Trên",
    type: "IMAGE",
    url: "",
  });

  // Lấy danh sách banner
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }
      
      const data = await res.json();
      setBanners(data || []);
    } catch (err) {
      console.error("Lỗi khi tải banner:", err);
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

  // Thêm hoặc cập nhật banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.url.trim()) {
      alert("Vui lòng nhập URL!");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      
      if (editingBanner) {
        const res = await fetch(`${API_URL}/${formData.id}`, {
          method: "PUT",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("✅ Cập nhật banner thành công!");
        } else {
          alert("Cập nhật thất bại!");
          return;
        }
      } else {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
          alert("✅ Thêm banner thành công!");
        } else {
          alert("Thêm banner thất bại!");
          return;
        }
      }

      fetchBanners();
      setFormData({ id: "", position: "Trên", type: "IMAGE", url: "" });
      setEditingBanner(null);
      setShowModal(false);
    } catch (err) {
      console.error("Lỗi khi lưu banner:", err);
      alert("❌ Lưu banner thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mở modal thêm mới
  const handleAddNew = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingBanner(null);
    setShowModal(true);
  };

  // Chỉnh sửa banner
  const handleEdit = (banner) => {
    setFormData(banner);
    setEditingBanner(banner);
    setShowModal(true);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingBanner(null);
    setShowModal(false);
  };

  // Xóa banner
  const handleDeleteClick = (banner) => {
    setDeleteConfirm(banner);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`http://localhost:6789/api/v1/banners/${id}`);
      alert("🗑️ Xóa banner thành công!");
      fetchBanners();
    } catch (err) {
      console.error("Lỗi khi xóa banner:", err);
      alert("❌ Xóa banner thất bại!");
    } finally {
      setDeleteConfirm(null);
    }
  };

  if (loading) return <div style={styles.loadingContainer}><p>Đang tải dữ liệu...</p></div>;

  return (
    <div style={pageStyle}>
      <h2 style={titleStyle}><AiOutlinePicture /> Quản lý Banner</h2>

      {/* Form thêm/sửa */}
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGrid}>
          <div>
            <label>Vị trí:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="Trên">Trên</option>
              <option value="Dưới">Dưới</option>
              <option value="Trái">Trái</option>
              <option value="Phải">Phải</option>
            </select>
          </div>

          <div>
            <label>Loại:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="IMAGE">Hình ảnh</option>
              <option value="VIDEO">Video</option>
            </select>
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label>URL:</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        </div>
      </form>

      {/* Bảng danh sách */}
      <div style={styles.sectionStyle}>
        <h4 style={styles.sectionTitle}>🖼️ Danh sách banner ({banners.length})</h4>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Vị trí</th>
                <th style={styles.th}>Loại</th>
                <th style={styles.th}>URL</th>
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {banners.length === 0 ? (
                <tr>
                  <td colSpan="5" style={styles.tdEmpty}>
                    Chưa có banner nào
                  </td>
                </tr>
              ) : (
                banners.map((banner) => (
                  <tr key={banner.id} style={styles.tr}>
                    <td style={styles.td}><strong>{banner.id}</strong></td>
                    <td style={styles.td}>
                      <span style={styles.positionBadge}>
                        {banner.position}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={banner.type === "IMAGE" ? styles.typeBadgeImage : styles.typeBadgeVideo}>
                        {BANNER_TYPES[banner.type] || banner.type}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <a 
                        href={banner.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.urlLink}
                      >
                        {banner.url.length > 50 ? banner.url.substring(0, 50) + "..." : banner.url}
                        <ExternalLink size={12} style={{ marginLeft: "4px" }} />
                      </a>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleEdit(banner)} style={styles.btnEdit}>
                        <Edit size={14} /> Sửa
                      </button>
                      <button onClick={() => handleDeleteClick(banner)} style={styles.btnDelete}>
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
                {editingBanner ? (
                  <><Edit size={20} /> Chỉnh sửa banner</>
                ) : (
                  <><Plus size={20} /> Thêm banner mới</>
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
                    Vị trí <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  >
                    {BANNER_POSITIONS.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={styles.label}>
                    Loại <span style={styles.required}>*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    {Object.entries(BANNER_TYPES).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={styles.label}>
                    URL <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://example.com/banner.jpg"
                    required
                    style={styles.input}
                  />
                </div>
              </div>
            </div>

            <div style={styles.formModalActions}>
              <button style={styles.btnCancel} onClick={handleCancelEdit}>
                <X size={16} /> Hủy
              </button>
              <button onClick={handleSubmit} style={styles.btnSave} disabled={isSubmitting}>
                {isSubmitting ? (
                  "Đang lưu..."
                ) : editingBanner ? (
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
              <h3 style={styles.deleteModalTitle}>Xác nhận xóa banner</h3>
            </div>

            <div style={styles.deleteModalBody}>
              <p style={styles.deleteModalText}>
                Bạn có chắc chắn muốn xóa banner <strong>{deleteConfirm.position}</strong> này không?
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

  positionBadge: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  typeBadgeImage: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  typeBadgeVideo: {
    backgroundColor: "#fce7f3",
    color: "#be123c",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
  },

  urlLink: {
    color: "#667eea",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
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

  // Modal styles
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

  formModal: {
    backgroundColor: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    maxWidth: "600px",
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

  // Delete Modal styles
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