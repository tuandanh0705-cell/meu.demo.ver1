const fs = require('fs');

const baseHtml = fs.readFileSync('course-ai.html', 'utf8');

const headMatch = baseHtml.match(/<!DOCTYPE html>[\s\S]*?<\/head>/);
const navMatch = baseHtml.match(/<body>[\s\S]*?(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)/);
const footerMatch = baseHtml.match(/(<footer>[\s\S]*?<\/html>)/);

const css = `
<style>
/* Skillsbridge Ky Nang AI specific CSS */
.sb-container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
.sb-breadcrumb { font-size: 13px; color: #666; margin: 20px 0; display: flex; align-items: center; gap: 5px; }
.sb-breadcrumb a { color: #666; text-decoration: none; }
.sb-breadcrumb a:hover { color: #ff6a00; }
.sb-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #333; }

/* Banners */
.sb-banners { display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 30px; }
.sb-banner-main { border-radius: 8px; overflow: hidden; height: 350px; background: linear-gradient(135deg, #FF6B00, #FFB000); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 2rem; font-weight: bold; position: relative;}
.sb-banner-side { display: flex; flex-direction: column; gap: 15px; height: 350px; }
.sb-banner-sub { border-radius: 8px; overflow: hidden; background: #f0f0f0; flex: 1; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #555; }

/* Categories Top */
.sb-cat-row { display: flex; gap: 10px; margin-bottom: 30px; overflow-x: auto; padding-bottom: 5px;}
.sb-cat-pill { padding: 8px 16px; border: 1px solid #ddd; border-radius: 20px; font-size: 14px; color: #333; text-decoration: none; white-space: nowrap; }
.sb-cat-pill:hover, .sb-cat-pill.active { background: #ff6a00; color: #fff; border-color: #ff6a00; }

/* Main Layout */
.sb-layout { display: flex; gap: 30px; margin-bottom: 60px; }
.sb-sidebar { width: 250px; flex-shrink: 0; }
.sb-main { flex: 1; }

/* Sidebar Filters */
.sb-filter-group { border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px; }
.sb-filter-title { font-weight: bold; font-size: 16px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
.sb-filter-title::after { content: "-"; font-size: 20px; }
.sb-checkbox { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 14px; color: #555; cursor: pointer; }
.sb-checkbox input { width: 16px; height: 16px; cursor: pointer; }

/* Toolbar */
.sb-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.sb-sort { padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; }

/* Course Grid */
.sb-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.sb-card { border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; transition: box-shadow 0.3s; background: #fff; display: flex; flex-direction: column; text-decoration: none;}
.sb-card:hover { box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
.sb-card-img { position: relative; padding-top: 56.25%; background: #f5f5f5; }
.sb-card-img img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; }
.sb-badge { position: absolute; top: 10px; left: 10px; background: #FF3B30; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px; z-index: 2; }
.sb-card-body { padding: 15px; display: flex; flex-direction: column; flex: 1; }
.sb-card-title { font-size: 15px; font-weight: 700; color: #333; margin-bottom: 10px; line-height: 1.4; }
.sb-card-price-row { margin-top: auto; }
.sb-price-new { color: #ff6a00; font-weight: bold; font-size: 16px; margin-right: 8px; }
.sb-price-old { color: #999; text-decoration: line-through; font-size: 13px; }

/* Pagination */
.sb-pagination { display: flex; justify-content: center; align-items: center; gap: 10px; margin-top: 40px; }
.sb-page-btn { width: 36px; height: 36px; border: 1px solid #ddd; display: flex; align-items: center; justify-content: center; border-radius: 4px; color: #333; text-decoration: none; font-size: 14px; }
.sb-page-btn.active { background: #ff6a00; color: #fff; border-color: #ff6a00; }
.sb-page-btn:hover:not(.active) { background: #f5f5f5; }

@media (max-width: 992px) {
  .sb-grid { grid-template-columns: repeat(2, 1fr); }
  .sb-layout { flex-direction: column; }
  .sb-sidebar { width: 100%; }
  .sb-banners { grid-template-columns: 1fr; }
  .sb-banner-side { flex-direction: row; height: 150px;}
}
@media (max-width: 576px) {
  .sb-grid { grid-template-columns: 1fr; }
  .sb-banner-side { flex-direction: column; height: auto;}
  .sb-banner-sub { height: 120px; }
}
</style>
`;

const bodyContent = `
${css}
<div class="sb-container">
  <div class="sb-breadcrumb">
    <a href="index.html">Trang chủ</a>
    <span>/</span>
    <a href="courses.html">Danh mục</a>
    <span>/</span>
    <span style="color:#333;">Kỹ năng AI</span>
  </div>

  <h1 class="sb-title">Kỹ năng AI</h1>

  <!-- BANNERS -->
  <div class="sb-banners">
    <div class="sb-banner-main">
      AI PRODUCTIVITY MASTERCLASS
    </div>
    <div class="sb-banner-side">
      <div class="sb-banner-sub" style="background: linear-gradient(135deg, #1a0f55, #ED1C24); color:#fff">Khóa học Mới</div>
      <div class="sb-banner-sub" style="background: linear-gradient(135deg, #2d1f7a, #00A896); color:#fff">Best Seller</div>
    </div>
  </div>

  <!-- CAT ROW -->
  <div class="sb-cat-row">
    <a href="course-custom.html" class="sb-cat-pill">Tạo bộ khóa học</a>
    <a href="course-ai.html" class="sb-cat-pill active">Kỹ năng AI</a>
    <a href="course-combo.html" class="sb-cat-pill">Combo khóa học</a>
    <a href="course-pro-skills.html" class="sb-cat-pill">Kỹ năng chuyên môn</a>
    <a href="course-soft-skills.html" class="sb-cat-pill">Kỹ năng mềm</a>
  </div>

  <div class="sb-layout">
    <!-- SIDEBAR FILTERS -->
    <aside class="sb-sidebar">
      <div class="sb-filter-group">
        <div class="sb-filter-title">Cấp độ</div>
        <label class="sb-checkbox"><input type="checkbox"> Cơ bản (5)</label>
        <label class="sb-checkbox"><input type="checkbox"> Nâng cao (6)</label>
        <label class="sb-checkbox"><input type="checkbox"> Chuyên sâu (3)</label>
      </div>
      <div class="sb-filter-group">
        <div class="sb-filter-title">Loại sản phẩm</div>
        <label class="sb-checkbox"><input type="checkbox"> Khóa học lẻ (10)</label>
        <label class="sb-checkbox"><input type="checkbox"> Combo (4)</label>
      </div>
      <div class="sb-filter-group">
        <div class="sb-filter-title">Học phí</div>
        <label class="sb-checkbox"><input type="checkbox"> Dưới 1.000.000₫</label>
        <label class="sb-checkbox"><input type="checkbox"> 1.000.000₫ - 3.000.000₫</label>
        <label class="sb-checkbox"><input type="checkbox"> Trên 3.000.000₫</label>
      </div>
    </aside>

    <!-- MAIN GRID -->
    <main class="sb-main">
      <div class="sb-toolbar">
        <div style="font-size: 14px; color: #555;">14 sản phẩm</div>
        <div>
          <span style="font-size: 14px; margin-right: 10px;">Sắp xếp theo:</span>
          <select class="sb-sort">
            <option>Mới nhất</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao xuống thấp</option>
          </select>
        </div>
      </div>

      <div class="sb-grid">
        <!-- COURSE 1 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #1a0f55, #ED1C24);">
            <div class="sb-badge">Giảm đến 2.500.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">Gen AI Studio: X5 Số Lượng Hình Ảnh, Video...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">2.499.000₫</span>
              <span class="sb-price-old">4.999.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 2 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #2d1f7a, #00A896);">
            <div class="sb-badge">Giảm đến 1.950.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">Claude PRODUCTIVITY: X2 Chất lượng công việc...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">3.449.000₫</span>
              <span class="sb-price-old">5.399.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 3 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #1a0f55, #F7941D);">
            <div class="sb-badge">Giảm đến 1.200.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">AI Workflows for Business Operations...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">1.999.000₫</span>
              <span class="sb-price-old">3.199.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 4 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #4a2fa0, #ED1C24);">
            <div class="sb-badge">Giảm đến 900.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">Gemini Productivity: X10 hiệu suất công việc...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">1.599.000₫</span>
              <span class="sb-price-old">2.499.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 5 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #00A896, #F7941D);">
            <div class="sb-badge">Giảm đến 978.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">DataFlow Automation: Tự động hóa báo cáo...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">1.490.000₫</span>
              <span class="sb-price-old">2.468.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 6 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #ED1C24, #1a0f55);">
            <div class="sb-badge">Giảm đến 1.833.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">AI Intelligence Workflow: Tự động hoá...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">2.499.000₫</span>
              <span class="sb-price-old">4.332.000₫</span>
            </div>
          </div>
        </a>
        
        <!-- COURSE 7 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #FF6B00, #FFB000);">
            <div class="sb-badge">Giảm đến 4.000.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">AI ALL IN ONE - Bộ 6 khóa học AI...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">3.999.000₫</span>
              <span class="sb-price-old">7.999.000₫</span>
            </div>
          </div>
        </a>
        
        <!-- COURSE 8 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #00A896, #4a2fa0);">
            <div class="sb-badge">Giảm đến 2.100.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">AI SURVIVAL KIT: Bộ 3 khoá học ứng dụng...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">2.899.000₫</span>
              <span class="sb-price-old">4.999.000₫</span>
            </div>
          </div>
        </a>
        
        <!-- COURSE 9 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #F7941D, #ED1C24);">
            <div class="sb-badge">Giảm đến 1.468.000₫</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">AI Workflow Automation: Combo 2 khóa học...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">2.499.000₫</span>
              <span class="sb-price-old">3.967.000₫</span>
            </div>
          </div>
        </a>

      </div>

      <!-- PAGINATION -->
      <div class="sb-pagination">
        <a href="#" class="sb-page-btn" style="color: #ccc; cursor: not-allowed;">&lt;</a>
        <a href="#" class="sb-page-btn active">1</a>
        <a href="#" class="sb-page-btn">2</a>
        <a href="#" class="sb-page-btn">&gt;</a>
      </div>
    </main>
  </div>
</div>
`;

let newHtml = headMatch[0] + '\n<body>\n' + navMatch[1] + bodyContent + '\n' + footerMatch[1];
fs.writeFileSync('course-ai.html', newHtml);
console.log('course-ai.html has been updated to match Skillsbridge UI!');
