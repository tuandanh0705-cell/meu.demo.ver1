const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const navStartRegex = /<!-- NAVBAR -->/g;
const navEndRegex = /<!-- MOBILE NAV -->[\s\S]*?<div class="mobile-nav" id="mobileNav">[\s\S]*?<\/div>\n<\/div>\n/g;

// Manually extract exactly what we want from index.html
const startIdx = indexHtml.indexOf('<!-- NAVBAR -->');
const endMarker = '<div class="mobile-nav" id="mobileNav">';
const endMarkerIdx = indexHtml.indexOf(endMarker);
const afterEndMarkerIdx = indexHtml.indexOf('</div>\n</div>', endMarkerIdx) + '</div>\n</div>'.length;

const navContent = indexHtml.substring(startIdx, afterEndMarkerIdx);

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  const start = content.indexOf('<!-- NAVBAR -->');
  if (start === -1) {
    console.log('Skipping ' + file + ' (No NAVBAR marker)');
    return;
  }
  
  const endMark = '<div class="mobile-nav" id="mobileNav">';
  const endMIdx = content.indexOf(endMark);
  if (endMIdx === -1) {
    console.log('Skipping ' + file + ' (No MOBILE NAV marker)');
    return;
  }
  const end = content.indexOf('</div>\n</div>', endMIdx) + '</div>\n</div>'.length;
  
  const newContent = content.substring(0, start) + navContent + content.substring(end);
  fs.writeFileSync(file, newContent);
  console.log('Synced navbar for ' + file);
});
