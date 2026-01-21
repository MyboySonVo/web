import React from 'react';
import './PromotionCard.css';

const PromotionCard = ({ promotion }) => {
  return (
    <div className="promo-card">
      <div className="promo-image-wrapper">
        <img src={promotion.image} alt={promotion.title} className="promo-image" />
        {promotion.date && <div className="promo-date-overlay">{promotion.date}</div>}
      </div>
      <div className="promo-content">
        <h3 className="promo-title">{promotion.title}</h3>
      </div>
    </div>
  );
};

export default PromotionCard;