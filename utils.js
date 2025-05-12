import fs from 'fs';
function saveToFile(data, filename) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}
function readFromFile(filename) {
    if (!filename.endsWith('.json')) {
        throw new Error('Filename must have a .json extension');
    }
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
}

export { saveToFile,readFromFile };