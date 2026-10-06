const fs = require('fs');
const path = require('path');

const targetFooter = `<footer class="site-footer">
  <style>
    .site-footer {
      background-color: #f8fafc;
      padding: 80px 0 40px;
      border-top: 1px solid #e2e8f0;
      color: #475569;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative;
      z-index: 10;
    }
    .site-footer .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 40px;
    }
    .site-footer h4 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--navy, #0b0726);
      margin-bottom: 24px;
      letter-spacing: 0.02em;
    }
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .site-footer .footer-links a {
      color: #64748b;
      text-decoration: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      display: inline-block;
      width: fit-content;
    }
    .site-footer .footer-links a:hover {
      color: var(--brand, #ef4b28);
      transform: translateX(4px);
    }
    .footer-social-btn {
      width: 40px;
      height: 40px;
      background: #e2e8f0;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
    }
    .footer-social-btn:hover {
      background: #fff;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      transform: translateY(-3px);
    }
    .footer-social-btn.fb:hover { color: #1877F2; }
    .footer-social-btn.tt:hover { color: #000; }
    .footer-social-btn.zl:hover { color: #0068FF; }
    
    .footer-contact-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
      cursor: default;
    }
    .footer-contact-item:hover {
      transform: translateX(4px);
    }
    .footer-contact-item svg {
      flex-shrink: 0;
      margin-top: 2px;
      color: var(--brand, #ef4b28);
    }
    .footer-bottom {
      margin-top: 60px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: #94a3b8;
    }

    @media (max-width: 1024px) {
      .site-footer .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 768px) {
      .site-footer {
        padding: 60px 0 30px;
      }
      .site-footer .footer-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .footer-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
  </style>

  <div class="container-wide">
    <div class="footer-grid">
      
      <!-- Column 1: Logo & Info -->
      <div>
        <div style="margin-bottom: 24px;">
          <img src="images/logo-meu-ngang.png" alt="META ECOM UNI" style="height: 44px; width: auto;">
        </div>
        <p style="font-size: 0.95rem; line-height: 1.7; margin-bottom: 24px; max-width: 320px; color: #475569;">Nền tảng học trực tuyến hiện đại & chuyên nghiệp hàng đầu. Kiến tạo chuyên gia, bứt phá doanh số.</p>
        <div style="display: flex; gap: 12px;">
          <!-- Facebook -->
          <a href="#" class="footer-social-btn fb">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <!-- TikTok -->
          <a href="#" class="footer-social-btn tt">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
          </a>
          <!-- Zalo -->
          <a href="#" class="footer-social-btn zl">
            <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21.1 11.21c0-4.88-4.48-8.84-10-8.84S1.1 6.33 1.1 11.21c0 4.88 4.48 8.84 10 8.84 1.34 0 2.62-.24 3.79-.68 1.4.99 3.03 1.64 4.54 1.8.2.02.39-.07.47-.25.08-.18.04-.4-.1-.53-.94-.88-1.58-2.08-1.84-3.32 1.94-1.55 3.14-3.6 3.14-5.86zM8.34 14.5H5.8c-.3 0-.54-.24-.54-.54s.24-.54.54-.54h1.76v-.65h-1.3c-.3 0-.54-.24-.54-.54V11c0-.3.24-.54.54-.54h2.54c.3 0 .54.24.54.54s-.24.54-.54.54H7.04v.65h1.3c.3 0 .54.24.54.54v1.23c0 .3-.24.54-.54.54zm4.24 0h-2.18c-.3 0-.54-.24-.54-.54v-3.5c0-.3.24-.54.54-.54h2.18c.3 0 .54.24.54.54s-.24.54-.54.54h-1.64v.65h1.36c.3 0 .54.24.54.54s-.24.54-.54.54h-1.36v.65h1.64c.3 0 .54.24.54.54s-.24.54-.54.54zm3.8 0h-.63V11c0-.3-.24-.54-.54-.54s-.54.24-.54.54v3.5c0 .3.24.54.54.54h1.17c.3 0 .54-.24.54-.54s-.24-.54-.54-.54zm3.4-.6c-.57.6-1.55.6-2.12 0-.58-.6-.58-1.58 0-2.18.57-.6 1.55-.6 2.12 0 .58.6.58 1.58 0 2.18zm-.39-1.78c-.35-.37-.93-.37-1.28 0-.35.37-.35.98 0 1.35.35.37.93.37 1.28 0 .35-.37.35-.98 0-1.35z"/></svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Khóa học -->
      <div>
        <h4>Khóa học</h4>
        <div class="footer-links">
          <a href="#">Digital Marketing</a>
          <a href="#">SEO Content</a>
          <a href="#">Social Media</a>
          <a href="#">Video Marketing</a>
          <a href="#">Email Marketing</a>
        </div>
      </div>

      <!-- Column 3: Tài nguyên -->
      <div>
        <h4>Tài nguyên</h4>
        <div class="footer-links">
          <a href="#">Blog</a>
          <a href="#">Điều khoản sử dụng</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Chính sách hoàn tiền</a>
        </div>
      </div>

      <!-- Column 4: Liên hệ -->
      <div>
        <h4>Liên hệ</h4>
        <div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span style="font-size: 0.95rem; color: #64748b; line-height: 1.6;">Tầng 4, Số 111 Cù Chính Lan<br>Thanh Xuân, Hà Nội</span>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span style="font-size: 0.95rem; color: #64748b;">0929 996 699</span>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span style="font-size: 0.95rem; color: #64748b;">info@meu.edu.vn</span>
          </div>
        </div>
      </div>

    </div>
    
    <div class="footer-bottom">
      <div>&copy; 2024 META ECOM UNI. All rights reserved.</div>
      <div style="display: flex; gap: 20px;">
        <a href="#" style="color: #94a3b8; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='var(--brand)'" onmouseout="this.style.color='#94a3b8'">Privacy</a>
        <a href="#" style="color: #94a3b8; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='var(--brand)'" onmouseout="this.style.color='#94a3b8'">Terms</a>
      </div>
    </div>
  </div>
</footer>`;

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let count = 0;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;
  
  if (footerRegex.test(content)) {
    const newContent = content.replace(footerRegex, targetFooter);
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Updated ' + file);
      count++;
    }
  }
}

console.log('Done! Updated ' + count + ' files with UI/UX optimized footer.');
