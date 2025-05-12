function createNewData(file_json) {
    const result = [];
    const provinces = Object.keys(file_json);
    for (const provinceCode of provinces) {
        let city_no = provinceCode;
        let city_name = file_json[provinceCode]["name"];
        let type = file_json[provinceCode]["type"];
        let slug_name = file_json[provinceCode]["slug"];
        let name_with_type = file_json[provinceCode]["name_with_type"];
        let list_district = transformDistrict(file_json[provinceCode]["quan-huyen"]);
        result.push([city_no, city_name, type, slug_name, name_with_type, list_district]);
    }

    return result;
}
function transformDistrict(nodes) {

    const result = [];
    const districts = Object.keys(nodes);
    for (const districtCode of districts) {
        let district_name = nodes[districtCode]["name"];
        let type = nodes[districtCode]["type"];
        let slug_name = nodes[districtCode]["slug"];
        let name_with_type = nodes[districtCode]["name_with_type"];
        let list_ward = transformWard(nodes[districtCode]["xa-phuong"]);
        result.push([districtCode, district_name, type, slug_name, name_with_type, list_ward]);
    }
    return result;
}
function transformWard(nodes) {
    const result = [];
    const wards = Object.keys(nodes);
    for (const wardCode of wards) {
        let ward_name = nodes[wardCode]["name"];
        let type = nodes[wardCode]["type"];
        let slug_name = nodes[wardCode]["slug"];
        let name_with_type = nodes[wardCode]["name_with_type"];
        result.push([wardCode, ward_name, type, slug_name, name_with_type]);
    }
    return result;
}

require// Example usage:
const tree = require('./data/tree.json');
const result = createNewData(tree);
function saveToFile(data, filename) {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}

saveToFile(result, 'new_data.json');
