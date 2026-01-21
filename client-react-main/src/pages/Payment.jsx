import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import './Payment.css';

// --- Dữ liệu tĩnh, đưa ra ngoài component để tối ưu hiệu suất ---
const paymentMethods = [
  { id: 'vietqr', name: 'VietQR', logo: 'https://www.vietqr.io/img/vietqr%20api%20-%20payment%20kit.png' },
  { id: 'vnpay', name: 'VNPAY', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-VNPAY-QR-1-300x96.png' },
  { id: 'viettel', name: 'Viettel Money', logo: 'https://chienphan.com/wp-content/uploads/2023/12/Mo-tk-Viettel-Money.webp' },
  { id: 'payoo', name: 'Payoo', logo: 'https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-Payoo.png' }
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movieData;

  const [selectedPayment, setSelectedPayment] = useState('vietqr');

  if (!movie) {
    return (
      <div className="payment-page">
        <main className="payment-main" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
          <h2>Vui lòng chọn phim trước.</h2>
          <Link to="/" className="btn-payment" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>
            Quay về Trang Chủ
          </Link>
        </main>
      </div>
    );
  }

  const bookingInfo = {
    movieTitle: `${movie.title} - Phụ đề`,
    showtime: "21:25 - 14/11/2024",
    format: "2D",
    room: "12",
    seats: [{ name: "B1", price: 80000 }, { name: "B2", price: 80000 }]
  };

  const totalSeatsPrice = bookingInfo.seats.reduce((sum, seat) => sum + seat.price, 0);
  const totalAmount = totalSeatsPrice;
  
  const handlePayment = () => {
    navigate('/payment-success');
  };
  
  const handleBack = () => navigate(-1);

  return (
    <div className="payment-page">
      <main className="payment-main">
        <div className="payment-container">
          <div className="payment-content">

            {/* === CỘT TRÁI: Chứa 2 box thông tin === */}
            <div className="payment-left">
              {/* Box 1: Thông tin phim */}
              <section className="payment-section">
                <div className="section-title">Thông tin phim</div>
                <div className="movie-info-box">
                  <div className="info-item">
                    <span className="info-label">Phim</span>
                    <span className="info-value">{bookingInfo.movieTitle}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ghế</span>
                    <span className="info-value">{bookingInfo.seats.map(seat => seat.name).join(', ')}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Ngày giờ chiếu</span>
                    <span className="info-value">{bookingInfo.showtime}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phòng chiếu</span>
                    <span className="info-value">{bookingInfo.room}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Định dạng</span>
                    <span className="info-value">{bookingInfo.format}</span>
                  </div>
                </div>
              </section>

              {/* Box 2: Thông tin thanh toán */}
              <section className="payment-section">
                <div className="section-title">Thông tin thanh toán</div>
                <div className="payment-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Danh mục</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ghế ({bookingInfo.seats.map(s => s.name).join(', ')})</td>
                        <td>{bookingInfo.seats.length}</td>
                        <td>{totalSeatsPrice.toLocaleString()}đ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* === CỘT PHẢI: Chứa 1 box duy nhất cho tất cả === */}
            <div className="payment-right">
              <section className="payment-section">
                <div className="section-title">Phương thức thanh toán</div>
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className={`payment-method-card ${selectedPayment === method.id ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value={method.id} checked={selectedPayment === method.id} onChange={(e) => setSelectedPayment(e.target.value)} />
                      <span className="custom-radio"></span>
                      <div className="payment-method-content">
                        <img src={method.logo} alt={method.name} className="payment-logo" />
                        <span className="payment-name">{method.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <section className="payment-section">
                <div className="section-title">Chi phí</div>
                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Thành tiền</span>
                    <span>{totalSeatsPrice.toLocaleString()}đ</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí</span>
                    <span>0đ</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span className="total-amount">{totalAmount.toLocaleString()}đ</span>
                  </div>
                </div>
              </section>

              <div className="payment-buttons">
                <button className="btn-payment" onClick={handlePayment}>Thanh toán</button>
                <button className="btn-back" onClick={handleBack}>Quay lại</button>
              </div>

              <p className="payment-note">
                <strong>Lưu ý:</strong> Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;