import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import './Success.css';

const Success = () => {
  return (
    <div className="success-page-wrapper">
      <Header />
      <main className="success-main-content">
        <div className="success-content">
          <div className="success-icon">
            <img src="https://files.catbox.moe/51uljp.svg" alt="Success Star" className="star-svg-icon" />             
          </div>
          <h1 className="success-title">Đặt vé thành công!</h1>
          <p className="success-note">
            <strong>Lưu ý:</strong> Hãy đến đúng giờ của suất chiếu và tận hưởng bộ phim.
          </p>
          <Link to="/" className="success-home-button">
            Về trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Success;