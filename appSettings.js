var devFt1Settings = require("../api-testing/appSettings-dev-ft1.json");
var devRtlSettings = require("../api-testing/appSettings-dev-rtl.json");

// command line example - npm start -- --env=ft1

let settingsObj = process.argv[process.argv.length - 1].includes("--env=ft1") ? devFt1Settings : devRtlSettings;
console.log("Running tests on ", settingsObj.name);
module.exports.settings = settingsObj;