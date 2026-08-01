import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // Replace emails
  content = content.replace(/pacificworkforcesocial@gmail\.com/gi, "visionindia@gmail.com");
  content = content.replace(/info@steves\.ai/gi, "visionindia@gmail.com");
  content = content.replace(/contact@visionai\.com/gi, "visionindia@gmail.com");

  // Remove Maharashtra, India, 422005 and variants
  content = content.replace(/,\s*Maharashtra,\s*India,\s*422005/gi, "");
  content = content.replace(/,\s*Maharashtra,\s*India,\s*422005/gi, "");
  content = content.replace(/Maharashtra,\s*India,\s*422005/gi, "");
  content = content.replace(/Maharashtra,\s*India,422005/gi, "");
  content = content.replace(/,\s*422005/gi, "");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated email and address in ${file}`);
});

// Sync index.html
fs.copyFileSync(path.join("Vision", "home.html"), "index.html");
console.log("Synced index.html");
