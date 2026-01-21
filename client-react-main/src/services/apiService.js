import axios from 'axios';

const API_BASE_URL = 'http://localhost:6789/api/v1'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// PHIM ĐANG CHIẾU
export const getNowShowingMovies = async () => {
  try {
    const response = await apiClient.get('/movies/now-showing'); 
    return response.data; 
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu phim đang chiếu:', error);
    throw error;
  }
};

// PHIM SẮP CHIẾU
export const getComingSoonMovies = async () => {
  try {
    const response = await apiClient.get('/movies/coming-soon'); 
    return response.data; 
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu phim sắp chiếu:', error);
    throw error;
  }
};

// KHUYẾN MÃI 
export const getPromotions = async () => {
  try {
    const response = await apiClient.get('/promotions'); 
    return response.data; 
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu khuyến mãi:', error);
    throw error;
  }
};
// Gửi yêu cầu quên mật khẩu
export const forgotPassword = async (email) => {
    try {
        return await apiClient.post("/auth/forgot-password", { email });
    } catch (error) {
        throw error;
    }
};

// Xác nhận đặt lại mật khẩu
export const resetPassword = async ({ token, newPassword }) => {
  try {
    return await apiClient.post(
      `/auth/reset-password?token=${token}`,
      { newPassword }
    );
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {

    const response = await apiClient.get('/events'); 
    return response.data; 
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu sự kiện:', error);
    throw error;
  }
};

// === [MỚI] BANNER TRANG CHỦ ===
export const getBanners = async () => {
  try {
    const response = await apiClient.get('/banners'); 
    return response.data; 
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu banner:', error);
    return []; 
  }
};