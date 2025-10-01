const fs = require('fs');
const glob = require('glob');
const cheerio = require('cheerio');
const { decode } = require('html-entities');
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');


const htmlFiles = glob.sync('public/**/*.html'); // Adjust path as needed


htmlFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);


  $('code.language-mermaid').each((i, el) => {
    const mermaidCode = decode($(el).text());
    const tmpDir = os.tmpdir();
    const mmdPath = path.join(tmpDir, `diagram-${Date.now()}-${i}.mmd`);
    const svgPath = path.join(path.dirname(file), `diagram-${Date.now()}-${i}.svg`);
    fs.writeFileSync(mmdPath, mermaidCode, 'utf8');

    try {
      execSync(`mmdc -i "${mmdPath}" -o "${svgPath}"`);
      //const svg = fs.readFileSync(svgPath, 'utf8');
      const svgRelPath = path.relative(path.dirname(file), svgPath).replace(/\\/g, '/');
      const svg = `<img src="${svgRelPath}" alt="diagram">`;
      $(el).parent().replaceWith(svg);
      fs.unlinkSync(mmdPath);
      //fs.unlinkSync(svgPath);
      console.log(`Replaced Mermaid diagram #${i + 1} in ${file}`);
    } catch (err) {
      console.error(`Failed to render Mermaid diagram #${i + 1}:`, err);
    }
  });

  fs.writeFileSync(file, $.html(), 'utf8');
  // console.log(`${file}: All Mermaid diagrams replaced with inline SVG!`);

});

console.log('All Mermaid diagrams in all files replaced with inline SVG!');