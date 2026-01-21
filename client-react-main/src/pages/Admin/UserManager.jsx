import React, { useEffect, useState } from "react";
import { Users, RefreshCw, Trash2, Edit, Search } from "lucide-react";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "ACTIVE",
  });

  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:6789/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.status === 401) {
        alert("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }
      
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách người dùng:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý khi click "Sửa thông tin"
  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || "",
      status: user.status || "ACTIVE",
    });
  };

  // Cập nhật form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:6789/api/v1/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log("User updated successfully:", data);
        alert("✅ Cập nhật người dùng thành công!");
        setEditingUser(null);
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Cập nhật thất bại: ${errorData.message || "Lỗi không xác định"}`);
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật người dùng:", error);
      alert("Cập nhật thất bại! Vui lòng thử lại sau.");
    }
  };

  // Xóa người dùng
  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:6789/api/v1/users/${userId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.ok) {
          alert("✅ Xóa người dùng thành công!");
          fetchUsers();
        } else {
          alert("Xóa thất bại!");
        }
      } catch (error) {
        console.error("❌ Lỗi khi xóa người dùng:", error);
        alert("Xóa thất bại!");
      }
    }
  };

  if (loading) return <div style={loadingContainer}><p>Đang tải dữ liệu...</p></div>;

  // Tìm kiếm người dùng
  const filteredUsers = users.filter(user => {
    if (!searchTerm.trim()) return true;
    return (
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>
          <Users style={{ marginRight: "8px" }} size={24} /> Quản lý người dùng
        </h3>
        <button onClick={fetchUsers} style={btnRefresh}>
          <RefreshCw style={{ marginRight: "4px" }} size={16} /> Làm mới
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div style={searchContainer}>
        <Search style={searchIcon} size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
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

      {/* Bảng người dùng */}
      <div style={tableWrapper}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Họ</th>
              <th style={thStyle}>Tên</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Số điện thoại</th>
              <th style={thStyle}>Trạng thái</th>
              <th style={thStyle}>Vai trò</th>
              <th style={thStyle}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length ? (
              filteredUsers.map((u) => (
                <tr key={u.id} style={trStyle}>
                  <td style={tdStyle}>{u.id}</td>
                  <td style={tdStyle}><strong>{u.lastName}</strong></td>
                  <td style={tdStyle}><strong>{u.firstName}</strong></td>
                  <td style={tdStyle}>{u.email}</td>
                  <td style={tdStyle}>{u.phone || "—"}</td>
                  <td style={tdStyle}>
                    <span style={u.status === "ACTIVE" ? statusBadgeActive : statusBadgeBlocked}>
                      {u.status === "ACTIVE" ? "Hoạt động" : "Khóa"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {u.roles?.map((r, i) => (
                      <span key={i} style={roleTag}>{r.roleName}</span>
                    ))}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEditUser(u)} style={btnEdit}>
                      <Edit size={14} /> Sửa
                    </button>
                    <button onClick={() => handleDelete(u.id)} style={btnDelete}>
                      <Trash2 size={14} /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={tdStyleEmpty}>
                  {searchTerm ? "Không tìm thấy người dùng nào" : "Không có người dùng"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal sửa thông tin */}
      {editingUser && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h4 style={formTitle}>
              <Edit size={20} style={{ marginRight: "8px" }} /> Chỉnh sửa thông tin người dùng
            </h4>

            <div style={formGroup}>
              <label style={labelStyle}>Họ:</label>
              <input 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={formGroup}>
              <label style={labelStyle}>Tên:</label>
              <input 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={formGroup}>
              <label style={labelStyle}>Email:</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={formGroup}>
              <label style={labelStyle}>Số điện thoại:</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div style={formGroup}>
              <label style={labelStyle}>Trạng thái:</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="ACTIVE">Hoạt động</option>
                <option value="BLOCKED">Khóa</option>
              </select>
            </div>

            <div style={formActions}>
              <button onClick={() => setEditingUser(null)} style={btnCancel}>
                ✕ Hủy
              </button>
              <button onClick={handleUpdateUser} style={btnSave}>
                💾 Lưu thay đổi
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
  backgroundColor: "#f5f7fa",
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
  background: "linear-gradient(135deg, #e6e7edff 0%, #764ba2 100%)",
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

const statusBadgeActive = {
  backgroundColor: "#d1fae5",
  color: "#059669",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const statusBadgeBlocked = {
  backgroundColor: "#fee2e2",
  color: "#dc2626",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};

const roleTag = {
  backgroundColor: "#dbeafe",
  color: "#1d4ed8",
  padding: "4px 10px",
  borderRadius: "12px",
  marginRight: "6px",
  fontSize: "12px",
  fontWeight: "500",
  display: "inline-block",
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

const modalContent = {
  backgroundColor: "#fff",
  padding: "32px",
  borderRadius: "16px",
  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
  maxWidth: "500px",
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

const formGroup = {
  marginBottom: "16px",
};

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "6px",
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
