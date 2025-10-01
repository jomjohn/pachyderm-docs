const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');

const htmlFiles = glob.sync('public/**/*.html'); // Adjust path as needed

htmlFiles.forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);

  $('table.stacktable').each((i, table) => {
    const $table = $(table);
    const $rows = $table.find('tr');
    if ($rows.length < 2) return;

    const $ths = $rows.eq(0).find('th,td');
    const $tds = $rows.eq(1).find('td,th');

    const newRows = [];
    $ths.each((idx, th) => {
      // Clone the original <th> with all attributes and content
      const thHtml = $.html($(th));
      newRows.push(`<tr>${thHtml}</tr>`);
      if ($tds.length > idx) {
        const tdHtml = $.html($tds.eq(idx));
        newRows.push(`<tr>${tdHtml}</tr>`);
      }
    });

    $table.html(newRows.join('\n'));
  });
  $('div.highlight pre.chroma').removeClass('chroma').addClass('pre codeblock');

  fs.writeFileSync(file, $.html(), 'utf8');
  console.log(`Reformatted tables in: ${file}`);
});