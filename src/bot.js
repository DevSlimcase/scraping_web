import { PageProvince,PageDistrict,PageCommune } from "./pages.js"; // Import the PageProvince class for page handling

class Bot{
    constructor(client,name){
        this.client = client; // Set the client for the bot
        this.name = name;
        
    }
    async crawl(url) {
        throw new Error('Method "crawl" must be implemented'); // Abstract method for crawling
    }
    async wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    async crawlAgian(url,PageClass,attempts = 0) {
        const pools = {
            1: 1000,
            2: 3000,
            3: 5000,
        }
        await this.wait(pools[attempts]); // Wait for the specified time before retrying
        return await this.processPage(url, PageClass, attempts + 1); // Retry the processPage method with incremented attempts
    }
    async processPage(url, PageClass,attempts = 0) {
        const html = await this.client.crawl(url); // Call the crawl method with the URL
        if(attempts < 4 && html === 'error'){
            this.client.buildClient(); // Rebuild the client if an error occurs
            return await this.crawlAgian(url,PageClass,attempts); // Retry the crawl if it fails
        }
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