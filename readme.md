# Crawler Web

This project is a tool designed to scrape administrative data of Vietnam, including provinces, districts, communes, and wards, from government websites. It automates the process of navigating links and extracting data into JSON format for further use.

# stacks
- Nodejs
- npm

# Folders Structure
- **/src**: Contains the source code for the project.
  - **/bots**: Includes bot implementations for "dò đường" and "lấy dữ liệu".
  - **/scraper**: Handles the scraping logic and navigation.
  - **/data**: Stores extracted data in JSON format.
  - **/cli**: Manages the command-line interface for the tool.
  - **/logs**: Contains log files for monitoring and debugging.
- **/config**: Configuration files for specifying target tables and settings.
- **/tests**: Unit and integration tests for the project.

## Core Components
- **Scraper**: Implements the scraping logic using the Template Method and Strategy patterns.
- **Bot Factory**: Creates specific bots for "dò đường" and "lấy dữ liệu" using the Factory pattern.
- **Data Processor**: Processes and formats data using the Builder and Adapter patterns.
- **CLI Interface**: Manages user commands using the Command pattern.
- **Logger**: Observes and logs events using the Observer pattern.