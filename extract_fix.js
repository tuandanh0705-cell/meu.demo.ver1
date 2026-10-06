const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const courseHtml = fs.readFileSync('course-detail.html', 'utf8');

const match = indexHtml.match(/(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>)\s*<!-- HERO CAROUSEL -->/);
if (match) {
    const fullNav = match[1];
    
    const brokenNavMatch = courseHtml.match(/(<!-- NAVBAR -->[\s\S]*?<!-- MOBILE NAV -->[\s\S]*?<\/div>\s*)\s*<!-- HERO SECTION -->/);
    if (brokenNavMatch) {
        let newCourseHtml = courseHtml.replace(brokenNavMatch[1], fullNav + '\n\n');
        fs.writeFileSync('course-detail.html', newCourseHtml);
        console.log('Fixed course-detail.html!');
    } else {
        // Fallback if the previous regex doesn't match perfectly
        const startIdx = courseHtml.indexOf('<!-- NAVBAR -->');
        const endIdx = courseHtml.indexOf('<!-- HERO SECTION -->');
        if (startIdx !== -1 && endIdx !== -1) {
            let newCourseHtml = courseHtml.substring(0, startIdx) + fullNav + '\n\n' + courseHtml.substring(endIdx);
            fs.writeFileSync('course-detail.html', newCourseHtml);
            console.log('Fixed course-detail.html using fallback!');
        } else {
            console.log('Could not find boundaries in course-detail.html');
        }
    }
} else {
    console.log('Could not find nav in index.html');
}
