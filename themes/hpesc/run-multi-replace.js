const { replaceInFile } = require('replace-in-file');
// console.log(typeof replaceInFile); // Should print 'function'
const replacements = [
  { from: /\{\{\%release\%\}\}/g, to: 'latest', cnt: "350 changes/110 files" },
  { from: /\{\{% release %\}\}/g, to: 'latest', cnt: "3 changes/3 files" },
  { from: /([^!])\[(([^\]]+))\]\((\/[^)]*)\)/g, to: '$1[$2]({{< ref "$4" >}})', cnt: "364 changes/119 files" },
  { from: /((\[[^\]]+\]\(\{\{<\s*ref\s*"[^"]*?)\/("\s*>\}\}\)))/g, to: '$2$3', cnt: "83 changes/47 files" },
  { from: /(\[[^\]]+\]\(\{\{<\s*ref\s*"[^"]*)\/(#[^"]*"\s*>\}\}\))/g, to: '$1$2', cnt: "17 changes/12 files" },
  { from: /([^!])\[(([^\]]+))\]\(([^/h{#][^)]*)\)/g, to: '$1[$2]({{< relref "$4" >}})', cnt: "432 changes/209 files" },
  { from: /(\[[^\]]+\]\()\{\{<\s*relref\s*"([^"]*?(\.csv|\.html|\.py|\.zip|\.txt|@|\.jsonnet|Dockerfile)[^"]*?)("\s*>\}\}\))/g, to: '$1$2', cnt: "29 changes/6 files" },
 { from: /(\[[^\]]+\]\()\{\{<\s*ref\s*"([^"]*?(\.csv|\.html|\.py|\.zip|\.txt|@|\.jsonnet|Dockerfile)[^"]*?)("\s*>\}\}\))/g, to: '$1$2', cnt: "29 changes/6 files" }, 
  // Add more regex replacements here...
];

(async () => {
  for (const { from, to, cnt } of replacements) {
    const results = await replaceInFile({
      files: 'content/**/*.md',
      ignore: [
        'content/.archive/**',        // Exclude everything in archive
        'content/2.6.x/**',          // Exclude everything in 2.6.x
        'content/2.7.x/**',          // Exclude everything in 2.7.x
        'content/2.8.x/**'         // Exclude everything in 2.8.x
        // Add more patterns as needed
      ],
      from,
      to,
      countMatches: true,
    });
    let count = 0
    let matches = 0
    let rep = 0
    results.forEach(result => {
     // console.log(result.file);
     if (result.hasChanged) {
      //console.log(result.file, 'changed:', result.hasChanged, 'matches:', result.numMatches, 'replacements:', result.numReplacements);
      matches = matches + result.numMatches
      rep = rep + result.numReplacements
      count += 1
     }
    });
    console.log(`Pattern: ${from}`);
    console.log(`VScode: ${cnt}`);
    console.log(`Node.js ${rep} replacements in ${count} files.`);
  }
})();