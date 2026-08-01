import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];

// Services list
const servicesList = [
  { name: "IT Services", url: "/services" },
  { name: "Android App Development", url: "/services" },
  { name: "iOS App Development", url: "/services" },
  { name: "Web Development", url: "/services" },
  { name: "UI/UX Design", url: "/services" },
  { name: "Digital Marketing", url: "/services" }
];

const newSubmenuHTML = `<ul class="sub-menu elementor-nav-menu--dropdown">
  <li class="menu-item"><a href="/services" class="elementor-sub-item">IT Services</a></li>
  <li class="menu-item"><a href="/services" class="elementor-sub-item">Android App Development</a></li>
  <li class="menu-item"><a href="/services" class="elementor-sub-item">iOS App Development</a></li>
  <li class="menu-item"><a href="/services" class="elementor-sub-item">Web Development</a></li>
  <li class="menu-item"><a href="/services" class="elementor-sub-item">UI/UX Design</a></li>
  <li class="menu-item"><a href="/services" class="elementor-sub-item">Digital Marketing</a></li>
</ul>`;

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // 1. Navigation Submenu for Services
  content = content.replace(/<ul class="sub-menu elementor-nav-menu--dropdown">[\s\S]*?<\/ul>/gi, newSubmenuHTML);

  // 2. Replace Address references
  content = content.replace(/Sarita Society,\s*S\s*T\s*Colony\s*Road,\s*Gangapur\s*Road,\s*Nashik,\s*Maharashtra,\s*India,\s*422005/gi, "Headquarter (Indore): Tech Park, Innovation Street, Indore, MP, India");
  content = content.replace(/Gangapur\s*Road,\s*Nashik,\s*Maharashtra,\s*India/gi, "Tech Park, Innovation Street, Indore, MP, India");
  content = content.replace(/Gangapur\s*Road,\s*Nashik,?/gi, "Tech Park, Innovation Street, Indore, MP");
  content = content.replace(/Nashik,\s*Maharashtra/gi, "Indore, MP");
  content = content.replace(/Nashik/g, "Indore");

  // 3. Replace Phone Numbers
  content = content.replace(/9356698616\s*\/\s*9834437239/g, "+917898692133");
  content = content.replace(/9356698616/g, "+917898692133");
  content = content.replace(/9834437239/g, "+917898692133");
  content = content.replace(/\+91\s*9356698616/g, "+917898692133");

  // 4. Replace Email
  content = content.replace(/pacificworkforcesocial@gmail\.com/g, "info@steves.ai");
  content = content.replace(/contact@visionai\.com/g, "info@steves.ai");

  // 5. Replace Blog titles & dates
  content = content.replace(/Benefits of Hiring Professional Cleaning Services/gi, "Microsoft Aims To Upend The Industry");
  content = content.replace(/Types of Housekeeping Services You Must Know/gi, "The Future of AI in Web Development");
  content = content.replace(/What to Know Before Hiring a Commercial Cleaning Service/gi, "The Future of AI in Web Development");

  // Dates
  content = content.replace(/2024-03-11/g, "2026-01-28");
  content = content.replace(/2024-02-15/g, "2026-01-15");
  content = content.replace(/March 11, 2024/gi, "Jan 28, 2026");
  content = content.replace(/February 15, 2024/gi, "Jan 15, 2026");

  // 6. Update old service names in body cards
  content = content.replace(/Industrial Services/gi, "Android App Development");
  content = content.replace(/Commercial Services/gi, "iOS App Development");
  content = content.replace(/Manufacturing Services/gi, "Web Development");
  content = content.replace(/Housekeeping Services/gi, "UI/UX Design");
  content = content.replace(/Delivery Services/gi, "Digital Marketing");
  content = content.replace(/Logistics Services/gi, "IT Services");
  content = content.replace(/Staffing Services/gi, "IT Consulting");
  content = content.replace(/Security Services/gi, "Cloud & DevOps");
  content = content.replace(/Gardening Services/gi, "AI Solutions");
  content = content.replace(/Outsourcing Services/gi, "Software Solutions");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Updated content in ${file}`);
});

// Copy home.html to index.html
fs.copyFileSync(path.join("Vision", "home.html"), "index.html");
console.log("Synced index.html with updated content");
