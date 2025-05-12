import axios from 'axios';
class WebCrawler{
    constructor(domain) {
        this.domain = domain; // Set the domain for the crawler
        this.buildClient(); // Build the axios client with the specified domain
    }
    buildClient() {
        this.client = axios.create({
            baseURL: this.domain, // Base URL for the bot
            timeout: 10000, // Timeout for requests
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' // User-Agent header
            }
        });
    }
    async crawl(path) {
        try {
            const timestamp = new Date().toISOString(); // Get the current timestamp
            console.log(`Crawling started... ${timestamp}`); // Log the start of the crawling process
            const response = await this.client.get(path); // Fetch the HTML content from the URL using the client
            if (response.status !== 200) {
                throw new Error(`Failed to fetch data from ${this.domain}${path}. Status code: ${response.status}`); // Check for successful response
            }
            const data = response.data; // Get the HTML content from the response
            return data; // Return the HTML content
        } catch (error) {
            console.error('Crawling failed:', error.message);
            return 'error'
        }
    }
}

export default WebCrawler; // Export the WebCrawler class