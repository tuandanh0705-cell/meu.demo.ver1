const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const headMatch = indexHtml.match(/<!DOCTYPE html>[\s\S]*?(<nav class="navbar" id="navbar">[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)/);
const footerMatch = indexHtml.match(/(<footer>[\s\S]*?<\/html>)/);

if (!headMatch || !footerMatch) {
  console.log("Could not find layout structure");
  process.exit(1);
}

const customCss = `
<style>
/* SKILLSBRIDGE HOMEPAGE CLONE CSS */
:root {
  --sb-blue: #2d3192;
  --sb-teal: #14b8a6;
  --sb-teal-light: #f0fdfa;
  --sb-orange: #ea580c;
  --sb-orange-grad: linear-gradient(135deg, #f59e0b, #ea580c);
  --sb-purple-grad: linear-gradient(135deg, #8b5cf6, #3b82f6);
  --sb-slate: #0f172a;
  --sb-gray-bg: #f8fafc;
}

body {
  font-family: 'Inter', 'Roboto', sans-serif;
  color: #334155;
  background: #fff;
  line-height: 1.6;
}

.sb-hero {
  padding: 80px 0 100px;
  background: #fafafa;
  overflow: hidden;
}
.sb-hero-inner {
  display: flex;
  align-items: center;
  gap: 40px;
}
.sb-hero-left {
  flex: 1;
}
.sb-hero-badge {
  display: inline-block;
  padding: 6px 16px;
  background: var(--sb-teal-light);
  color: var(--sb-teal);
  font-weight: 700;
  font-size: 13px;
  border-radius: 9999px;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
}
.sb-hero-title {
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--sb-slate);
  margin-bottom: 24px;
  letter-spacing: -0.03em;
}
.sb-hero-title span {
  background: var(--sb-purple-grad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.sb-hero-desc {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 40px;
  max-width: 540px;
  font-weight: 400;
}
.sb-hero-desc strong {
  color: #8b5cf6;
}
.sb-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  background: var(--sb-orange-grad);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 9999px;
  transition: all 0.3s;
  box-shadow: 0 10px 25px rgba(234, 88, 12, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.sb-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(234, 88, 12, 0.35);
}
.sb-hero-right {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
}
.sb-hero-mesh {
  width: 100%;
  max-width: 500px;
  border-radius: 30px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}

/* Kien tao he sinh thai */
.sb-eco {
  padding: 100px 0;
  background: #f8fafc;
}
.sb-eco-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--sb-slate);
  margin-bottom: 60px;
}
.sb-eco-title em {
  font-style: italic;
  font-weight: 400;
}
.sb-eco-grid {
  display: grid;
  grid-template-columns: 1.2fr 1.5fr 1fr;
  gap: 30px;
  align-items: center;
}
.sb-eco-left {
  padding-right: 20px;
}
.sb-eco-p {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}
.sb-eco-stat {
  margin-top: 40px;
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
}
.sb-eco-stat-num {
  font-size: 3rem;
  font-weight: 900;
  color: var(--sb-slate);
  line-height: 1;
  margin-bottom: 10px;
}
.sb-eco-stat-lbl {
  font-size: 13px;
  color: #64748b;
}
.sb-eco-mid {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  height: 400px;
}
.sb-eco-mid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sb-eco-right {
  background: #fff;
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sb-eco-right-icon {
  width: 48px;
  height: 48px;
  background: var(--sb-teal-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.sb-eco-right-icon svg {
  width: 24px;
  height: 24px;
  stroke: var(--sb-teal);
  fill: none;
}
.sb-eco-right-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--sb-slate);
  margin-bottom: 16px;
}
.sb-eco-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}
.sb-eco-item {
  font-size: 14px;
  color: #64748b;
}
.sb-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border: 1.5px solid var(--sb-teal);
  color: var(--sb-teal);
  font-weight: 600;
  font-size: 14px;
  border-radius: 9999px;
  transition: all 0.2s;
}
.sb-btn-outline:hover {
  background: var(--sb-teal);
  color: #fff;
}

/* Trust Stats */
.sb-stats {
  padding: 80px 0;
  background: #fff;
}
.sb-stats-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 50px;
}
.sb-stats-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--sb-slate);
  margin-bottom: 16px;
}
.sb-stats-desc {
  font-size: 14px;
  color: #64748b;
}
.sb-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.sb-stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px 24px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.sb-stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
  border-color: var(--sb-teal);
}
.sb-stat-icon {
  width: 40px;
  height: 40px;
  background: var(--sb-teal-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.sb-stat-icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--sb-teal);
  fill: none;
}
.sb-stat-val {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--sb-slate);
  margin-bottom: 8px;
  line-height: 1;
}
.sb-stat-lbl {
  font-size: 14px;
  font-weight: 700;
  color: var(--sb-slate);
  margin-bottom: 8px;
}
.sb-stat-sub {
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.5;
}

/* Partner Logos */
.sb-partners {
  padding: 0 0 100px;
  background: #fff;
}
.sb-partners-title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--sb-slate);
  margin-bottom: 40px;
}
.sb-logos-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.sb-logo-cell {
  background: #fff;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
  color: #cbd5e1;
  transition: all 0.3s;
}
.sb-logo-cell:hover {
  color: var(--sb-slate);
  background: #f8fafc;
}

@media(max-width: 992px) {
  .sb-hero-inner { flex-direction: column; text-align: center; }
  .sb-hero-desc { margin: 0 auto 40px; }
  .sb-eco-grid { grid-template-columns: 1fr; }
  .sb-eco-left { padding: 0; text-align: center; }
  .sb-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .sb-logos-grid { grid-template-columns: repeat(3, 1fr); }
}
@media(max-width: 576px) {
  .sb-stats-grid { grid-template-columns: 1fr; }
  .sb-logos-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
`;

const newBody = `
${customCss}

<!-- HERO SECTION -->
<section class="sb-hero">
  <div class="container sb-hero-inner">
    <div class="sb-hero-left">
      <div class="sb-hero-badge">KHÓA HỌC</div>
      <h1 class="sb-hero-title"><span>Gen AI Studio</span></h1>
      <p class="sb-hero-desc"><strong>X5 Số lượng hình ảnh, video</strong> mà không tăng thêm chi phí và nguồn lực. Chuyển đổi toàn diện phương pháp làm Marketing với các công cụ Trí tuệ nhân tạo hàng đầu.</p>
      <a href="course-detail.html" class="sb-btn-primary">Đăng ký ngay</a>
    </div>
    <div class="sb-hero-right">
      <div class="sb-hero-mesh" style="background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%); height: 400px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
        <div style="font-size: 80px; position: absolute; animation: floatY 4s ease-in-out infinite;">🤖</div>
        <div style="font-size: 60px; position: absolute; top: 50px; left: 50px; animation: floatY 5s ease-in-out infinite reverse;">✨</div>
        <div style="font-size: 70px; position: absolute; bottom: 60px; right: 50px; animation: floatY 6s ease-in-out infinite;">📈</div>
        <div style="position: absolute; width: 150%; height: 150%; background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%);"></div>
      </div>
    </div>
  </div>
</section>

<!-- KIẾN TẠO HỆ SINH THÁI -->
<section class="sb-eco">
  <div class="container">
    <h2 class="sb-eco-title">Kiến tạo hệ sinh thái <em>chuyển đổi vững chắc</em></h2>
    
    <div class="sb-eco-grid">
      <div class="sb-eco-left">
        <p class="sb-eco-p">Skills Bridge thiết lập một hệ sinh thái năng động, là điểm tựa vững chắc cho cá nhân và doanh nghiệp trên hành trình chuyển đổi số.</p>
        <p class="sb-eco-p">Kết quả mang lại không chỉ dừng lại ở hiệu suất hoạt động được tối ưu, mà còn là sự kết nối nhịp nhàng cùng nguồn nhân sự linh hoạt.</p>
        
        <div class="sb-eco-stat">
          <div class="sb-eco-stat-num">200+</div>
          <div class="sb-eco-stat-lbl">Dự án & Chiến dịch thực thi thành công</div>
        </div>
      </div>
      
      <div class="sb-eco-mid">
        <div style="width: 100%; height: 100%; background: url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover;"></div>
      </div>
      
      <div class="sb-eco-right">
        <div class="sb-eco-right-icon">
          <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
        <div class="sb-eco-right-title">Dịch vụ của Chúng tôi</div>
        <div class="sb-eco-list">
          <div class="sb-eco-item">Đào tạo Cá nhân</div>
          <div class="sb-eco-item">Đào tạo Doanh nghiệp</div>
          <div class="sb-eco-item">Tư vấn Tự động hóa</div>
          <div class="sb-eco-item">Tư vấn Digital Marketing</div>
        </div>
        <a href="courses.html" class="sb-btn-outline">
          Kết nối với chuyên gia
          <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="sb-stats">
  <div class="container">
    <div class="sb-stats-header">
      <h2 class="sb-stats-title">Được tin tưởng bởi nhiều chuyên gia, lãnh đạo, và doanh nghiệp hàng đầu</h2>
      <p class="sb-stats-desc">Không chỉ cung cấp giải pháp, chúng tôi khẳng định năng lực thông qua những thành tựu thực tế, giúp khách hàng tự tin kiến tạo sự khác biệt.</p>
    </div>
    
    <div class="sb-stats-grid">
      <!-- Stat 1 -->
      <div class="sb-stat-card">
        <div class="sb-stat-icon">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div class="sb-stat-val">17,000+</div>
        <div class="sb-stat-lbl">Lãnh đạo & Chuyên gia</div>
        <div class="sb-stat-sub">Khả năng nâng tầm kỹ năng, sẵn sàng ứng biến và thích ứng với thời đại</div>
      </div>
      
      <!-- Stat 2 -->
      <div class="sb-stat-card">
        <div class="sb-stat-icon">
          <svg viewBox="0 0 24 24"><path d="M3 21h18"></path><path d="M9 8h1"></path><path d="M9 12h1"></path><path d="M9 16h1"></path><path d="M14 8h1"></path><path d="M14 12h1"></path><path d="M14 16h1"></path><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path></svg>
        </div>
        <div class="sb-stat-val">70+</div>
        <div class="sb-stat-lbl">Doanh nghiệp & Tổ chức</div>
        <div class="sb-stat-sub">Đã lựa chọn để tối ưu hóa quy trình làm việc và đẩy nhanh hiệu suất</div>
      </div>
      
      <!-- Stat 3 -->
      <div class="sb-stat-card">
        <div class="sb-stat-icon">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </div>
        <div class="sb-stat-val">7</div>
        <div class="sb-stat-lbl">Thị trường Quốc tế</div>
        <div class="sb-stat-sub">Minh chứng cho năng lực triển khai chuẩn quốc tế và chuyên môn hóa</div>
      </div>
      
      <!-- Stat 4 -->
      <div class="sb-stat-card">
        <div class="sb-stat-icon">
          <svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
        </div>
        <div class="sb-stat-val">75%</div>
        <div class="sb-stat-lbl">NPS (Net Promoter Score)</div>
        <div class="sb-stat-sub">Đo lường độ tuyệt đối và mức độ sẵn sàng ứng dụng các kiến thức thực tế</div>
      </div>
    </div>
  </div>
</section>

<!-- PARTNERS -->
<section class="sb-partners">
  <div class="container">
    <h3 class="sb-partners-title">70+ doanh nghiệp hàng đầu đã hợp tác</h3>
    
    <div class="sb-logos-grid">
      <div class="sb-logo-cell" style="color: #4285F4;">Google</div>
      <div class="sb-logo-cell" style="color: #f36f21;">VNG</div>
      <div class="sb-logo-cell" style="color: #f26f21;">FPT</div>
      <div class="sb-logo-cell" style="color: #222;">AXON</div>
      <div class="sb-logo-cell" style="color: #ee4d2d;">Shopee</div>
      <div class="sb-logo-cell" style="color: #38bdf8;">Baemin</div>
      <div class="sb-logo-cell" style="color: #FFB600;">CitiBank</div>
      <div class="sb-logo-cell" style="color: #E2000F;">Home Credit</div>
      <div class="sb-logo-cell" style="color: #00875A;">Vietcombank</div>
      <div class="sb-logo-cell" style="color: #00704A;">VPBank</div>
      <div class="sb-logo-cell" style="color: #00A651;">MSD</div>
      <div class="sb-logo-cell" style="color: #002D72;">ACB</div>
      <div class="sb-logo-cell" style="color: #ed1c24;">BOSCH</div>
      <div class="sb-logo-cell" style="color: #EA0029;">MediaMart</div>
      <div class="sb-logo-cell" style="color: #0F146D;">IGV</div>
      <div class="sb-logo-cell" style="color: #D31245;">Honda</div>
      <div class="sb-logo-cell" style="color: #E5001C;">Uniqlo</div>
      <div class="sb-logo-cell" style="color: #E60000;">AIA</div>
      <div class="sb-logo-cell" style="color: #F89F1B;">The Home Depot</div>
      <div class="sb-logo-cell" style="color: #0066A1;">Amway</div>
      <div class="sb-logo-cell" style="color: #E4002B;">KFC</div>
      <div class="sb-logo-cell" style="color: #009345;">Starbucks</div>
      <div class="sb-logo-cell" style="color: #C12026;">Vinhomes</div>
      <div class="sb-logo-cell" style="color: #004B87;">Unilever</div>
    </div>
  </div>
</section>

`;

const newIndexHtml = headMatch[0] + newBody + footerMatch[1];
fs.writeFileSync('index.html', newIndexHtml);
console.log('Homepage index.html rewritten to Skillsbridge UI!');
