import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PromoBanner.css';

const PromoBanner = ({ promotions, events }) => {
  return (
    <div className="sidebar-container">

      {/* Promotions Section */}
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Khuyến mãi</h3>
          <Link to="/khuyen-mai" className="sidebar-view-all">
            Xem tất cả <ChevronRight size={0}/>
          </Link>
        </div>
        <div className="sidebar-list promo-list">
          {promotions.map((promo) => (
            <Link to="/khuyen-mai" key={promo.id} className="sidebar-card">
              <img src={promo.image} alt="Khuyến mãi" className="sidebar-promo-image" />
            </Link>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="sidebar-section">
        <div className="sidebar-header">
          <h3 className="sidebar-title">Sự kiện</h3>
          <Link to="/events" className="sidebar-view-all">
            Xem tất cả <ChevronRight size={0}/>
          </Link>
        </div>
        <div className="sidebar-list event-list">
          {events.map((event) => (
            <Link to="/events" key={event.id} className="sidebar-card">
             <img
                src={event.image} alt="Sự kiện" className="sidebar-event-image"
                style={{ aspectRatio: event.aspectRatio || '16/9' }} // Dùng aspectRatio từ data, nếu không có thì mặc định 16/9
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;