import React from 'react';
import PromotionCard from "../components/promotion/PromotionCard";
import './PromotionPage.css';

const promotionsData = [
  { id: 1,image: 'https://files.catbox.moe/9rjero.png' },
  { id: 2,image: 'https://files.catbox.moe/3u7n8h.png' },
  { id: 3,image: 'https://files.catbox.moe/7cocpw.png' }, 
  { id: 4,image: 'https://files.catbox.moe/rj5pg3.png' }, 
  { id: 5,image: 'https://files.catbox.moe/pnfw4o.png' },
  { id: 6,image: 'https://files.catbox.moe/ejfw9j.png' }, 
  { id: 7,image: 'https://files.catbox.moe/aw0u3n.png' }, 
  { id: 8,image: 'https://files.catbox.moe/48rosx.png' },
];

const PromotionPage = () => {
  return ( 
    <div className="promotion-page-background">
      <div className="promotion-page-container">
        <h1 className="page-title">Khuyến mãi</h1>
        <div className="promotion-grid">
          {promotionsData.map(promo => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn">Quay lại</button>
          <button className="pagination-btn">Tiếp theo</button>
        </div>
      </div>
    </div>
  );
};

export default PromotionPage;