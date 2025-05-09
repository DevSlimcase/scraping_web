import { PageProvince } from "./pages.js"; // Import the PageProvince class for page handling

class Bot{
    constructor(client,name){
        this.client = client; // Set the client for the bot
        this.name = name;
        
    }
    async crawl(url) {
        throw new Error('Method "crawl" must be implemented'); // Abstract method for crawling
    }
}

class BotProvince extends Bot{
    async crawl(url){

        const html = await this.client.crawl(url); // Call the crawl method with the URL
        const page = new PageProvince(html); // Create an instance of PageProvince with the HTML content
        const data = page.get(); // Call the get method to extract data
        return data; // Return the HTML content
    }
}
class BotDistrict extends BotProvince{}

export { Bot,BotProvince,BotDistrict };