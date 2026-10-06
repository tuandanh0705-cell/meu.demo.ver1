const fs = require('fs');

const aiHtml = fs.readFileSync('course-ai.html', 'utf8');
const cssMatch = aiHtml.match(/(<style>[\s\S]*?<\/style>)/);
const css = cssMatch ? cssMatch[1] : '';

const pagesToUpdate = [
  { id: 'courses', title: 'Tất cả khóa học', filterActive: 'Tất cả' },
  { id: 'course-combo', title: 'Combo khóa học', filterActive: 'Combo khóa học' },
  { id: 'course-soft-skills', title: 'Kỹ năng mềm', filterActive: 'Kỹ năng mềm' },
  { id: 'course-pro-skills', title: 'Kỹ năng chuyên môn', filterActive: 'Kỹ năng chuyên môn' },
  { id: 'course-custom', title: 'Tạo bộ khóa học', filterActive: 'Tạo bộ khóa học' },
  { id: 'blog', title: 'Blog & Kiến thức', filterActive: 'Blog & Kiến thức' },
  { id: 'webinar', title: 'Webinar Miễn phí', filterActive: 'Webinar Miễn phí' },
  { id: 'ebook', title: 'E-book & Template', filterActive: 'E-book & Template' },
  { id: 'community', title: 'Cộng đồng', filterActive: 'Cộng đồng' }
];

pagesToUpdate.forEach(page => {
  if (!fs.existsSync(`${page.id}.html`)) return;
  
  let html = fs.readFileSync(`${page.id}.html`, 'utf8');
  
  const headMatch = html.match(/<!DOCTYPE html>[\s\S]*?<\/head>/);
  const navMatch = html.match(/<body>[\s\S]*?(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)/);
  const footerMatch = html.match(/(<footer>[\s\S]*?<\/html>)/);

  if (!headMatch || !navMatch || !footerMatch) {
    console.log(`Could not find structure in ${page.id}.html`);
    return;
  }

  let pillsHtml = '';
  if (page.id.startsWith('course')) {
    const pills = [
      { name: 'Tạo bộ khóa học', link: 'course-custom.html' },
      { name: 'Kỹ năng AI', link: 'course-ai.html' },
      { name: 'Combo khóa học', link: 'course-combo.html' },
      { name: 'Kỹ năng chuyên môn', link: 'course-pro-skills.html' },
      { name: 'Kỹ năng mềm', link: 'course-soft-skills.html' }
    ];
    pillsHtml = (page.id === 'courses' ? `<a href="courses.html" class="sb-cat-pill active">Tất cả</a>` : '') + 
                pills.map(p => {
                  const isActive = (p.name === page.filterActive) ? 'active' : '';
                  return `<a href="${p.link}" class="sb-cat-pill ${isActive}">${p.name}</a>`;
                }).join('\n    ');
  } else {
    const pills = [
      { name: 'Blog & Kiến thức', link: 'blog.html' },
      { name: 'Webinar Miễn phí', link: 'webinar.html' },
      { name: 'E-book & Template', link: 'ebook.html' },
      { name: 'Cộng đồng', link: 'community.html' }
    ];
    pillsHtml = pills.map(p => {
                  const isActive = (p.name === page.filterActive) ? 'active' : '';
                  return `<a href="${p.link}" class="sb-cat-pill ${isActive}">${p.name}</a>`;
                }).join('\n    ');
  }

  const bodyContent = `
${css}
<div class="sb-container">
  <div class="sb-breadcrumb">
    <a href="index.html">Trang chủ</a>
    <span>/</span>
    <span style="color:#333;">${page.title}</span>
  </div>

  <h1 class="sb-title">${page.title}</h1>

  <!-- BANNERS -->
  <div class="sb-banners">
    <div class="sb-banner-main">
      CHƯƠNG TRÌNH ĐÀO TẠO
    </div>
    <div class="sb-banner-side">
      <div class="sb-banner-sub" style="background: linear-gradient(135deg, #1a0f55, #ED1C24); color:#fff">Sự kiện Mới</div>
      <div class="sb-banner-sub" style="background: linear-gradient(135deg, #2d1f7a, #00A896); color:#fff">Phổ biến nhất</div>
    </div>
  </div>

  <!-- CAT ROW -->
  <div class="sb-cat-row">
    ${pillsHtml}
  </div>

  <div class="sb-layout">
    <!-- SIDEBAR FILTERS -->
    <aside class="sb-sidebar">
      <div class="sb-filter-group">
        <div class="sb-filter-title">Danh mục</div>
        <label class="sb-checkbox"><input type="checkbox"> Khóa học E-Learning</label>
        <label class="sb-checkbox"><input type="checkbox"> Workshop Online</label>
        <label class="sb-checkbox"><input type="checkbox"> Tài liệu Ebook</label>
      </div>
      <div class="sb-filter-group">
        <div class="sb-filter-title">Cấp độ</div>
        <label class="sb-checkbox"><input type="checkbox"> Newbie (Dành cho người mới)</label>
        <label class="sb-checkbox"><input type="checkbox"> Master (Chuyên sâu)</label>
      </div>
    </aside>

    <!-- MAIN GRID -->
    <main class="sb-main">
      <div class="sb-toolbar">
        <div style="font-size: 14px; color: #555;">Hiển thị sản phẩm liên quan</div>
        <div>
          <span style="font-size: 14px; margin-right: 10px;">Sắp xếp theo:</span>
          <select class="sb-sort">
            <option>Mới nhất</option>
            <option>Xem nhiều nhất</option>
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
            <div class="sb-badge">Hot Deals</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">Data Analytics for E-Commerce Managers...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">3.449.000₫</span>
              <span class="sb-price-old">5.399.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 3 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #1a0f55, #F7941D);">
            <div class="sb-badge">Bestseller</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">TikTok Ads Mastery: Quy trình Vít Ads X10...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">1.999.000₫</span>
              <span class="sb-price-old">3.199.000₫</span>
            </div>
          </div>
        </a>

        <!-- COURSE 4 -->
        <a href="course-detail.html" class="sb-card">
          <div class="sb-card-img" style="background: linear-gradient(135deg, #4a2fa0, #ED1C24);">
            <div class="sb-badge">New</div>
          </div>
          <div class="sb-card-body">
            <div class="sb-card-title">Performance Marketing Masterclass...</div>
            <div class="sb-card-price-row">
              <span class="sb-price-new">1.599.000₫</span>
              <span class="sb-price-old">2.499.000₫</span>
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
  fs.writeFileSync(`${page.id}.html`, newHtml);
  console.log(`Updated ${page.id}.html`);
});
