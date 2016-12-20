const request = require('request');
const rq = require("request-promise");
const jsonfile = require('jsonfile');
const chalk = require('chalk');
const fs = require("fs");

function fromatData(path,name){
	return new Promise((resolve,reject)=>{
		fs.readFile(path,(error,data)=>{
			if(error){
				reject(error);
			}
			else{
				let datastring = data.toString();
				let appendDot = datastring.replace(/}/gi,"},");
				resolve(appendDot);
			}
		})
	}).then(data=>{
		// define data
		const start = "let Data =[";
		const end = "];module.exports = Data;";

		fs.writeFile("./Crawler/data/"+name+".js",start+data+end,(error)=>{
			if(!error){
				console.log(chalk.green("follow.js file ready to start use."));
				Promise.resolve();
			}
		})
	});
}

// fromatData("./data/follow.json");
module.exports = fromatData;