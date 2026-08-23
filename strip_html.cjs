const fs = require('fs');
let fileContent = fs.readFileSync('src/services/blogService.ts', 'utf8');

// Use regex to strip <h2> and <p> tags
fileContent = fileContent.replace(/<h2>/g, '')
                         .replace(/<\/h2>/g, '\n\n')
                         .replace(/<p>/g, '')
                         .replace(/<\/p>/g, '\n\n');

fs.writeFileSync('src/services/blogService.ts', fileContent);
