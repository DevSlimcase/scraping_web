import fs from 'fs';

function saveToFile(data: unknown, filename: string): void {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}

function readFromFile<T>(filename: string): T {
    if (!filename.endsWith('.json')) {
        throw new Error('Filename must have a .json extension');
    }
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data) as T;
}
function translateSlugToVietnamese(value: string): string {
    
        const vietnameseToAsciiMap = readFromFile<Record<string, string>>('src/data/vietnamese.json');
        // looping through the object and replacing the keys with the values
        let slug = value.toLowerCase();
        for (const key in vietnameseToAsciiMap) {
            if (vietnameseToAsciiMap.hasOwnProperty(key)) {
                slug = value.replace(new RegExp(key, 'g'), vietnameseToAsciiMap[key as keyof typeof vietnameseToAsciiMap]);
            }
        }   
        // remove all special characters
        slug = slug.replace(/[^a-zA-Z0-9]/g, '');
        // remove all spaces
        slug = slug.replace(/\s+/g, '-');
        return slug;
}

export { saveToFile, readFromFile,translateSlugToVietnamese };