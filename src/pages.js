import * as cheerio from 'cheerio'; // Corrected import statement for cheerio
class page {
    constructor(raw) {
        this.raw = raw; // Store the raw HTML content
        this.data = null
    }
    extractData() {
        return this.data; // Return the extracted data array
    }
    get(){
        if(this.data) {
            return this.data; // Return the parsed data if already available
        }
        return this.extractData(); // Otherwise, extract data from the raw HTML
    }
}
class PageProvince extends page {
    filters() {
        // Add validation logic here if needed
        const ignore_list = ["/Danhmuc/Dm_Tinh"]; // List of values to ignore
        this.data = this.data.filter(item => !ignore_list.includes(item)); // Filter out ignored values
        return this.data; // Return the filtered data
    }
    extractData() {
        const $ = cheerio.load(this.raw); // Load the table HTML into cheerio
        const links = []; // Array to store extracted links
        const section = $('section.featured-posts'); // Find the first section element
        const table = section.find('table'); // Find the first table element within the section
        if (table.length === 0) {
            throw new Error('No table found in the section.');
        }
        table.find('a').each((index, element) => { // Iterate over each anchor tag in the table
            const link = $(element).attr('href'); // Get the href attribute of the anchor tag
            if (link) {
                links.push(link); // Add the link to the array if it exists
            }
        });
        this.data = links; // Store the extracted links in the data property
        return this.filters(); // Return the filtered array of extracted data

    }
}
class PageDistrict extends PageProvince {}
class PageCommune extends PageProvince {
    getHeader(table){
        const $ = cheerio.load(this.raw); // Load the table HTML into cheerio
        const header = []; // Array to store header values
        table.find('thead th').each((index, element) => { // Iterate over each header cell in the table
            const text = $(element).text().trim(); // Get the text content of the header cell
            if (text) {
                header.push(text); // Add the text to the header array if it exists
            }
        });
        return header; // Return the array of header values
    }
    getData(table){
        const $ = cheerio.load(this.raw); // Load the table HTML into cheerio
        const rows = []; // Array to store row data
        table.find('tbody tr').each((index, element) => { // Iterate over each row in the table body
            const row = []; // Array to store cell values for the current row
            $(element).find('td').each((i, el) => { // Iterate over each cell in the current row
                const text = $(el).text().trim(); // Get the text content of the cell
                if (text) {
                    row.push(text); // Add the text to the row array if it exists
                }
            });
            rows.push(row); // Add the current row to the rows array
        });
        return rows; // Return the array of rows
    }
    extractData(){
        const $ = cheerio.load(this.raw); // Load the table HTML into cheerio
        const section = $('section.featured-posts'); // Find the first section element
        const table = section.find('table'); // Find the first table element within the section
        if (table.length === 0) {
            throw new Error('No table found in the section.');
        }
        const rows = this.getData(table); // Get the data from the table
        const header = this.getHeader(table); // Get the header from the table
        const data = rows.map(row => {
            const obj = {}; // Create an object to store key-value pairs for the current row
            row.forEach((value, index) => { // Iterate over each value in the row
                const key = header[index]; // Get the corresponding header value for the current index
                if (key) {
                    obj[key] = value; // Add the key-value pair to the object
                }
            });
            return obj; // Return the object representing the current row
        })
        this.data = data; // Store the extracted data in the data property
        return this.data; // Return the extracted data array
        
    }
}

export { page, PageProvince, PageDistrict, PageCommune };