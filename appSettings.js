var devFt1Settings = require("../api-testing/appSettings-dev-ft1.json");
var devRtlSettings = require("../api-testing/appSettings-dev-rtl.json");

let settingsObj = process.env["env"] === "ft1" ? devFt1Settings : devRtlSettings;
console.log("Env", process.env["env"]);
module.exports.settings = settingsObj;