
import { PlaywrightCrawler, Dataset } from 'crawlee';
import { PageCommune } from './src/pages.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Initializes a PlaywrightCrawler instance to recursively crawl a website using the Crawlee framework.
 *
 * The crawler operates in three stages based on the `request.label`:
 * 1. **Start Page (no label):** Waits for a table with class 'table-customize', then enqueues links with the label 'DISTRICT'.
 * 2. **DISTRICT:** Waits for the same table, then enqueues links with the label 'WARDS'.
 * 3. **WARDS:** Extracts the page content, processes it with the `PageCommune` class, and pushes the extracted data to the dataset.
 *
 * Errors encountered during the 'WARDS' stage are logged and re-thrown.
 *
 * @type {PlaywrightCrawler}
 * @description
 * This crawler is designed to navigate a hierarchical website structure (e.g., provinces → districts → wards),
 * extracting data at the lowest level using the Crawlee framework and Playwright. It uses label-based navigation
 * to control the crawling depth and data extraction points.
 */
const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks }) => {
        console.log(`Processing: ${request.url}`);

        if (request.label === 'WARDS') {
            try {
                const raw_content = await page.content();
                const intance = new PageCommune(raw_content);
                const data = intance.get();
                await Dataset.pushData(data);
            } catch (err) {
                console.error(`Error processing DETAIL page: ${request.url} - ${err.message}`);
                throw err;
            }
            return;
        }

        if (request.label === 'DISTRICT') {
            await page.waitForSelector('table.table-customize');
            await enqueueLinks({
                selector: 'a.btn-warning',
                label: 'WARDS',
            });
            return;
        }

        // Start page (no label)
        await page.waitForSelector('table.table-customize');
        await enqueueLinks({
            selector: 'a.btn-warning',
            label: 'DISTRICT',
        });
    },
});

const host = process.env.HOST + 'Danhmuc/Dm_Tinh';
await crawler.run([host]);
