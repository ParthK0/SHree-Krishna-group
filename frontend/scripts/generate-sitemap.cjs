const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.shree-krishna-transport.org';

// 1. Static Core Pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/book-truck', priority: '0.9', changefreq: 'weekly' },
  { url: '/routes', priority: '0.9', changefreq: 'weekly' },
  { url: '/register-truck', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  { url: '/terms-and-conditions', priority: '0.4', changefreq: 'yearly' },
  { url: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
  { url: '/cancellation-refund-policy', priority: '0.4', changefreq: 'yearly' },
];

// 2. Parse Route Slugs
const routeFilePath = path.join(__dirname, '../src/data/routeRegistry.ts');
const routeContent = fs.readFileSync(routeFilePath, 'utf8');
const routeSlugMatches = [...routeContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const routeSlugs = [...new Set(routeSlugMatches.map(m => m[1]))];

// 3. Parse Blog Slugs
const blogFilePath = path.join(__dirname, '../src/data/blogData.ts');
let blogSlugs = [];
if (fs.existsSync(blogFilePath)) {
  const blogContent = fs.readFileSync(blogFilePath, 'utf8');
  const blogSlugMatches = [...blogContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  blogSlugs = [...new Set(blogSlugMatches.map(m => m[1]))];
}

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
for (const page of staticPages) {
  xml += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

// Add route pages (both /routes/:slug and /:slug direct corridor)
for (const slug of routeSlugs) {
  xml += `  <url>
    <loc>${BASE_URL}/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

// Add blog posts
for (const slug of blogSlugs) {
  xml += `  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Generated sitemap.xml with ${staticPages.length + routeSlugs.length + blogSlugs.length} URLs at ${outPath}`);
