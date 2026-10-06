const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const heroMarker = '<!-- HERO SECTION -->';
const footerMarker = '<footer>';

const headerMatch = indexHtml.split(heroMarker);
const header = headerMatch[0]; // This gets everything before <!-- HERO SECTION -->

const footerMatch = indexHtml.split(footerMarker);
const footer = footerMarker + footerMatch[1]; // This gets <footer> and everything after

const pages = ['blog.html', 'trial.html', 'webinar.html', 'ebook.html'];

pages.forEach(page => {
  let content = fs.readFileSync(page, 'utf8');
  
  // Clean up existing content to only contain the body parts
  // We need to extract the part between <section/div> and <footer>
  const fStart = content.indexOf(footerMarker);
  let bodyContent = content;
  if (fStart !== -1) {
    bodyContent = content.substring(0, fStart);
  }
  
  // If it already has DOCTYPE, skip
  if (bodyContent.includes('<!DOCTYPE html>')) {
      console.log(page + ' is already fixed.');
      return;
  }
  
  const fullPage = header + bodyContent + footer;
  fs.writeFileSync(page, fullPage);
  console.log('Fixed: ' + page);
});
