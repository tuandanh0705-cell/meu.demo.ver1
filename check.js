const fs = require('fs');
const html = fs.readFileSync('admin-courses.html', 'utf8');
const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (match) {
  fs.writeFileSync('test.mjs', match[1]);
  console.log("Extracted!");
} else {
  console.log("No match");
}
