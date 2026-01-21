import React from 'react';
import { Link } from 'react-router-dom';
import './FestivalPage.css';

const festivalPosts = [
{
id: 1,
title: 'Liên hoan phim Châu Á tại Trung tâm chiếu phim quốc gia',
date: '31/10/2024',
fullDate: '14:57 12/11/2024', // Thêm trường này để khớp định dạng mẫu
excerpt: 'Liên hoan phim Châu Á (AWFF) sẽ trở lại Trung tâm Chiếu phim Quốc gia từ ngày 14 - 27.11.2024...',
image: 'https://files.catbox.moe/50w342.png', // Link ảnh mẫu (Sẽ được thay bằng ảnh trong mẫu nếu có)
},
{
id: 2,
title: 'LIÊN HOAN PHIM QUỐC TẾ HÀ NỘI LẦN THỨ VI (HANIF VI)',
date: '16/10/2024',
fullDate: '09:23 06/11/2024', // Thêm trường này để khớp định dạng mẫu
excerpt: 'Liên hoan Phim Quốc tế Hà Nội lần thứ VI (HANIFF VI) là sự kiện văn hóa quy tụ các tác phẩm điện ảnh...',
image: 'https://files.catbox.moe/r43smg.jpg', // Link ảnh mẫu (Sẽ được thay bằng ảnh trong mẫu nếu có)
},
{
id: 3,
title: 'HỘI THẢO CHO ĐẠO DIỄN TRẺ VÀ DIỄN VIÊN',
date: '15/10/2024',
fullDate: '10:00 05/11/2024',
excerpt: 'Trong khuôn khổ Liên hoan Phim Quốc tế Hà Nội lần thứ VI, sáng ngày 10/11, Hội thảo với chủ đề...',
image: 'https://files.catbox.moe/k9dso5.jpg',
},
{
id: 4,
title: 'Liên hoan phim Đức KinoFest tại Hà Nội',
date: '08/10/2024',
fullDate: '11:30 04/11/2024',
excerpt: 'Liên hoan phim Đức tại Việt Nam KinoFest 2024 sẽ trở lại, mang đến những tác phẩm điện ảnh Đức...',
image: 'https://files.catbox.moe/b0kexk.jpg',
},
];

// --- COMPONENT CON: BANNER ---
const FestivalBanner = () => (
<div className="festival-banner-wrapper">
<div className="festival-banner-content">
</div>
</div>
);

// --- COMPONENT CON: THẺ BÀI VIẾT ---
const FestivalCard = ({ post }) => (
<div className="festival-card">
<Link to={`/tin-tuc/${post.id}`} className="card-image-wrapper">
<img src={post.image} alt={post.title} className="card-image" />
</Link>
<div className="card-content">
<div className="card-header"> {/* Thêm div để nhóm title và date */}
<h3 className="card-title">
<Link to={`/tin-tuc/${post.id}`}>{post.title}</Link>
</h3>
<span className="card-date-full">{post.fullDate}</span> {/* Dùng fullDate và style mới */}
</div>
<p className="card-excerpt">{post.excerpt}</p>
{/* Đã xóa Link "Xem thêm" */}
</div>
</div>
);

// --- COMPONENT CHÍNH CỦA TRANG ---
const FestivalPage = () => {
return (
<div className="festival-page-wrapper">
{/* 1. Banner lớn ở trên cùng */}
<FestivalBanner />

{/* 2. Danh sách các bài viết */}
<div className="festival-list-container">
{festivalPosts.map(post => (
<FestivalCard key={post.id} post={post} />
))}
</div>
</div>
);
};

export default FestivalPage;