const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract head, nav, footer, scripts
const headMatch = indexHtml.match(/<!DOCTYPE html>[\s\S]*?<\/head>/);
const navMatch = indexHtml.match(/<body>[\s\S]*?(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)\s*<!-- HERO CAROUSEL -->/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const coursesBody = `
<!-- BREADCRUMB -->
<div class="container" style="margin-top: 32px;">
  <nav class="breadcrumbs" aria-label="BREADCRUMB" style="font-size: .85rem; display: flex; align-items: center; gap: 8px; color: var(--gray400);">
    <a href="index.html" style="color: var(--navy); font-weight: 500;">Trang chủ</a>
    <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; stroke: currentColor; fill: none;"><path d="M9 18l6-6-6-6"/></svg>
    <span style="color: var(--gray600);">Tất cả khóa học</span>
  </nav>
</div>

<!-- COURSE CATALOG HEADER -->
<section class="container" style="padding: 40px 24px;">
  <h1 style="font-size: 2.5rem; font-weight: 900; color: var(--navy); line-height: 1.2; margin-bottom: 16px;">Khám phá toàn bộ <br><em style="font-style: italic; color: var(--red);">Kho tàng Kiến thức</em></h1>
  <p style="font-size: 1rem; color: var(--gray600); max-width: 600px; line-height: 1.6;">Chọn lọc từ hơn 50+ khóa học chuyên sâu về E-Commerce, Digital Marketing và Ứng dụng AI từ các chuyên gia thực chiến hàng đầu.</p>
</section>

<!-- COURSE CATALOG GRID -->
<section class="courses" id="courses" style="padding-top: 20px; background: #fff;">
  <div class="container">
    <div class="cat-filter rv d1">
      <button class="cat-filter-btn active" onclick="filterCat(this)">Tất cả</button>
      <button class="cat-filter-btn" onclick="filterCat(this)">E-Commerce</button>
      <button class="cat-filter-btn" onclick="filterCat(this)">Quảng cáo</button>
      <button class="cat-filter-btn" onclick="filterCat(this)">Content</button>
      <button class="cat-filter-btn" onclick="filterCat(this)">Trí tuệ nhân tạo (AI)</button>
    </div>
    
    <div class="course-grid">
      <!-- Course 1 -->
      <a href="course-detail.html" class="course-card rv">
        <div class="course-thumb" style="background:linear-gradient(135deg,#1a0f55,#ED1C24)">
          <div class="course-thumb-ghost">AI</div>
          <div class="course-thumb-badge"><span class="blog-tag tag-r">Mới</span></div>
          <div class="course-play"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          <button class="quick-add" onclick="addToCart(event)">+ Thêm nhanh</button>
        </div>
        <div class="course-body">
          <div class="course-cat">Kỹ năng AI</div>
          <h3 class="course-title">Gen AI Studio: Ứng dụng AI vào Marketing thực chiến</h3>
          <div class="course-meta">
            <span class="course-rating">⭐ 4.9</span>
            <span>428 đánh giá</span>
            <span>1.800 học viên</span>
          </div>
          <div class="course-footer">
            <div class="course-instructor">
              <div class="course-instr-av">VN</div>
              Việt Nguyễn
            </div>
            <div class="course-price">
              <div class="course-price-old">3.590.000đ</div>
              <div class="course-price-new">1.990.000đ</div>
            </div>
          </div>
        </div>
      </a>
      
      <!-- Course 2 -->
      <div class="course-card rv d1">
        <div class="course-thumb" style="background:linear-gradient(135deg,#1a0f55,#F7941D)">
          <div class="course-thumb-ghost">ADS</div>
          <div class="course-thumb-badge"><span class="blog-tag tag-r">Bestseller</span></div>
          <div class="course-play"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          <button class="quick-add" onclick="addToCart(event)">+ Thêm nhanh</button>
        </div>
        <div class="course-body">
          <div class="course-cat">Quảng cáo</div>
          <h3 class="course-title">Facebook & TikTok Ads Master: Từ Zero Đến Scale 1 Tỷ/Tháng</h3>
          <div class="course-meta">
            <span class="course-rating">⭐ 4.9</span>
            <span>1.240 đánh giá</span>
            <span>4.820 học viên</span>
          </div>
          <div class="course-footer">
            <div class="course-instructor">
              <div class="course-instr-av">PN</div>
              Phúc Nguyễn
            </div>
            <div class="course-price">
              <div class="course-price-old">3.990.000đ</div>
              <div class="course-price-new">1.990.000đ</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Course 3 -->
      <div class="course-card rv d2">
        <div class="course-thumb" style="background:linear-gradient(135deg,#2d1f7a,#00A896)">
          <div class="course-thumb-ghost">ECOM</div>
          <div class="course-play"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          <button class="quick-add" onclick="addToCart(event)">+ Thêm nhanh</button>
        </div>
        <div class="course-body">
          <div class="course-cat">E-Commerce</div>
          <h3 class="course-title">Kinh doanh Shopee từ A-Z: Bán 1.000 Đơn/Ngày</h3>
          <div class="course-meta">
            <span class="course-rating">⭐ 4.8</span>
            <span>890 đánh giá</span>
            <span>3.450 học viên</span>
          </div>
          <div class="course-footer">
            <div class="course-instructor">
              <div class="course-instr-av">MT</div>
              Minh Trần
            </div>
            <div class="course-price">
              <div class="course-price-old">2.490.000đ</div>
              <div class="course-price-new">1.290.000đ</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    <div style="text-align: center; margin-top: 48px; padding-bottom: 80px;">
      <button style="padding: 12px 32px; border: 1.5px solid var(--gray200); border-radius: 8px; font-weight: 600; color: var(--navy); font-size: .95rem; cursor: pointer; transition: all 0.2s;">Tải thêm khóa học ↓</button>
    </div>
  </div>
</section>
`;

let coursesHtml = headMatch[0] + '\\n<body>\\n' + navMatch[1] + coursesBody + '\\n' + footerMatch[1];
coursesHtml = coursesHtml.replace('<title>META ECOM UNI — Nền Tảng Giáo Dục E-Commerce & Marketing Hàng Đầu Việt Nam</title>', '<title>Tất cả khóa học - META ECOM UNI</title>');

fs.writeFileSync('courses.html', coursesHtml);
console.log('Created courses.html');
