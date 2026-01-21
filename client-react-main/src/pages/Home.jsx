import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/movie/HeroSlider';
import MovieGrid from '../components/movie/MovieGrid';
import PromoBanner from '../components/PromoBanner/PromoBanner';
import './Home.css';
// 1. Đảm bảo đã import getBanners
import { getNowShowingMovies, getComingSoonMovies, getPromotions, getEvents, getBanners } from '../services/apiService';

import Header from '../layouts/Header'; 
import Footer from '../layouts/Footer';

const Home = () => {
  // === STATE CHO BANNER (MỚI) ===
  const [banners, setBanners] = useState([]);

  // === STATE CHO PHIM ĐANG CHIẾU ===
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [isNowShowingLoading, setIsNowShowingLoading] = useState(true);
  const [nowShowingError, setNowShowingError] = useState(null);

  // === STATE CHO PHIM SẮP CHIẾU ===
  const [specialMovies, setSpecialMovies] = useState([]);
  const [isSpecialLoading, setIsSpecialLoading] = useState(true);
  const [specialError, setSpecialError] = useState(null);

  // === STATE RIÊNG CHO KHUYẾN MÃI ===
  const [promotions, setPromotions] = useState([]);
  const [isPromoLoading, setIsPromoLoading] = useState(true);

  // === STATE RIÊNG CHO SỰ KIỆN ===
  const [events, setEvents] = useState([]);
  const [isEventLoading, setIsEventLoading] = useState(true);

  // === useEffect: Lấy Banner ===
  useEffect(() => {
    const fetchBanners = async () => {
      const data = await getBanners();
      if (data && data.length > 0) {
        console.log("✅ [Home] Đã tải banners:", data);
        setBanners(data);
      } else {
        console.warn("⚠️ [Home] Không có banner nào.");
      }
    };
    fetchBanners();
  }, []);

  // === useEffect: Phim Đang Chiếu ===
  useEffect(() => {
    const fetchNowShowing = async () => {
      try {
        setIsNowShowingLoading(true);
        const data = await getNowShowingMovies();
        setNowShowingMovies(data);
        setNowShowingError(null);
      } catch (err) {
        setNowShowingError('Không thể tải danh sách phim đang chiếu.');
      } finally {
        setIsNowShowingLoading(false);
      }
    };
    fetchNowShowing();
  }, []);

  // === useEffect: Phim Sắp Chiếu ===
  useEffect(() => {
    const fetchSpecialMovies = async () => {
      try {
        setIsSpecialLoading(true);
        const data = await getComingSoonMovies();
        setSpecialMovies(data);
        setSpecialError(null);
      } catch (err) {
        setSpecialError('Không thể tải danh sách phim sắp chiếu.');
      } finally {
        setIsSpecialLoading(false);
      }
    };
    fetchSpecialMovies();
  }, []);

  // === useEffect: Khuyến Mãi ===
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setIsPromoLoading(true);
        const data = await getPromotions();
        setPromotions(data);
      } catch (err) {
        console.error("Lỗi tải khuyến mãi:", err); 
      } finally {
        setIsPromoLoading(false);
      }
    };
    fetchPromos();
  }, []);

  // === useEffect: Sự Kiện ===
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsEventLoading(true); 
        const data = await getEvents();
        setEvents(data || []); 
      } catch (err) {
        console.error("Lỗi tải sự kiện:", err); 
      } finally {
        setIsEventLoading(false); 
      }
    };
    fetchEvents();
  }, []);


  return (
    <div className="home-page">
      {/* Đừng quên Header nếu bạn muốn hiển thị nó */}
      <Header /> 

      <main className="home-main">
        
        {/* 2. SỬA LẠI DÒNG NÀY: Truyền state banners vào */}
        <HeroSlider banners={banners} />      

        {/* === KHU VỰC PHIM ĐANG CHIẾU === */}
        <section className="combined-section">
          <div className="combined-container">
            <div className="two-columns"> 
              <div className="main-content">
                {isNowShowingLoading ? (
                  <div>Đang tải phim...</div>
                ) : nowShowingError ? (
                  <div style={{ color: 'red' }}>{nowShowingError}</div>
                ) : (
                  <MovieGrid 
                    title="Phim đang chiếu"
                    movies={nowShowingMovies}
                    columns={4}
                    showRating={true}
                  />
                )}
              </div>
              
              <aside className="sidebar-content">
                <PromoBanner 
                    promotions={promotions}
                    events={events}
                    isEventLoading={isEventLoading} 
                />
              </aside>
            </div>
          </div>
        </section>
        
        {/* === KHU VỰC PHIM SẮP CHIẾU === */}
        <section className="combined-section">
          <div className="combined-container">
            <div className="two-columns">
              <div className="main-content">
                {isSpecialLoading ? (
                  <div>Đang tải phim...</div>
                ) : specialError ? (
                  <div style={{ color: 'red' }}>{specialError}</div>
                ) : (
                  <MovieGrid 
                    title="Phim sắp chiếu"
                    movies={specialMovies}
                    columns={4}
                    cardSize="small"
                    showRating={false}
                  />
                )}
              </div>
              <aside className="sidebar-content">
              </aside>
            </div>
          </div>
        </section>
      </main>
    
      {/* Đừng quên Footer nếu bạn muốn hiển thị nó */}
      <Footer />
    </div>
  );
};

export default Home;