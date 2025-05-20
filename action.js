import { BotProvince, BotDistrict, BotCommune } from "./src/bot.js";
import { RequestStrategySelector } from "./src/requestAPIStrategy.js";
import WebCrawler from "./src/crawler.js";
import { saveToFile, readFromFile } from "./utils/index.js";
import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const flatData = (data) => data.flat();
class BuildMachine {
    constructor(properties) {
        this.properties = properties;
        this.client = null;
        this.folder = null;
        this.file_name = null;
        this.input = null;
        this.type = null;
        this.bot = null;
    }
    setType(value) {
        this.type = value;
    }
    buildClient(){
        
        if(!this.properties.client) throw new Error(`not exist client in properties`);
        
        this.client = this.properties.client;
    }
    buildFolder(){
        if(!this.properties.folder) throw new Error(`not exist folder in properties`);
        
        this.folder = this.properties.folder;
    }
    buildFileName() {
        if(!this.properties.file_name[this.type]) throw new Error(`not exist file_name in properties`);
        
        this.file_name = this.properties.file_name[this.type];

        if(!this.file_name) throw new Error(`not exist file_name in properties`);
    }
    buildInput(){
        if(this.type === 'province'){
            this.input = this.properties.start_path; return;
        }
        if(this.type === 'district'){
            this.input = readFromFile(`${this.folder}/${this.properties.file_name.province}`); return;
        }
        if(this.type === 'commune'){
            this.input = readFromFile(`${this.folder}/${this.properties.file_name.district}`); return;
        }
        throw new Error(`Invalid type ${this.type}`);
    }
    buildBotClass(){
        if(this.type === 'province'){
            this.bot = new BotProvince(this.client, this.type); return;
        }
        if(this.type === 'district'){
            this.bot = new BotDistrict(this.client, this.type); return;
        }
        if(this.type === 'commune'){
            this.bot = new BotCommune(this.client, this.type); return;
        }
    }
    build(){
        this.buildClient();
        this.buildFolder();
        this.buildFileName();
        this.buildInput();
        this.buildBotClass();
    }
    extractFileToCsv(){
        // run python convert/action.py
        const command = `python convert/action.py ${this.folder}/${this.file_name}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
    async miningData() {
        this.build();
        const strategy = RequestStrategySelector.getStrategy(this.input);
        strategy.setClient(this.bot);
        const data = await strategy.execute("crawl");
        const flatDataResult = flatData(data);
        saveToFile(flatDataResult, `${this.folder}/${this.file_name}`);
        
        if(this.type === 'commune') this.extractFileToCsv()
        console.log(`Data ${this.type} has been saved to file ${this.file_name}`);
    }
}

const action = async () => {
    const host = process.env.HOST || 'localhost';

    const properties = { 
        domain: host,
        client: new WebCrawler(host),
        folder: "./data",
        file_name: {
            province: 'province.json',
            district: 'district.json',
            commune: 'commune.json'
        },
        start_path: '/Danhmuc/Dm_Tinh',
    };

    let buildMachine = new BuildMachine(properties);

    buildMachine.setType('province');
    await buildMachine.miningData();

    buildMachine.setType('district');
    await buildMachine.miningData();

    buildMachine.setType('commune');
    await buildMachine.miningData();
    
};

action()
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.error(error);
    });
