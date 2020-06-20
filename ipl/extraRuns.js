function extraRuns(matches,deliveries){

    const result={};
    
     for(let match of matches){
         const season = match.season;
        // if(season == 2016){
            
             const matchId = match.id;
             for(let delivery of deliveries){
                     const delId = delivery.match_id;
                     if(matchId == delId){
                     const teams = delivery.bowling_team;
                     const extra_runs = parseInt(delivery.extra_runs);
                     if(result[season]){
                     
                     if(result[season][teams]){
                         result[season][teams]+=extra_runs;
                     }
                     else{
                         result[season][teams]=extra_runs;
                         }
                     }
                     else{
                        result[season]={}
                    }
                 }
             }
             
         }
             
     
     return result;
 }
 module.exports = extraRuns;