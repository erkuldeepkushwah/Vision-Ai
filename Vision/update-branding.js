import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];
const logoUrl = "https://uploads.onecompiler.io/4426xrepu/1785586583000/2c18cf9b-514a-4ba6-8720-f0914e3ae7ca.png";
const logoLocal = "/logo.png";

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // 1. Titles
  content = content.replace(/<title>Home1 - Pacific Workforce<\/title>/gi, "<title>Vision AI - Seeing Intelligence. Delivering Impact.</title>");
  content = content.replace(/<title>About - Pacific Workforce<\/title>/gi, "<title>About Us - Vision AI</title>");
  content = content.replace(/<title>Services - Pacific Workforce<\/title>/gi, "<title>Services - Vision AI</title>");
  content = content.replace(/<title>Blog - Pacific Workforce<\/title>/gi, "<title>Blog - Vision AI</title>");
  content = content.replace(/<title>Contact - Pacific Workforce<\/title>/gi, "<title>Contact Us - Vision AI</title>");

  // 2. Favicon
  content = content.replace(/https:\/\/cdn-ilcbecn\.nitrocdn\.com\/[^\s"']*\/PACIFIC-FAVICON\.png/g, logoLocal);

  // 3. Logo Images - replace nitro-lazy and src/srcset attributes containing Pacific-logo-new
  content = content.replace(/nitro-lazy-srcset="[^"]*Pacific-logo-new[^"]*"/gi, `nitro-lazy-srcset="${logoLocal}"`);
  content = content.replace(/nitro-lazy-src="[^"]*Pacific-logo-new[^"]*"/gi, `nitro-lazy-src="${logoLocal}"`);
  content = content.replace(/src="[^"]*Pacific-logo-new[^"]*"/gi, `src="${logoLocal}"`);

  // 4. Also check if there are other logo images in theme headers
  content = content.replace(/<img([^>]*)(Pacific-logo-new|pacific-logo)[^>]*>/gi, (match) => {
    return `<img src="${logoLocal}" alt="Vision AI Logo" style="max-height: 55px; width: auto; object-fit: contain;" />`;
  });

  // 5. Replace text references
  content = content.replace(/Pacific Workforce/g, "Vision AI");
  content = content.replace(/Pacific Way/g, "Vision AI");

  // 6. Navigation Links
  content = content.replace(/href="https:\/\/pacific-way\.com\/"/g, 'href="/"');
  content = content.replace(/href="https:\/\/pacific-way\.com"/g, 'href="/"');
  content = content.replace(/href="https:\/\/pacific-way\.com\/about\/"/g, 'href="/about"');
  content = content.replace(/href="https:\/\/pacific-way\.com\/services\/"/g, 'href="/services"');
  content = content.replace(/href="https:\/\/pacific-way\.com\/blog\/"/g, 'href="/blog"');
  content = content.replace(/href="https:\/\/pacific-way\.com\/contact\/"/g, 'href="/contact"');
  content = content.replace(/href="http:\/\/18\.214\.56\.192\/"/g, 'href="/"');
  content = content.replace(/href="http:\/\/18\.214\.56\.192\/contact\/"/g, 'href="/contact"');

  // 7. Contact email
  content = content.replace(/pacificworkforcesocial@gmail\.com/g, "contact@visionai.com");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated ${file}`);
});
