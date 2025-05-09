import fs from 'fs';
function saveToFile(data, filename) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}
function readFromFile(filename) {
    if (!fs.existsSync(filename)) {
        throw new Error(`File ${filename} does not exist`);
    }
    const data = fs.read(filename, 'utf-8');
    return JSON.parse(data);
}

export { saveToFile,readFromFile };