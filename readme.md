# Vietnam Administrative Data Crawler

A tool to automatically scrape and extract administrative data of Vietnam (provinces, districts, communes, and wards) from government websites. The data is output in JSON and can be converted to CSV for further use.

## Features
- Crawls hierarchical administrative data: provinces, districts, communes, wards
- Outputs data in JSON format
- Converts JSON to CSV via Python script
- Automated setup for both Node.js and Python environments

## Tech Stack
- Node.js (JavaScript)
- Python
- npm

## Prerequisites
- Node.js (v16+ recommended)
- npm
- Python 3.7+

## Installation

### Linux
```sh
chmod +x setup_project.sh && bash setup_project.sh
```

### Windows
```powershell
./setup_project.sp1
```

This will install all Node.js and Python dependencies.

## Usage

### 1. Crawl Data
Run the main crawler script:
```sh
node action.js
```
This will generate JSON files in the `data/` directory:
- `province.json`
- `district.json`
- `commune.json`

### 2. Convert JSON to CSV
To convert a JSON file (e.g., commune.json) to CSV, run:
```sh
python convert/action.py data/commune.json
```
The CSV output will be saved in the same directory.

## Project Structure
```
├── action.js                # Main entry point for crawling
├── convert/
│   ├── action.py            # Python script for JSON to CSV conversion
│   └── requirements.txt     # Python dependencies
├── data/                    # Output data (JSON/CSV)
├── src/                     # Crawler source code
├── utils/                   # Utility functions
├── setup_project.sh         # Linux setup script
├── setup_project.sp1        # Windows setup script
├── package.json             # Node.js dependencies and scripts
└── readme.md                # Project documentation
```

## Contributing
Pull requests and issues are welcome! Please open an issue to discuss your ideas or report bugs.

For more information or to connect, visit [mrlehue.com](https://mrlehue.com).

## License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.