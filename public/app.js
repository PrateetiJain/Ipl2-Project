

function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeWinByAllTeams(data.winByAllTeams);
  
   
  //visualizeExtraRuns(data.extraRuns);
  visualizeBowlersEconomy(data.bowlersEconomy);
  visualizeMathchesWonPerVenue(data.matchesWonPerVenue);
  visualizeMatchesWonPerYear(data.matchesWonPerYear);
  visualizeDlMethod(data.dlMethod);
  visualizeManOfTheMatches(data.manOfTheMatches);
  
  //visualizeTopTenScorer(data.topTenScorer);
  return;
}
var year
const form = document.querySelector('form')
form.addEventListener('submit', (e)=>{
  year = form.elements.year.value
  
  e.preventDefault()
  fetch(`/extraRuns?year=${year}`)
    .then(data => data.json())
    .then(visualizeCustomData)
})

function visualizeCustomData(data)
{
  document.querySelector("#extra-runs").innerHTML="", visualizeExtraRuns(data, year)
  return;
}
function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  var container1 = new Highcharts.chart( {
    chart: {
      renderTo:"container1",
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}
function visualizeWinByAllTeams(winByAllTeams) {
  const seriesData = [];
  for (let team in winByAllTeams) {
    seriesData.push([team, winByAllTeams[team]]);
  }

  container6 = new Highcharts.chart( {
    chart: {
        renderTo:"container6",
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Wins By All the Teams'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: seriesData
    }]
});
}

function visualizeMatchesWonPerYear(matchesWonPerYear) {
  const seriesData = []
  const season = Object.keys(matchesWonPerYear).map((season)=>season);
  const teams = [];
  for(let s=0;s<season.length;s++){
    
    teams.push(Object.keys(matchesWonPerYear[season[s]]));
    
  }
  
  const teamNames = [...new Set([].concat.apply([],teams))];

  for(let i in teamNames){
    let won = [];
    for(let j in season){
      if(matchesWonPerYear[season[j]].hasOwnProperty(teamNames[i])){
        won.push(matchesWonPerYear[season[j]][teamNames[i]])
      }
      else{
        won.push(0);
      }
    }
    seriesData.push({name:teamNames[i],data:won})
  }
  var container2= new Highcharts.chart( {
    chart: {
      renderTo:'container2',
        type: 'column'
    },
    title: {
        text: 'Total Wins Per Team Per Season'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
        categories:season,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Matches Won'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: seriesData
});
}

function visualizeExtraRuns(data, year) {
  let seriesData=[];
  for (let team in data) {
    seriesData.push([team, data[team]]);
  }
   Highcharts.chart("extra-runs", {
    chart: {
      
      type: "column"
    },
    title: {
      text: "Extra runs conceded by each team in "+year
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData
      }
    ]
  });
}
function visualizeBowlersEconomy(bowlersEconomy) {
  const seriesData = [];
  var bowlers = Object.values(bowlersEconomy);
  bowlers.map((obj)=> seriesData.push([obj.bowler,parseFloat(obj.economy)]));

  var container4 = new Highcharts.chart( {
    chart: {
      renderTo:"container4",
      type: "column"
    },
    title: {
      text: "Best Economy in Season 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Bowlers",
        data: seriesData
      }
    ]
  });
}
function visualizeTopTenScorer(topTenScorer) {
  const seriesData = [];
  var scorer = Object.values(topTenScorer);
  scorer.map((obj)=> seriesData.push([obj[0],obj[1]]));

  var container5 = new Highcharts.chart( {
    chart: {
      renderTo:"container5",
      type: "column"
    },
    title: {
      text: "Top ten batsman in 2017 season"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Score"
      }
    },
    series: [
      {
        name: "Batsman",
        data: seriesData
      }
    ]
  });
}
function visualizeManOfTheMatches(manOfTheMatches) {
  const seriesData = [];
  var player = Object.values(manOfTheMatches);
  player.map((obj)=> seriesData.push([obj[0],obj[1]]));

  var container7 = new Highcharts.chart( {
    chart: {
      renderTo:"container7",
      type: "column"
    },
    title: {
      text: "Most Man of Matches Across All Season"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Players",
        colorByPoint: true,
        data: seriesData
      }
    ]
  });
}
function visualizeMathchesWonPerVenue(matchesWonPerVenue) {
  const seriesData = [];
  const team =[];
  const venues = Object.keys(matchesWonPerVenue);

  for(let i =0;i<venues.length;i++){
    team.push(Object.keys(matchesWonPerVenue[venues[i]]));
  }
  const teams = [...new Set([].concat.apply([],team))];
  for(let i in teams){
    let temp =[];
    for(let j in venues){
      if(matchesWonPerVenue[venues[j]].hasOwnProperty(teams[i]))
        temp.push(matchesWonPerVenue[venues[j]][teams[i]]);
      else temp.push(0);  
    }
  seriesData.push({name:teams[i],data:temp});
  }
  

  var container8 = new Highcharts.chart( {
    chart: {
      renderTo:"container8",
      type: "bar"
    },
    title: {
      text: "Matches Won By each Team Per Venue"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      categories: venues,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    legends:{
      reversed:true
    },
    plotOptions:{
      series:{
        stacking:"normal"
      }
    },  
    series: seriesData
  });
}
function visualizeDlMethod(dlMethod) {
  const seriesData = [];
  for (let year in dlMethod) {
    seriesData.push([year, dlMethod[year]]);
  }

  var container9 = new Highcharts.chart( {
    chart: {
      renderTo:"container9",
      type: "column"
    },
    title: {
      text: "Most Matches Won By Team(DL Method)"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Teams",
        data: seriesData
      }
    ]
  });
}
