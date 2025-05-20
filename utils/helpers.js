import fs from 'fs';
function saveToFile(data, filename) {
    // check exist folder
    const folder = filename.split('/').slice(0, -1).join('/');
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder
            , { recursive: true });
    }
    console.log(`Saving file ${filename}`);
    if (!filename.endsWith('.json')) {
        throw new Error('Filename must have a .json extension');
    }
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}
function readFromFile(filename) {
    if (!filename.endsWith('.json')) {
        throw new Error('Filename must have a .json extension');
    }
    console.log(`Reading file ${filename}`);
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
}
async function saveToFileCSV(data, filename) {
    console.log(`Saving file ${filename}`);
    // check exist folder
    ensureFolderExists(filename);

    if (!filename.endsWith('.csv')) {
        throw new Error('Filename must have a .csv extension');
    }
    fs.writeFileSync(filename, data, 'utf-8');
}
function saveToFileSql(data, filename) {
    // check exist folder
    ensureFolderExists(filename);
    if (!filename.endsWith('.sql')) {
        throw new Error('Filename must have a .sql extension');
    }
    fs.writeFileSync(filename, data, 'utf-8');
}
function ensureFolderExists(filename) {
    const folder = filename.split('/').slice(0, -1).join('/');
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

export { saveToFile,readFromFile,saveToFileCSV,saveToFileSql };