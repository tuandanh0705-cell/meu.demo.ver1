const fs = require('fs');

const correctMobileNav = `
<!-- MOBILE NAV -->
<div class="mobile-nav" id="mobileNav">
  <div class="mobile-nav-hdr" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
    <a href="index.html" class="nav-logo" style="background:var(--navy); padding:8px 12px; border-radius:8px; display:flex; align-items:center;">
      <div class="nav-logo-mark" style="width:24px;height:24px">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="24" height="24"><path d="M3 18V8l9-5 9 5v10"/><path d="M9 18V12h6v6"/></svg>
      </div>
      <span style="color:white; font-weight:800; margin-left:8px; font-size:14px;">META ECOM UNI</span>
    </a>
    <div class="m-close" onclick="closeMenu()" style="cursor:pointer; background:var(--gray100); padding:8px; border-radius:50%;"><svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--navy)" fill="none" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></div>
  </div>
  <a class="m-link" href="courses.html">Khóa học</a>
  <a class="m-link-sub" href="courses.html">E-Commerce Toàn Diện</a>
  <a class="m-link-sub" href="course-pro-skills.html">Facebook & TikTok Ads</a>
  <a class="m-link-sub" href="course-pro-skills.html">Content Marketing</a>
  <a class="m-link-sub" href="course-pro-skills.html">Brand Building</a>
  <a class="m-link" href="blog.html">Thư viện</a>
  <a class="m-link" href="contact.html">Liên hệ</a>
  <a class="m-link" href="about.html">Về chúng tôi</a>
  <div style="margin-top:auto;display:flex;flex-direction:column;gap:10px;padding-top:20px;">
    <a href="login.html" style="display:flex;align-items:center;justify-content:center;padding:12px;border:1.5px solid var(--gray200);border-radius:6px;font-weight:600;color:var(--navy);font-size:.9rem">Đăng nhập</a>
    <a href="signup.html" style="display:flex;align-items:center;justify-content:center;padding:12px;background:var(--red);border-radius:6px;font-weight:700;color:#fff;font-size:.9rem">Đăng ký khóa học</a>
  </div>
</div>
`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the corrupted block from "<!-- MOBILE NAV -->" up to "<style>"
  // Notice we use [\s\S]*? to lazily match until <style> or <div class="sb-container"> or <section class="sb-hero">
  const fixRegex = /<!-- MOBILE NAV -->[\s\S]*?(<style>|<div class="sb-container">|<section class="sb-hero">|<div class="container" style="margin-top: 32px;">)/;
  
  if (fixRegex.test(content)) {
    content = content.replace(fixRegex, (match, p1) => {
      return correctMobileNav + "\n" + p1;
    });
    fs.writeFileSync(file, content);
    console.log(`Fixed Mobile Nav in ${file}`);
  }
});
