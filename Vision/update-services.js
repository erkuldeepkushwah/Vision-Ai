import fs from 'fs';
import path from 'path';

const files = ["home.html", "about.html", "servie.html", "blog.html", "contact.html"];

const services = [
  { name: "Artificial Intelligence Solutions", desc: "Cutting-edge AI models, predictive analytics, and enterprise automation to transform your business operations." },
  { name: "Web Development", desc: "Modern, high-performance web applications built with responsive frameworks and robust backend architecture." },
  { name: "Mobile App Development", desc: "Native and cross-platform iOS & Android applications engineered for seamless user experience and performance." },
  { name: "Cloud Solutions", desc: "Scalable cloud architecture, migration, and cloud management on AWS, Google Cloud, and Azure environments." },
  { name: "DevOps Services", desc: "Continuous integration, continuous delivery (CI/CD), infrastructure as code, and containerization solutions." },
  { name: "Machine Learning Solutions", desc: "Tailored ML algorithms, computer vision, and natural language processing to unlock deep data insights." },
  { name: "Software Development", desc: "End-to-end custom software solutions tailored to scale with your enterprise requirements." },
  { name: "Data Analytics", desc: "Advanced data pipelines, interactive dashboards, and business intelligence to drive data-informed decisions." },
  { name: "Digital Marketing", desc: "Strategic SEO, performance marketing, and digital growth campaigns to amplify your brand presence." },
  { name: "AI Solutions", desc: "Next-generation generative AI, intelligent agents, and automated workflow integration for competitive advantage." }
];

// Header Navigation Submenu HTML
const menuHTML = `<ul class="sub-menu elementor-nav-menu--dropdown">
${services.map(s => `  <li class="menu-item"><a href="/services" class="elementor-sub-item">${s.name}</a></li>`).join('\n')}
</ul>`;

files.forEach(file => {
  const filePath = path.join("Vision", file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");

  // 1. Update Navigation Submenu
  content = content.replace(/<ul class="sub-menu elementor-nav-menu--dropdown">[\s\S]*?<\/ul>/gi, menuHTML);

  // 2. Remove old staffing / manpower / labor phrases
  content = content.replace(/staffing and manpower solutions/gi, "Artificial Intelligence & IT Solutions");
  content = content.replace(/manpower solutions/gi, "IT & AI Solutions");
  content = content.replace(/staffing solutions/gi, "IT & Software Development Solutions");
  content = content.replace(/manpower/gi, "IT workforce & experts");

  fs.writeFileSync(filePath, content, "utf8");
});

// Update servie.html specific content
let servieContent = fs.readFileSync("Vision/servie.html", "utf8");

// Generate 10 service cards grid for servie.html
const serviceCardsHTML = `<section class="elementor-section elementor-top-section elementor-element elementor-section-boxed" style="padding: 40px 0;">
  <div class="elementor-container elementor-column-gap-default" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; width: 100%;">
    ${services.map(s => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); transition: all 0.3s ease;">
        <div style="width: 48px; height: 48px; border-radius: 10px; background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-height: 1.3;">${s.name}</h3>
        <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin: 0;">${s.desc}</p>
      </div>
    `).join('')}
  </div>
</section>`;

// Replace old icon boxes section in servie.html
servieContent = servieContent.replace(/<section class="elementor-section elementor-inner-section elementor-element elementor-element-115b350[\s\S]*?<\/section>\s*<\/section>/gi, serviceCardsHTML);

fs.writeFileSync("Vision/servie.html", servieContent, "utf8");

// Update home.html service grid titles
let homeContent = fs.readFileSync("Vision/home.html", "utf8");

// Replace home service title matches
const homeReplacements = [
  { old: "Industrial", new: "Artificial Intelligence Solutions" },
  { old: "Commercial", new: "Web Development" },
  { old: "Manufacturing", new: "Mobile App Development" },
  { old: "Housekeeping", new: "Cloud Solutions" },
  { old: "Delivery", new: "DevOps Services" },
  { old: "Logistics", new: "Machine Learning Solutions" },
  { old: "Staffing", new: "Software Development" },
  { old: "Security", new: "Data Analytics" },
  { old: "Gardening", new: "Digital Marketing" },
  { old: "Outsourcing", new: "AI Solutions" },
  { old: "Android App Development", new: "Artificial Intelligence Solutions" },
  { old: "iOS App Development", new: "Web Development" }
];

homeReplacements.forEach(r => {
  const reg = new RegExp(`>\\s*${r.old}\\s*<`, 'g');
  homeContent = homeContent.replace(reg, `>${r.new}<`);
});

fs.writeFileSync("Vision/home.html", homeContent, "utf8");

// Sync index.html
fs.copyFileSync("Vision/home.html", "index.html");
console.log("Successfully updated services across the application!");
