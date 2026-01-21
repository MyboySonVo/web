import React, { useEffect, useState } from "react";
import { FaUserCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from "axios";

function Info() {
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "Nam",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const token = localStorage.getItem("token");

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:6789/api/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // Xử lý input thay đổi
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Lưu thay đổi thông tin
  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:6789/api/v1/auth/login", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("✅ Lưu thay đổi thành công!");
      }
    } catch (err) {
      alert("❌ Lỗi khi lưu thay đổi!");
      console.error(err);
    }
  };

  // Đổi mật khẩu
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:6789/api/v1/auth/register", passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("✅ Đổi mật khẩu thành công!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      alert("❌ Lỗi khi đổi mật khẩu!");
      console.error(err);
    }
  };

  if (loading) return <div style={{ color: "white", textAlign: "center" }}>Đang tải...</div>;

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: "12px",
      margin: "40px auto",
      width: "90%",
      maxWidth: "1100px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      color: "#000",
      position: "relative",
      top: "50px",
    }}>
      {/* Header */}
      <div style={{
        backgroundImage: "url('https://img.freepik.com/free-vector/abstract-red-geometric-banner-template_1035-18573.jpg')",
        backgroundSize: "cover",
        height: "180px",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          bottom: "-50px",
          left: "50px",
          display: "flex",
          alignItems: "center",
        }}>
          <FaUserCircle size={100} color="#ccc" />
          <div style={{ marginLeft: "20px", color: "#fff" }}>
            <h2 style={{ margin: 0, fontWeight: "bold" }}>{user.fullName}</h2>
            <p style={{ margin: 0 }}><MdEmail /> {user.email}</p>
            <p style={{ margin: 0 }}><FaPhoneAlt /> {user.phone} &nbsp;|&nbsp; <FaMapMarkerAlt /> {user.address}</p>
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div style={{ padding: "80px 50px 50px 50px" }}>
        {/* Tab */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid #ddd",
          marginBottom: "25px",
        }}>
          <button onClick={() => setActiveTab("info")} style={{
            background: "none",
            border: "none",
            fontWeight: "bold",
            borderBottom: activeTab === "info" ? "3px solid #c00" : "3px solid transparent",
            color: activeTab === "info" ? "#c00" : "#555",
            padding: "10px 20px",
            cursor: "pointer",
          }}>
            Thông tin cá nhân
          </button>
          <button onClick={() => setActiveTab("password")} style={{
            background: "none",
            border: "none",
            fontWeight: "bold",
            borderBottom: activeTab === "password" ? "3px solid #c00" : "3px solid transparent",
            color: activeTab === "password" ? "#c00" : "#555",
            padding: "10px 20px",
            cursor: "pointer",
          }}>
            Đổi mật khẩu
          </button>
        </div>

        {/* Nội dung tab */}
        {activeTab === "info" ? (
          <div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px 40px",
              alignItems: "center",
            }}>
              {[
                { label: "Họ và tên", name: "fullName", type: "text" },
                { label: "Ngày sinh", name: "birthday", type: "date" },
                { label: "Email", name: "email", type: "text", disabled: true },
                { label: "Giới tính", name: "gender", type: "select" },
                { label: "Số điện thoại", name: "phone", type: "text" },
                { label: "Địa chỉ", name: "address", type: "text" },
              ].map((field, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#333",
                  }}>
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={user[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}
                      style={{
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        backgroundColor: field.disabled ? "#f2f2f2" : "#fff",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <button onClick={handleSave} style={{
              marginTop: "30px",
              backgroundColor: "#c00",
              border: "none",
              color: "#fff",
              padding: "12px 35px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}>
              Lưu thay đổi
            </button>
          </div>
        ) : (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}>
              {[
                { label: "Mật khẩu hiện tại", name: "currentPassword" },
                { label: "Mật khẩu mới", name: "newPassword" },
                { label: "Xác nhận mật khẩu mới", name: "confirmPassword" },
              ].map((field, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333",
                  }}>
                    {field.label}
                  </label>
                  <input
                    type="password"
                    name={field.name}
                    value={passwordData[field.name]}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        [field.name]: e.target.value,
                      })
                    }
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "15px",
                    }}
                  />
                </div>
              ))}

              <div style={{ textAlign: "left", marginTop: "10px" }}>
                <button onClick={handlePasswordChange} style={{
                  backgroundColor: "#c00",
                  border: "none",
                  color: "#fff",
                  padding: "12px 35px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}>
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Info;