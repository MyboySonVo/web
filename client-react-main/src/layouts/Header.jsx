import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/dangnhap");
  };

  const Menu = [
    { title: "Trang chủ", link: "/" },
    { title: "Lịch chiếu", link: "/lich-chieu" },
    { title: "Tin tức", link: "/tin-tuc" },
    { title: "Khuyến mãi", link: "/khuyen-mai" },
    { title: "Giá vé", link: "/gia-ve" },
    { title: "Liên hoan phim", link: "/lien-hoan-phim" },
  ];

  const isAdmin =
    user?.role === "ADMIN" ||
    user?.roles?.includes("ADMIN") ||
    user?.roles?.some?.((r) => r.roleName === "ADMIN");

  return (
    <>
      <style>{`
       .menu-item {
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 400;
          font-family: 'Montserrat', sans-serif;
          line-height: 24px;
          transition: color 0.3s ease;
        }

        .menu-item:hover {
          color: #EF4444 !important;
        }
        .menu-item.active {
          color: #EF4444;
        }
        .mobile-btn:hover {
          border-color: #EF4444;
          color: #EF4444 !important;
        }
        .mobile-btn.red:hover {
          background: linear-gradient(90deg, #FFA500, #FF7F00);
          transform: scale(1.05);
        }

        a, a:visited, a:hover, a:active {
          text-decoration: none !important;
          color: inherit !important;
        }
        .logo-link {
          display: flex;
          align-items: center;
          text-decoration: none !important;
        }
        .menu-toggle {
          display: none;
          font-size: 34px; 
          color: white;
          background: none;
          border: none;
          cursor: pointer;
          position: absolute;
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1001;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          background-color: rgba(16, 20, 27, 0.98);
          position: fixed;
          top: 80px;
          left: 0;
          width: 100%;
          height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 20px 0 120px 0;
          text-align: center;
          z-index: 9999;
          color:white;
          transition: all 0.3s ease;
          opacity: 0;
          pointer-events: none;
        }
        .mobile-menu.open {
          display: flex !important;
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        @media (max-width: 1200px) {
          .nav-menu, .header-buttons {
            display: none !important;
          }
          .menu-toggle {
            display: block !important;
          }
          .logo-text {
            display: inline-block !important;
            color: white;
            font-family: 'Montserrat', sans-serif;
            margin-left: 10px;
            line-height: 18px;
          }
          .logo-text strong {
            display: block;
            font-size: 12px;
            font-weight: 600;
          }
          .logo-text span {
            display: block;
            font-size: 12px;
            opacity: 0.8;
          }
        }
        @media (min-width: 1201px) {
          .logo-text, .mobile-menu { display: none !important; }
        }

       
        .mobile-menu a.menu-item {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mobile-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      `}</style>

      <header
        style={{
          width: "100%",
          height: "80px",
          position: "fixed",
          top: 0,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#10141B4D",
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(16, 20, 27, 0.95)", 
          zIndex: 1000,
          padding: "0 10%",
          color: "white",
          
        }}
      >
        {/* Logo */}
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "70px",
              height: "50px",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <div className="logo-text">
            <strong>TRUNG TÂM CHIẾU PHIM QUỐC GIA</strong>
            <span>National Cinema Center</span>
          </div>
        </Link>

        {/* Menu desktop */}
        <ul
          className="nav-menu"
          style={{
            display: "flex",
            gap: "40px",
            listStyle: "none",
            marginLeft: "60px", // Dịch sang trái
            marginRight: "auto",
            padding: 0,
           alignItems: "center",
          }}
        >
          {Menu.map((item) => {
            const isActive =
              location.pathname === item.link ||
              location.pathname.startsWith(item.link + "/");
            return (
              <li key={item.title}>
                <Link
                  to={item.link}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* User info / buttons */}
        <div
          className="header-buttons"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "absolute",
            right: "10%",
          }}
        >
          {user ? (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "8px",
                }}
              >
                <img
                  src={
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="user"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
                <span>{user.firstName || user.fullName || user.email}</span>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    width: "230px",
                    padding: "12px 0",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    <img
                      src={
                        user.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="user"
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <p style={{ margin: "5px 0 0", fontWeight: 600 }}>
                      {user.firstName || user.fullName}
                    </p>
                    <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                      {user.email}
                    </p>
                  </div>

                  <div
                    onClick={() => navigate("/thongtin")}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    👤 Thông tin cá nhân
                  </div>

                  {isAdmin && (
                    <div
                      onClick={() => navigate("/admin")}
                      style={{
                        padding: "10px 16px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      ⚙️ Trang Admin
                    </div>
                  )}

                  <div
                    onClick={handleLogout}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderTop: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    🚪 Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/dangky">
  <Button
    style={{
      width: "144px",
      height: "40px",
      borderRadius: "9999px",
      border: "1px solid #ffffff",
      backgroundColor: "transparent",
      color: "white",
      display: "flex",             
      alignItems: "center",         
      justifyContent: "center",   
      lineHeight: "normal", 
      position:"relative",
      left:"70px"        
    }}
  >
    Đăng ký
  </Button>
</Link>
              <Link to="/dangnhap">
  <Button
    style={{
      width: "144px",
      height: "40px",
      borderRadius: "9999px",
      border: "1px solid #b52208ff",
      background: "linear-gradient(90deg, #E30713, #FE6969)",
      color: "white",
      display: "flex",             
      alignItems: "center",        
      justifyContent: "center",     
      lineHeight: "normal",         
      position:"relative",
      left:"70px"
    }}
  >
    Đăng nhập
  </Button>
</Link>

            </>
          )}
        </div>

        {/* Nút menu mobile */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </header>

      {/* Menu mobile */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {Menu.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="menu-item"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "20px 0",
              fontSize: "18px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {item.title}
          </Link>
        ))}

        {user && isAdmin && (
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "20px 0",
              fontSize: "18px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            ⚙️ Trang Admin
          </Link>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {user ? (
            <Button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="mobile-btn"
              style={{
                width: "160px",
                height: "42px",
                borderRadius: "9999px",
                border: "1px solid #ffffff",
                backgroundColor: "transparent",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
            >
              Đăng xuất
            </Button>

          ) : (
            <>
              <Link to="/dangnhap">
  <Button
    style={{
      width: "126px",
      height: "40px",
      borderRadius: "9999px",
      border: "1px solid #b52208ff",
      background: "linear-gradient(90deg, #E30713, #FE6969)",
      color: "white",
      display: "flex",              // ✅ thêm
      alignItems: "center",         // ✅ căn giữa dọc
      justifyContent: "center",     // ✅ căn giữa ngang
      lineHeight: "normal",         // ✅ tránh text lệch
    }}
  >
    Đăng nhập
  </Button>
</Link>

              <Link to="/dangky">
  <Button
    style={{
      width: "126px",
      height: "40px",
      borderRadius: "9999px",
      border: "1px solid #ffffff",
      backgroundColor: "transparent",
      color: "white",
      display: "flex",              // ✅ thêm
      alignItems: "center",         // ✅ căn giữa dọc
      justifyContent: "center",     // ✅ căn giữa ngang
      lineHeight: "normal",         // ✅ tránh đẩy text lệch
    }}
  >
    Đăng ký
  </Button>
</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
