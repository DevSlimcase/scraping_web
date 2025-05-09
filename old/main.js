function getListNumber(tree) {
    const result = [];

    for (const provinceCode in tree) {
        const province = tree[provinceCode];
        const districts = [];

        for (const districtCode in province["quan-huyen"]) {
            const district = province["quan-huyen"][districtCode];
            const wards = Object.keys(district["xa-phuong"] || {});
            districts.push({ [districtCode]: wards });
        }

        result.push({ [provinceCode]: districts });
    }

    return result;
}

const schema_listWithCount = {
    "count": "number",
    "list": [
        {
            "count": "number",
            "list": [
                {
                    "count": "number"
                }
            ]
        }
    ]
}

function getListWithCount(data = []) {
    const result = {
        count: data.length,
        list: data.map(level1 => {
            const level1Key = Object.keys(level1)[0];
            const level1Value = level1[level1Key];
            return {
                count: level1Value.length,
                list: level1Value.map(level2 => {
                    const level2Key = Object.keys(level2)[0];
                    const level2Value = level2[level2Key];
                    return {
                        count: level2Value.length
                    };
                })
            };
        })
    };
    return result;
}

function saveToFile(data, filename) {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}

// Example usage:
const tree = require('./data/tree.json');
const result = getListNumber(tree);

if(result && result.length > 0 && result[0]) {
    const wards = result[0];
    console.log(wards); // Output: [ { '001': [ '001' ] }, { '002': [ '001', '002' ] } ]
}
// saveToFile(result, 'output.json');
const count_list = getListWithCount(result);
saveToFile(count_list, 'output_count.json');
// console.log(getListNumber(tree));

