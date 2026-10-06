const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const newNavLogo = `      <a href="index.html" class="nav-logo">
        <img src="images/logo-meu-ngang.png" alt="META ECOM UNI" style="height: 48px; width: auto;">
      </a>`;

const newFooterLogo = `        <div class="footer-logo-row">
          <img src="images/logo-meu-ngang.png" alt="META ECOM UNI" style="height: 40px; width: auto; filter: brightness(0) invert(1);">
        </div>`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace Nav
  const navRegex = /<a href=\"index\.html\" class=\"nav-logo\">[\s\S]*?<div class=\"nav-brand\">META ECOM UNI<small>E-Commerce Education<\/small><\/div>\s*<\/a>/;
  content = content.replace(navRegex, newNavLogo);
  
  // Replace Footer
  const footerRegex = /<div class=\"footer-logo-row\">[\s\S]*?<div class=\"footer-brand\">META ECOM UNI<\/div>\s*<\/div>/;
  content = content.replace(footerRegex, newFooterLogo);
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
