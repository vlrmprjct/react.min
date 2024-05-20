const fs = require('fs');
const path = require('path');

const checkAndImport = (filePath, importPath) => {
    const resolvedPath = path.resolve('node_modules', filePath);
    return fs.existsSync(resolvedPath) ? `@import '${importPath}';\n` : '';
};

module.exports = (source) => {
    let importState = '';
    // Check if @billomat/ui/dist/index.css exists, we are npm unlinked
    importState += checkAndImport('@billomat/ui/dist/index.css', '~@billomat/ui/dist/index.css');
    // Check if @billomat/ui/src/scss/base.scss exists, we are npm linked
    importState += checkAndImport('@billomat/ui/src/scss/base.scss', '@billomat/ui/src/scss/base.scss');
    return importState + source;
};
