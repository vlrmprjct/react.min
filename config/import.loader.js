const fs = require('fs');
const path = require('path');

module.exports = (source) => {
    let importState = '';
    let filePath = '';

    // Check if @billomat/ui/dist/index.css exists, we are npm unlinked
    filePath = path.resolve('node_modules', '@billomat/ui/dist/index.css');
    if (fs.existsSync(filePath)) {
        importState += `@import '~@billomat/ui/dist/index.css';\n`;
    }

    // Check if @billomat/ui/src/scss/base.scss exists, we are npm linked
    filePath = path.resolve('node_modules', '@billomat/ui/src/scss/base.scss');
    if (fs.existsSync(filePath)) {
        importState += `@import '@billomat/ui/src/scss/base.scss';\n`;
    }

    return importState + source;
};
