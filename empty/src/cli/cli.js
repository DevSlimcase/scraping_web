// Command-line interface logic
const { program } = require('commander');

program
    .version('1.0.0')
    .description('CLI for the Crawler Web project')
    .command('scrape', 'Run the scraper')
    .parse(process.argv);