import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];
const logoPath = "/logo.png";
const logoUrl = "https://uploads.onecompiler.io/4426xrepu/1785586583000/2c18cf9b-514a-4ba6-8720-f0914e3ae7ca.png";

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // Clean elementor-widget-theme-site-logo block
  content = content.replace(/<div class="elementor-widget-container">\s*<a href="\/">\s*<img[\s\S]*?<\/a>\s*<\/div>/gi, (match) => {
    return `<div class="elementor-widget-container"> <a href="/"> <img src="${logoPath}" alt="Vision AI Logo" style="max-height: 65px; width: auto; object-fit: contain; vertical-align: middle;" /> </a> </div>`;
  });

  // Ensure favicon uses logo
  content = content.replace(/<link rel="shortcut icon"[^>]*>/gi, `<link rel="shortcut icon" type="image/png" href="${logoPath}" />`);

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Cleaned logo markup in ${file}`);
});

// Copy home.html to index.html
fs.copyFileSync(path.join("Vision", "home.html"), "index.html");
console.log("Synced index.html");
