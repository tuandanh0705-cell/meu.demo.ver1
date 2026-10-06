const fs = require('fs');

const pagesToCreate = [
  { id: 'course-combo', title: 'Combo khóa học - META ECOM UNI', h1: 'Combo Khóa học Toàn diện', desc: 'Tiết kiệm lên tới 40% với các lộ trình học tập được thiết kế riêng biệt để giúp bạn master E-Commerce.' },
  { id: 'course-ai', title: 'Kỹ năng AI - META ECOM UNI', h1: 'Làm chủ Kỹ năng AI Thực chiến', desc: 'Sử dụng ChatGPT, Midjourney, Claude để x5 hiệu suất làm việc.' },
  { id: 'course-soft-skills', title: 'Kỹ năng Mềm - META ECOM UNI', h1: 'Phát triển Kỹ năng Mềm', desc: 'Giao tiếp, Quản lý thời gian, và Kỹ năng làm việc nhóm dành cho Marketer.' },
  { id: 'course-pro-skills', title: 'Kỹ năng Chuyên môn - META ECOM UNI', h1: 'Nâng cao Kỹ năng Chuyên môn', desc: 'Content, Ads, Analytics, Branding. Học từ các Case Study thực chiến nhất.' },
  { id: 'course-custom', title: 'Tạo bộ khóa học - META ECOM UNI', h1: 'Thiết kế Lộ trình học riêng', desc: 'Lựa chọn các kỹ năng bạn muốn bổ sung và tự thiết kế combo khóa học riêng với ưu đãi tốt nhất.' },
  { id: 'blog', title: 'Blog & Kiến thức - META ECOM UNI', h1: 'Blog E-Commerce & Marketing', desc: 'Cập nhật kiến thức chuyên sâu, xu hướng thị trường và tips tối ưu chuyển đổi mỗi tuần.' },
  { id: 'webinar', title: 'Webinar Miễn phí - META ECOM UNI', h1: 'Thư viện Webinar Chất lượng', desc: 'Xem lại các buổi chia sẻ từ chuyên gia hoặc đăng ký các sự kiện trực tuyến sắp tới hoàn toàn miễn phí.' },
  { id: 'ebook', title: 'E-book & Template - META ECOM UNI', h1: 'Thư viện Tài liệu Độc quyền', desc: 'Tải miễn phí các bộ Template quản lý dự án, Prompt AI và E-book chiến lược E-Commerce.' },
  { id: 'community', title: 'Cộng đồng - META ECOM UNI', h1: 'Cộng đồng META ECOM UNI', desc: 'Tham gia mạng lưới 20.000+ nhà quảng cáo và chủ shop. Nơi chia sẻ kinh nghiệm và tuyển dụng.' },
  { id: 'contact', title: 'Liên hệ - META ECOM UNI', h1: 'Liên hệ với Chúng tôi', desc: 'Đội ngũ hỗ trợ của META ECOM UNI luôn sẵn sàng giải đáp thắc mắc của bạn 24/7.' },
  { id: 'about', title: 'Về chúng tôi - META ECOM UNI', h1: 'Câu chuyện META ECOM UNI', desc: 'Hành trình kiến tạo bệ phóng nhân sự E-Commerce chất lượng cao lớn nhất Việt Nam.' },
  { id: 'login', title: 'Đăng nhập - META ECOM UNI', h1: 'Đăng nhập Hệ thống', desc: 'Tiếp tục lộ trình học tập của bạn cùng META ECOM UNI.' },
  { id: 'signup', title: 'Đăng ký - META ECOM UNI', h1: 'Đăng ký Tài khoản', desc: 'Bắt đầu hành trình chinh phục E-Commerce bằng cách tạo tài khoản miễn phí.' }
];

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Update ALL nav links in index.html first to create a master version
const replacements = [
  ['href="#" class="drop-text-link">Combo khóa học', 'href="course-combo.html" class="drop-text-link">Combo khóa học'],
  ['href="#" class="drop-text-link">Kỹ năng AI', 'href="course-ai.html" class="drop-text-link">Kỹ năng AI'],
  ['href="#" class="drop-text-link">Kỹ năng mềm', 'href="course-soft-skills.html" class="drop-text-link">Kỹ năng mềm'],
  ['href="#" class="drop-text-link">Kỹ năng chuyên môn', 'href="course-pro-skills.html" class="drop-text-link">Kỹ năng chuyên môn'],
  ['href="#" class="drop-text-link special">+ Tạo bộ khóa học', 'href="course-custom.html" class="drop-text-link special">+ Tạo bộ khóa học'],
  ['href="#" class="drop-item"\\s*>\\s*<div class="drop-icon">[\\s\\S]*?<div class="drop-label">Blog & Kiến thức', 'href="blog.html" class="drop-item">\\n                <div class="drop-icon"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></div>\\n                <div><div class="drop-label">Blog & Kiến thức'],
  ['href="#" class="drop-item"\\s*>\\s*<div class="drop-icon">[\\s\\S]*?<div class="drop-label">Webinar miễn phí', 'href="webinar.html" class="drop-item">\\n                <div class="drop-icon"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></div>\\n                <div><div class="drop-label">Webinar miễn phí'],
  ['href="#" class="drop-item"\\s*>\\s*<div class="drop-icon">[\\s\\S]*?<div class="drop-label">E-book & Template', 'href="ebook.html" class="drop-item">\\n                <div class="drop-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>\\n                <div><div class="drop-label">E-book & Template'],
  ['href="#" class="drop-item"\\s*>\\s*<div class="drop-icon">[\\s\\S]*?<div class="drop-label">Cộng đồng', 'href="community.html" class="drop-item">\\n                <div class="drop-icon"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>\\n                <div><div class="drop-label">Cộng đồng'],
  ['href="#" class="nav-link">Liên hệ', 'href="contact.html" class="nav-link">Liên hệ'],
  ['href="#" class="nav-link">Về chúng tôi', 'href="about.html" class="nav-link">Về chúng tôi'],
  ['href="#" class="nav-btn-login">Đăng nhập', 'href="login.html" class="nav-btn-login">Đăng nhập'],
  ['href="#" class="nav-btn-enroll">Đăng ký khóa học', 'href="signup.html" class="nav-btn-enroll">Đăng ký khóa học'],
  
  // Mobile Nav replacements
  ['class="m-link" href="#">Khóa học', 'class="m-link" href="courses.html">Khóa học'],
  ['class="m-link-sub" href="#">E-Commerce Toàn Diện', 'class="m-link-sub" href="courses.html">E-Commerce Toàn Diện'],
  ['class="m-link-sub" href="#">Facebook & TikTok Ads', 'class="m-link-sub" href="course-pro-skills.html">Facebook & TikTok Ads'],
  ['class="m-link-sub" href="#">Content Marketing', 'class="m-link-sub" href="course-pro-skills.html">Content Marketing'],
  ['class="m-link-sub" href="#">Brand Building', 'class="m-link-sub" href="course-pro-skills.html">Brand Building'],
  ['class="m-link" href="#">Thư viện', 'class="m-link" href="blog.html">Thư viện'],
  ['class="m-link" href="#">Liên hệ', 'class="m-link" href="contact.html">Liên hệ'],
  ['class="m-link" href="#">Về chúng tôi', 'class="m-link" href="about.html">Về chúng tôi'],
  ['href="#" style="display:flex;align-items:center;justify-content:center;padding:12px;border:1.5px solid var(--gray200);border-radius:6px;font-weight:600;color:var(--navy);font-size:.9rem">Đăng nhập', 'href="login.html" style="display:flex;align-items:center;justify-content:center;padding:12px;border:1.5px solid var(--gray200);border-radius:6px;font-weight:600;color:var(--navy);font-size:.9rem">Đăng nhập'],
  ['href="#" style="display:flex;align-items:center;justify-content:center;padding:12px;background:var(--red);border-radius:6px;font-weight:700;color:#fff;font-size:.9rem">Đăng ký khóa học', 'href="signup.html" style="display:flex;align-items:center;justify-content:center;padding:12px;background:var(--red);border-radius:6px;font-weight:700;color:#fff;font-size:.9rem">Đăng ký khóa học']
];

let updatedIndex = indexHtml;
replacements.forEach(([search, replace]) => {
  const regex = new RegExp(search, 'g');
  updatedIndex = updatedIndex.replace(regex, replace);
});

// Update the physical files
fs.writeFileSync('index.html', updatedIndex);
if(fs.existsSync('course-detail.html')) {
  let cd = fs.readFileSync('course-detail.html', 'utf8');
  replacements.forEach(([search, replace]) => { cd = cd.replace(new RegExp(search, 'g'), replace); });
  fs.writeFileSync('course-detail.html', cd);
}
if(fs.existsSync('courses.html')) {
  let c = fs.readFileSync('courses.html', 'utf8');
  replacements.forEach(([search, replace]) => { c = c.replace(new RegExp(search, 'g'), replace); });
  fs.writeFileSync('courses.html', c);
}

// Extract base structures from the updated index
const headMatch = updatedIndex.match(/<!DOCTYPE html>[\s\S]*?<\/head>/);
const navMatch = updatedIndex.match(/<body>[\s\S]*?(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)\s*<!-- HERO CAROUSEL -->/);
const footerMatch = updatedIndex.match(/(<footer>[\s\S]*?<\/html>)/);

pagesToCreate.forEach(page => {
  const bodyContent = `
<!-- BREADCRUMB -->
<div class="container" style="margin-top: 32px;">
  <nav class="breadcrumbs" aria-label="BREADCRUMB" style="font-size: .85rem; display: flex; align-items: center; gap: 8px; color: var(--gray400);">
    <a href="index.html" style="color: var(--navy); font-weight: 500;">Trang chủ</a>
    <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor; fill: none;"><path d="M9 18l6-6-6-6"/></svg>
    <span style="color: var(--gray600);">${page.h1}</span>
  </nav>
</div>

<!-- GENERIC PAGE HEADER -->
<section class="container" style="padding: 60px 24px 100px; text-align: center; min-height: 50vh;">
  <div style="display:inline-flex;align-items:center;gap:6px;background:var(--orange);color:#fff;font-size:.72rem;font-weight:700;padding:5px 14px;border-radius:4px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:20px;">Trang đang cập nhật</div>
  <h1 style="font-size: 3rem; font-weight: 900; color: var(--navy); line-height: 1.2; margin-bottom: 20px;">${page.h1}</h1>
  <p style="font-size: 1.1rem; color: var(--gray600); max-width: 600px; line-height: 1.6; margin: 0 auto 40px;">${page.desc}</p>
  
  <div style="background: var(--cream); border: 2px dashed var(--gray200); border-radius: 16px; padding: 40px; max-width: 800px; margin: 0 auto;">
    <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke: var(--gray400); fill: none; stroke-width: 1.5; margin-bottom: 16px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--navy); margin-bottom: 8px;">Nội dung đang được hoàn thiện</h3>
    <p style="color: var(--gray600); font-size: .9rem;">Tính năng này thuộc Giai đoạn 2 của dự án. Chúng tôi đang nhanh chóng cập nhật nội dung để mang lại trải nghiệm tốt nhất.</p>
    <a href="index.html" style="display: inline-block; margin-top: 24px; padding: 10px 24px; background: var(--navy); color: #fff; border-radius: 6px; font-weight: 600; font-size: .9rem;">Về Trang Chủ</a>
  </div>
</section>
`;

  let html = headMatch[0] + '\n<body>\n' + navMatch[1] + bodyContent + '\n' + footerMatch[1];
  html = html.replace('<title>META ECOM UNI — Nền Tảng Giáo Dục E-Commerce & Marketing Hàng Đầu Việt Nam</title>', `<title>${page.title}</title>`);
  
  fs.writeFileSync(`${page.id}.html`, html);
  console.log(`Generated ${page.id}.html`);
});
