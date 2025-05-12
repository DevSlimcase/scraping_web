import { NewListAddress, CategoriesProvince, ListCommune, CategoriesDistrict,CategoriesWard } from './../project_types';
import { Client,readFromFile, saveToFile,slug_generation } from './utils/index';

const formatAddressProvince = (value:string):string => {
    // input value = 'Tỉnh Hà Giang'
    // output value = 'tinh-ha-giang'
    if(typeof value !== 'string') {
        return "empty";
    }
    return slug_generation(value)
}
const formatAddressDistrict = (value:string):string => {
    return formatAddressProvince(value);
}
const formatAddressWard = (value:string):string => {
    return formatAddressProvince(value);
}

const main = async () => {
    // const instance = new Client('http://localhost:2304/vn/api/commune');
    // const list_province = await instance.post('/province', {});
    // console.log(list_province);

    // const list_district = await instance.post('/district', {
        // ma_tinh: 74})
    // console.log(list_district);

    // const commune = await instance.post('/',{
    // "ma_huyen":720
    // });
    // console.log(commune);

    const data : ListCommune = readFromFile('./src/data/commune.json');
    console.log(data.length);

}
main();

