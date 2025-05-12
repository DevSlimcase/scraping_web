import { PageProvince,PageDistrict,PageCommune } from "./pages.js"; // Import the PageProvince class for page handling

class Bot{
    constructor(client,name){
        this.client = client; // Set the client for the bot
        this.name = name;
        
    }
    async crawl(url) {
        throw new Error('Method "crawl" must be implemented'); // Abstract method for crawling
    }

    async processPage(url, PageClass) {
        const html = await this.client.crawl(url); // Call the crawl method with the URL
        if (html === 'error') {
            return { error: 'Failed to fetch data', url }; // Handle error case
        }
        const page = new PageClass(html); // Create an instance of the specified PageClass with the HTML content
        const data = page.get(); // Call the get method to extract data
        return data; // Return the extracted data
    }
}

class BotProvince extends Bot{
    async crawl(url){
        return this.processPage(url, PageProvince); // Use processPage with PageProvince
    }
}
class BotDistrict extends BotProvince{
    async crawl(url){
        return this.processPage(url, PageDistrict); // Use processPage with PageDistrict
    }
}
class BotCommune extends BotDistrict{
    async crawl(url){
        return this.processPage(url, PageCommune); // Use processPage with PageCommune
    }
}


export { Bot,BotProvince,BotDistrict,BotCommune };