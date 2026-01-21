import React, { useState } from 'react';
import { Edit, Trash2, Plus, X, Check, AlertTriangle } from 'lucide-react';

// Dữ liệu giả
const initialGenres = [
  { key: '1', id: '01', name: 'Hành động' },
  { key: '2', id: '02', name: 'Tâm lý' },
  { key: '3', id: '03', name: 'Kinh dị' },
  { key: '4', id: '04', name: 'Hài' },
  { key: '5', id: '05', name: 'Khoa học viễn tưởng' },
];

const GenreManager = () => {
  const [genres, setGenres] = useState(initialGenres);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGenre, setEditingGenre] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAdd = () => {
    setEditingGenre(null);
    setFormData({ name: '' });
    setIsModalVisible(true);
  };

  const handleEdit = (genre) => {
    setEditingGenre(genre);
    setFormData({ name: genre.name });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({ name: '' });
  };

  const handleDeleteClick = (genre) => {
    setDeleteConfirm(genre);
  };

  const handleDeleteConfirm = () => {
    setGenres(genres.filter(genre => genre.key !== deleteConfirm.key));
    setDeleteConfirm(null);
    alert('✅ Xóa thể loại thành công!');
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên thể loại!');
      return;
    }

    if (editingGenre) {
      // Sửa
      setGenres(genres.map(g => 
        g.key === editingGenre.key ? { ...g, name: formData.name } : g
      ));
      alert('✅ Cập nhật thể loại thành công!');
    } else {
      // Thêm mới
      const maxIdNum = genres.reduce((max, g) => Math.max(max, parseInt(g.id, 10)), 0);
      const newDisplayId = String(maxIdNum + 1).padStart(2, '0');
      
      const newGenre = {
        key: Date.now().toString(),
        id: newDisplayId,
        name: formData.name,
      };
      
      setGenres([...genres, newGenre]);
      alert('✅ Thêm thể loại thành công!');
    }
    
    setIsModalVisible(false);
    setFormData({ name: '' });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Quản lý Thể loại</h2>
        <button style={styles.btnAdd} onClick={handleAdd}>
          <Plus size={18} />
          Thêm thể loại mới
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={{...styles.th, width: '100px'}}>ID</th>
              <th style={styles.th}>Tên thể loại</th>
              <th style={{...styles.th, width: '200px', textAlign: 'center'}}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {genres.map((genre) => (
              <tr key={genre.key} style={styles.tr}>
                <td style={styles.td}><strong>{genre.id}</strong></td>
                <td style={styles.td}>{genre.name}</td>
                <td style={{...styles.td, textAlign: 'center'}}>
                  <button 
                    style={styles.btnEdit} 
                    onClick={() => handleEdit(genre)}
                  >
                    <Edit size={14} />
                    Sửa
                  </button>
                  
                  <button 
                    style={styles.btnDelete}
                    onClick={() => handleDeleteClick(genre)}
                  >
                    <Trash2 size={14} />
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {genres.length === 0 && (
        <div style={styles.emptyState}>
          <p>Chưa có thể loại nào</p>
        </div>
      )}

      {/* Modal Xóa */}
      {deleteConfirm && (
        <div style={styles.modalOverlay} onClick={handleDeleteCancel}>
          <div style={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.deleteModalHeader}>
              <Trash2 size={24} color="#ef4444" />
              <h3 style={styles.deleteModalTitle}>Xác nhận xóa</h3>
            </div>

            <div style={styles.deleteModalBody}>
              <p style={styles.deleteModalText}>
                Bạn có chắc chắn muốn xóa thể loại <strong>"{deleteConfirm.name}"</strong>?
              </p>
              <p style={styles.deleteModalWarning}>
                Hành động này không thể hoàn tác!
              </p>
            </div>

            <div style={styles.deleteModalActions}>
              <button style={styles.btnCancelDelete} onClick={handleDeleteCancel}>
                <X size={16} />
                Hủy
              </button>
              <button style={styles.btnConfirmDelete} onClick={handleDeleteConfirm}>
                <Check size={16} />
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm/Sửa */}
      {isModalVisible && (
        <div style={styles.modalOverlay} onClick={handleCancel}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingGenre ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}
              </h3>
              <button style={styles.closeButton} onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Tên thể loại <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                style={styles.input}
                placeholder="Nhập tên thể loại"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  }
                }}
                autoFocus
              />
            </div>

            <div style={styles.formActions}>
              <button style={styles.btnCancel} onClick={handleCancel}>
                Hủy
              </button>
              <button style={styles.btnSave} onClick={handleSave}>
                {editingGenre ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== STYLES ====================
const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "16px",
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
  },

  btnAdd: {
    backgroundColor: "#6366f1",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
  },

  tableWrapper: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
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

  btnEdit: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
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
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s",
  },

  // Delete Modal styles
  deleteModal: {
    backgroundColor: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    maxWidth: "450px",
    width: "90%",
  },

  deleteModalHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "24px 32px",
    borderBottom: "1px solid #e5e7eb",
  },

  deleteModalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
  },

  deleteModalBody: {
    padding: "24px 32px",
  },

  deleteModalText: {
    fontSize: "15px",
    color: "#374151",
    margin: "0 0 12px 0",
    lineHeight: "1.6",
  },

  deleteModalWarning: {
    fontSize: "13px",
    color: "#dc2626",
    margin: 0,
    fontWeight: "500",
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

  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#9ca3af",
    fontSize: "16px",
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

  modalContent: {
    backgroundColor: "#fff",
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    width: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 32px",
    borderBottom: "1px solid #e5e7eb",
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#1f2937",
  },

  closeButton: {
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

  formGroup: {
    padding: "24px 32px",
  },

  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
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

  formActions: {
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
    transition: "all 0.2s",
  },

  btnSave: {
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s",
  },
};

export default GenreManager;