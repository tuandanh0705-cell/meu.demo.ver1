
const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/style\.css(\?v=\d+)?/g, 'style.css?v=3');
  
  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log('Cache busted ' + file);
  }
});
