import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];
const logoPath = "/logo.png";
const logoUrl = "https://uploads.onecompiler.io/4426xrepu/1785586583000/2c18cf9b-514a-4ba6-8720-f0914e3ae7ca.png";

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // Fix theme-site-logo container img tags
  content = content.replace(/<div class="elementor-widget-container">\s*<a href="\/">\s*<img[^>]*>/gi, (match) => {
    return `<div class="elementor-widget-container"> <a href="/"> <img src="${logoPath}" srcset="${logoPath}" alt="Vision AI Logo" style="max-height: 65px; width: auto; object-fit: contain;" /> </a>`;
  });

  // Also replace any other img with logo.png
  content = content.replace(/<img([^>]*)\/logo\.png([^>]*)>/gi, (match) => {
    return `<img src="${logoPath}" srcset="${logoPath}" alt="Vision AI Logo" style="max-height: 65px; width: auto; object-fit: contain;" />`;
  });

  // Clean remaining pacific-way.com links
  content = content.replace(/https:\/\/pacific-way\.com\/?/g, "/");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Fixed logo src in ${file}`);
});

// Sync index.html with home.html
fs.copyFileSync(path.join("Vision", "home.html"), "index.html");
console.log("Synced index.html");
