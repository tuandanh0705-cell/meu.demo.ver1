const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const headerEnd = html.indexOf('<!-- COMPACT HERO & FEATURED SECTION -->');
const header = html.substring(0, headerEnd);
const footerStart = html.indexOf('<footer>');
const footer = html.substring(footerStart);

const blog = `
<div style="background: linear-gradient(135deg, #0b0726 0%, #1a1040 100%); padding: 80px 0; text-align: center; color: #fff;">
  <h1 style="font-size: 2.8rem; font-weight: 900; margin-bottom: 16px;">Blog & Kiến Thức</h1>
  <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 600px; margin: 0 auto;">Cập nhật xu hướng E-commerce, Marketing và AI mới nhất.</p>
</div>
<section style="padding: 60px 0; background: #f8fafc;">
  <div class="container-wide">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
      <a href="#" style="display: block; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="height: 200px; background: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop') center/cover;"></div>
        <div style="padding: 24px;">
          <div style="color: var(--brand); font-weight: 700; font-size: 0.85rem; margin-bottom: 8px;">DIGITAL MARKETING</div>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Xu Hướng TikTok Shop 2026: Cách Bứt Phá Doanh Thu</h3>
          <p style="color: #64748b; font-size: 0.95rem;">Khám phá chiến lược tối ưu luồng livestream và thuật toán hiển thị mới nhất.</p>
        </div>
      </a>
      <a href="#" style="display: block; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="height: 200px; background: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop') center/cover;"></div>
        <div style="padding: 24px;">
          <div style="color: var(--brand); font-weight: 700; font-size: 0.85rem; margin-bottom: 8px;">AI TRONG VẬN HÀNH</div>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Ứng Dụng Gen AI Để Viết Content Hàng Loạt</h3>
          <p style="color: #64748b; font-size: 0.95rem;">Tạo hàng trăm bài viết chuẩn SEO bằng ChatGPT và Midjourney.</p>
        </div>
      </a>
      <a href="#" style="display: block; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="height: 200px; background: url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop') center/cover;"></div>
        <div style="padding: 24px;">
          <div style="color: var(--brand); font-weight: 700; font-size: 0.85rem; margin-bottom: 8px;">E-COMMERCE</div>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Bí Quyết Quản Trị Kho Hàng Cho Seller Nghìn Đơn</h3>
          <p style="color: #64748b; font-size: 0.95rem;">Giảm thiểu hoàn hàng và tối ưu luồng đóng gói tự động.</p>
        </div>
      </a>
    </div>
  </div>
</section>
`;

const trial = `
<div style="background: linear-gradient(135deg, #0b0726 0%, #1a1040 100%); padding: 80px 0; color: #fff;">
  <div class="container-wide" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
    <div>
      <div style="display: inline-block; background: rgba(247, 148, 29, 0.2); color: var(--brand); font-weight: 800; padding: 6px 12px; border-radius: 20px; margin-bottom: 16px;">Miễn phí trải nghiệm</div>
      <h1 style="font-size: 2.8rem; font-weight: 900; margin-bottom: 20px;">Đăng Ký Học Thử Khóa Nổi Bật</h1>
      <p style="font-size: 1.1rem; color: #cbd5e1; margin-bottom: 32px;">Nhận ngay 3 bài giảng miễn phí để đánh giá chất lượng.</p>
      <ul style="list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 16px;">
        <li style="display: flex; align-items: center; gap: 12px;"><svg width="24" height="24" stroke="var(--brand)" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Mở khóa quyền truy cập ngay</li>
        <li style="display: flex; align-items: center; gap: 12px;"><svg width="24" height="24" stroke="var(--brand)" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Trải nghiệm nền tảng E-learning chuyên nghiệp</li>
        <li style="display: flex; align-items: center; gap: 12px;"><svg width="24" height="24" stroke="var(--brand)" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Không yêu cầu thẻ tín dụng</li>
      </ul>
    </div>
    <div style="background: #fff; border-radius: 16px; padding: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
      <h3 style="color: var(--navy); font-size: 1.4rem; font-weight: 800; margin-bottom: 20px;">Thông tin đăng ký</h3>
      <form style="display: flex; flex-direction: column; gap: 16px;">
        <input type="text" placeholder="Họ và tên" style="padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; width: 100%;">
        <input type="email" placeholder="Email nhận bài giảng" style="padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; width: 100%;">
        <select style="padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; width: 100%;">
          <option>Chọn chủ đề quan tâm</option>
          <option>Facebook/TikTok Ads</option>
          <option>Ứng dụng AI Content</option>
        </select>
        <button type="button" style="padding: 14px; background: var(--brand); color: #fff; font-weight: 800; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; margin-top: 8px;">Nhận Bài Giảng Miễn Phí</button>
      </form>
    </div>
  </div>
</div>
`;

const webinar = `
<div style="background: linear-gradient(135deg, #0b0726 0%, #1a1040 100%); padding: 80px 0; text-align: center; color: #fff;">
  <h1 style="font-size: 2.8rem; font-weight: 900; margin-bottom: 16px;">Webinar Miễn Phí</h1>
  <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 600px; margin: 0 auto;">Tương tác trực tiếp cùng Top Seller và chuyên gia thực chiến.</p>
</div>
<section style="padding: 60px 0; background: #f8fafc;">
  <div class="container-wide">
    <h2 style="font-size: 1.8rem; font-weight: 800; color: var(--navy); margin-bottom: 32px;">Sự Kiện Sắp Diễn Ra</h2>
    <div style="background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; border: 1px solid #f1f5f9; margin-bottom: 48px; min-height: 300px;">
      <div style="width: 40%; background: url('https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop') center/cover;"></div>
      <div style="width: 60%; padding: 40px;">
        <div style="display: flex; gap: 16px; margin-bottom: 16px;">
          <span style="background: rgba(237, 28, 36, 0.1); color: var(--red); padding: 4px 12px; border-radius: 20px; font-weight: 700; font-size: 0.85rem;">🔴 Trực tiếp (Zoom)</span>
          <span style="color: #64748b; font-weight: 600; font-size: 0.85rem; display: flex; align-items: center;">20:00, 25/06/2026</span>
        </div>
        <h3 style="font-size: 2rem; font-weight: 800; color: var(--navy); margin-bottom: 16px;">Livestream Bán Hàng Xuyên Biên Giới</h3>
        <p style="color: #64748b; font-size: 1.05rem; line-height: 1.6; margin-bottom: 32px;">Học cách setup phòng live chuẩn, sử dụng công cụ AI hỗ trợ kịch bản và thuật toán phân phối.</p>
        <button style="padding: 12px 32px; background: var(--brand); color: #fff; font-weight: 800; border: none; border-radius: 8px; font-size: 1.05rem; cursor: pointer;">Đăng Ký Giữ Chỗ Ngay</button>
      </div>
    </div>
  </div>
</section>
`;

const ebook = `
<div style="background: linear-gradient(135deg, #0b0726 0%, #1a1040 100%); padding: 80px 0; text-align: center; color: #fff;">
  <h1 style="font-size: 2.8rem; font-weight: 900; margin-bottom: 16px;">Tài Liệu & Template</h1>
  <p style="font-size: 1.1rem; color: #cbd5e1; max-width: 600px; margin: 0 auto;">Tải xuống biểu mẫu, sách điện tử và bộ công cụ hỗ trợ kinh doanh.</p>
</div>
<section style="padding: 60px 0; background: #f8fafc;">
  <div class="container-wide">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
      <div style="background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center;">
        <div style="width: 80px; height: 80px; background: rgba(59, 130, 246, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: #3b82f6;">
          <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Mẫu Kế Hoạch Content</h3>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 24px;">Lên lịch và theo dõi hiệu suất nội dung trên Facebook, TikTok.</p>
        <button style="width: 100%; padding: 12px; background: transparent; color: var(--brand); border: 2px solid var(--brand); border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--brand)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='var(--brand)';">Tải Xuống</button>
      </div>
      <div style="background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center;">
        <div style="width: 80px; height: 80px; background: rgba(247, 148, 29, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--brand);">
          <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">100 Câu Prompt Chốt Sale</h3>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 24px;">Bí quyết thiết lập kịch bản tự động cho chatbot fanpage.</p>
        <button style="width: 100%; padding: 12px; background: transparent; color: var(--brand); border: 2px solid var(--brand); border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--brand)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='var(--brand)';">Tải Xuống</button>
      </div>
      <div style="background: #fff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); text-align: center;">
        <div style="width: 80px; height: 80px; background: rgba(237, 28, 36, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--red);">
          <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--navy); margin-bottom: 12px;">Bảng Tính P&L Shopee</h3>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 24px;">Mẫu tính toán lợi nhuận, chi phí quảng cáo tự động.</p>
        <button style="width: 100%; padding: 12px; background: transparent; color: var(--brand); border: 2px solid var(--brand); border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s;" onmouseover="this.style.background='var(--brand)'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='var(--brand)';">Tải Xuống</button>
      </div>
    </div>
  </div>
</section>
`;

fs.writeFileSync('blog.html', header + blog + footer);
fs.writeFileSync('trial.html', header + trial + footer);
fs.writeFileSync('webinar.html', header + webinar + footer);
fs.writeFileSync('ebook.html', header + ebook + footer);
console.log('Successfully created all 4 demo pages!');
