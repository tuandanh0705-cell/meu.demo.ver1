const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, 'index.html');
const courseFile = path.join(__dirname, 'course-detail.html');

let indexHtml = fs.readFileSync(indexFile, 'utf8');
let courseHtml = fs.readFileSync(courseFile, 'utf8');

// 1. Extract CSS from index.html
const styleRegex = /<style>([\s\S]*?)<\/style>/;
const styleMatch = indexHtml.match(styleRegex);
if (styleMatch) {
  fs.writeFileSync(path.join(__dirname, 'style.css'), styleMatch[1].trim());
  indexHtml = indexHtml.replace(styleRegex, '<link rel="stylesheet" href="style.css">');
}

// 2. Extract JS from index.html
const scriptRegex = /<script>([\s\S]*?)<\/script>/;
const scriptMatch = indexHtml.match(scriptRegex);
if (scriptMatch) {
  fs.writeFileSync(path.join(__dirname, 'main.js'), scriptMatch[1].trim());
  indexHtml = indexHtml.replace(scriptRegex, '<script src="main.js" defer></script>');
}

// 3. Extract Navbar + Mobile Nav HTML from index.html
const navRegex = /(<nav class="navbar" id="navbar">[\s\S]*?<\/nav>\s*<!-- MOBILE NAV -->\s*<div class="mobile-nav" id="mobileNav">[\s\S]*?<\/div>)/;
const navMatch = indexHtml.match(navRegex);

// 4. Update course-detail.html
if (navMatch) {
  const fullNavHtml = navMatch[1];
  // Replace the simple nav in course-detail.html with the full nav
  const simpleNavRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
  courseHtml = courseHtml.replace(simpleNavRegex, fullNavHtml);
}

// 5. Replace inline <style> in course-detail.html with <link>
// But wait, course-detail.html has some specific styles for course layout.
// Let's append course-specific styles to style.css or keep them in course-detail.html.
// It's safer to keep course-specific styles in course-detail.html, but replace the duplicated tokens and base styles.
// Actually, to make it simple, let's extract course-detail.html's CSS to course.css
const courseStyleRegex = /<style>([\s\S]*?)<\/style>/;
const courseStyleMatch = courseHtml.match(courseStyleRegex);
if(courseStyleMatch) {
    fs.writeFileSync(path.join(__dirname, 'course.css'), courseStyleMatch[1].trim());
    courseHtml = courseHtml.replace(courseStyleRegex, '<link rel="stylesheet" href="style.css">\n<link rel="stylesheet" href="course.css">');
}

// Link main.js in course-detail.html
courseHtml = courseHtml.replace('</body>', '<script src="main.js" defer></script>\n</body>');

fs.writeFileSync(indexFile, indexHtml);
fs.writeFileSync(courseFile, courseHtml);

console.log('Successfully separated CSS/JS and updated Navbar!');
