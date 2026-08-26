import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const pageFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === 'page.tsx') pageFiles.push(file);
  }
}
walk(path.join(root, 'app'));

for (const file of pageFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const count = (source.match(/<h1/g) || []).length;
  if (count !== 1) failures.push(`${path.relative(root, file)} has ${count} H1 elements`);
}

const sitemap = fs.readFileSync(path.join(root, 'app/sitemap.ts'), 'utf8');
const routeFromFile = (file) => {
  const rel = path.relative(path.join(root, 'app'), file).replaceAll('\\', '/');
  return rel === 'page.tsx' ? '/' : `/${rel.replace(/\/page\.tsx$/, '')}/`;
};
for (const file of pageFiles) {
  const route = routeFromFile(file);
  if (!sitemap.includes(`"${route}"`)) failures.push(`${route} missing from sitemap`);
}

const privatePPP = JSON.parse(fs.readFileSync(path.join(root, 'data/ppp-private.json'), 'utf8'));
const gdpPPP = JSON.parse(fs.readFileSync(path.join(root, 'data/ppp-gdp.json'), 'utf8'));
if (Object.keys(privatePPP).length < 3) failures.push('private PPP dataset is too small');
if (Object.keys(gdpPPP).length < 3) failures.push('GDP PPP dataset is too small');

if (failures.length) {
  console.error('QA failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`QA passed: ${pageFiles.length} routes, sitemap coverage, H1 checks, and PPP datasets.`);
