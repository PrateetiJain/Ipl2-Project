const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonPerYear = require("./ipl/matchesWonPerYear");
const extraRuns = require("./ipl/extraRuns");
const bowlersEconomy = require("./ipl/bowlersEconomy");
const topTenScorer = require("./ipl/topTenScorer");
const winByAllTeams = require("./ipl/winByAllTeams");
const manOfTheMatches = require("./ipl/manOfTheMatches");
const matchesWonPerVenue = require("./ipl/matchesWonPerVenue");
const dlMethod = require("./ipl/dlMethod");
const { match } = require("assert");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then(matches => {
      let dl = dlMethod(matches);
      saveDlMethod(dl);
      let venue = matchesWonPerVenue(matches);
      saveMatchesWonPerVeneu(venue);
      let player = manOfTheMatches(matches);
      saveManOfTheMatches(player);
      let win = winByAllTeams(matches);
      saveWinByAllTeams(win);
      let result = matchesPlayedPerYear(matches);
      saveMatchesPlayedPerYear(result);
      let wonTeam = matchesWonPerYear(matches);
      saveMatchesWonPerYear(wonTeam);
      csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries =>{
        let runs = extraRuns(matches,deliveries);
        saveExtraRuns(runs);
        let ecomony = bowlersEconomy(matches,deliveries);
        saveBowlersEconomy(ecomony);
        let score = topTenScorer(matches,deliveries);
        saveTenTopScorer(score);
      })
    });
}
var jsonData ={};
function saveMatchesPlayedPerYear(result) {
  jsonData.matchesPlayedPerYear = result;
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveMatchesWonPerYear(result) {
  jsonData.matchesWonPerYear = result;
  
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveExtraRuns(result) {
  jsonData.extraRuns = result;
 const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveBowlersEconomy(result) {
  jsonData.bowlersEconomy = result;
 const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveTenTopScorer(result) {
  jsonData.topTenScorer = result;
 const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveWinByAllTeams(result) {
  jsonData.winByAllTeams = result;
 const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveManOfTheMatches(result) {
jsonData.manOfTheMatches = result;
 const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
    if (err) {
      console.error(err);
    }
  });
}
function saveMatchesWonPerVeneu(result) {
  jsonData.matchesWonPerVenue = result;
   const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
      if (err) {
        console.error(err);
      }
    });
  }
  function saveDlMethod(result) {
    jsonData.dlMethod = result;
     const jsonString = JSON.stringify(jsonData);
      fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
          console.error(err);
        }
      });
    }
  


main();
