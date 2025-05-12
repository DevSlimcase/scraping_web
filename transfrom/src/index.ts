
import { NewListAddress, CategoriesProvince, ListCommune } from './../project_types';
 } from './../project_types';
import { readFromFile, saveToFile,slug_generation } from './utils/index';

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
// const transformAddress = (address: ListCommune): OldListAddress[] => {
//     return address.map((commune) => {
//         const { Ma_Tinh, Ten_Tinh, Ma_Huyen, Ten_Huyen, Ma_Xa, Ten_Xa } = commune;

       
//         const formattedWard: OldWard = Ma_Xa ? [
//             Ma_Xa,
//             Ten_Xa,
//             'Xã',
//             formatAddressWard(Ten_Xa)
//         ] : [];

//         const formattedDistrict: OldCommunes = Ma_Huyen ? [
//             Ma_Huyen,
//             Ten_Huyen,
//             'Huyện',
//             formatAddressDistrict(Ten_Huyen),
//             [formattedWard] // OldListWard
//         ] : [];

//         const formattedProvince: OldListAddress = [
//             Ma_Tinh,
//             Ten_Tinh,
//             'Tỉnh',
//             formatAddressProvince(Ten_Tinh),
//             [formattedDistrict] // OldListCommune
//         ];

//         return formattedProvince;
//     });
// };


const getCategoriesProvinces = (address: ListCommune): CategoriesProvince => {
    let newAddress: CategoriesProvince = [];
    address.forEach((item) => {
        const { Ma_Tinh, Ten_Tinh, Ma_Huyen, Ten_Huyen, Ma_Xa, Ten_Xa } = item;
        let slug_province = formatAddressProvince(Ten_Tinh);
        if (newAddress.indexOf(slug_province) !== -1) {
            return;
        }
        newAddress.push(slug_province);
    })
    return newAddress;
}

const main = () => {
    const dataAddress: ListCommune = readFromFile<ListCommune>('src/data/commune.json');
    const new_address = getCategoriesProvinces(dataAddress);
    saveToFile(new_address, 'src/data/categories_provinces.json');
}
main();

