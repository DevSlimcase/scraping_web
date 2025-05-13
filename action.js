import { BotProvince,BotDistrict,BotCommune } from "./crawler/bot.js"; // Import the Bot class for bot handling
import { RequestStrategySelector } from "./crawler/requestAPIStrategy.js"
import WebCrawler from "./crawler/crawler.js"; // Import the WebCrawler class for web crawling
import { saveToFile,readFromFile } from "./utils.js"; // Import the saveToFile function for saving data to a file

const properties = { 
    domain: 'https://thongkehochiminh.gso.gov.vn', // Domain for the bot
    client: new WebCrawler('https://thongkehochiminh.gso.gov.vn') // Create an instance of WebCrawler
}

const extractLinksError = (data)=>{
    const result = []
    data.forEach((item) => {
        if (item.error) {
            result.push(item.url)
        } 
    });
    return result
}
const extractLinksSuccess = (data)=>{
    const result = []
    data.forEach((item) => {
        if (!item.error) {
            result.push(item.url)
        } 
    });
    return result
}

const miningDistrictData = async ()=>{
    const folder = "./data/crawler/new" // Folder to save the data
    const file_name = 'district'

    const list_links = readFromFile(`${folder}/province.json`); // Read the data from the file
    const botDistrict = new BotDistrict(properties.client,"DM_Huyen")
    let strategy = RequestStrategySelector.getStrategy(list_links); // Get the request strategy based on the data and client
    strategy.setClient(botDistrict); // Set the client for the strategy
    const data = await strategy.execute("crawl"); // Execute the strategy to process the data
    
    const newFolder = `./data/crawler/full` // Create a new folder to save the data
    saveToFile(data,convensionFileName(newFolder,file_name,1)) // Save the data to a file
    // loopCrawlerDistrict(folder,file_name,1)
}
const convensionFileName = (folder,filename,no)=>{
    // const symbol = ['-','_','@']

    return `${folder}/${filename}__${no}.json`
}
const loopCrawlerDistrict = async (folder,name,no=1)=>{
    
    const list_links = readFromFile(convensionFileName(folder,name,no)); // Read the data from the file
    const errorLinks = extractLinksError(list_links)
    if(errorLinks.length === 0){
        console.log("All links are valid");
        return;
    }
    const botDistrict = new BotDistrict(properties.client,"DM_Huyen")
    let strategy = RequestStrategySelector.getStrategy(errorLinks); // Get the request strategy based on the data and client
    strategy.setClient(botDistrict); // Set the client for the strategy
    const data = await strategy.execute("crawl"); // Execute the strategy to process the data
    saveToFile(data,convensionFileName(folder,name,no+1)) // Save the data to a file
    // wait file saved
    // await new Promise(resolve => setTimeout(resolve, 5000));
    return await loopCrawlerDistrict(folder,name,no+1) // Recursively call the function to process the next set of data
}
const miningWardData = async ()=>{
    const folder = "./data/crawler/full" // Folder to save the data
    const file_name = 'wards'

    const list_links = readFromFile(`${folder}/district_full.json`); // Read the data from the file
    const botCommune = new BotCommune(properties.client,"DM_Xa")
    let strategy = RequestStrategySelector.getStrategy(list_links); // Get the request strategy based on the data and client
    strategy.setClient(botCommune); // Set the client for the strategy
    const data = await strategy.execute("crawl"); // Execute the strategy to process the data
    
    const newFolder = `./data/crawler/full` // Create a new folder to save the data
    saveToFile(data,`${newFolder}/${file_name}.json`) // Save the data to a file
}
const parseArray = (data) => {
    return data.flat(); // Flatten the array to remove nested arrays
};
const action = async ()=>{
    // miningDistrictData()
    // const folder = "./data/crawler/full" // Folder to save the data
    // const file_name = 'district_full'
    // const list_links = readFromFile(`${folder}/district.json`); // Read the data from the file
    // const data = parseArray(list_links)
    // saveToFile(data,`${folder}/${file_name}.json`) // Save the data to a file
    // miningWardData()
    
    // const folder = "./data/crawler/full" // Folder to save the data
    // const file_name = 'wards_full'
    // const list_links = readFromFile(`${folder}/wards.json`); // Read the data from the file
    // const data = parseArray(list_links)
    // saveToFile(data,`${folder}/${file_name}.json`) // Save the data to a file
}

action()
.then((result) => {
    console.log(result); // Handle the result here
}).catch((error) => {
    console.error(error); // Handle errors here
});