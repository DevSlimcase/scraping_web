import { BotProvince,BotDistrict } from "./crawler/bot.js"; // Import the Bot class for bot handling
import { RequestStrategySelector } from "./crawler/requestAPIStrategy.js"
import WebCrawler from "./crawler/crawler.js"; // Import the WebCrawler class for web crawling
import { saveToFile,readFromFile } from "./utils.js"; // Import the saveToFile function for saving data to a file

const properties = { 
    domain: 'https://thongkehochiminh.gso.gov.vn', // Domain for the bot
    client: new WebCrawler('https://thongkehochiminh.gso.gov.vn') // Create an instance of WebCrawler
}

const action = async ()=>{
    const folder = "./data/crawler" // Folder to save the data
    
    const list_links = '/Danhmuc/Dm_Tinh'
    const botProvince = new BotProvince(properties.client,"DM_Tinh")
    let strategy = RequestStrategySelector.getStrategy(list_links); // Get the request strategy based on the data and client
    strategy.setClient(botProvince); // Set the client for the strategy
    const data = await strategy.execute("crawl"); // Execute the strategy to process the data
    return data
    //
    //// saveToFile(data,`${folder}/province.json`) // Save the data to a file

    // const data = readFromFile(`${folder}/province.json`); // Read the data from the file


    // const slice_data = data.slice(4, 2); // Slice the data to get the first 5 items

    // let strategy2 = RequestStrategySelector.getStrategy(slice_data); // Get the request strategy based on the data and client
    // const botDistrict = new BotDistrict(crawler,"DM_Huyen")
    // strategy2.setClient(botDistrict); // Set the client for the strategy
    // const data2 = await strategy2.execute("crawl"); // Execute the strategy to process the data
    // return data2; // Return the data
    
}

action()
.then((result) => {
    console.log(result); // Handle the result here
}).catch((error) => {
    console.error(error); // Handle errors here
});