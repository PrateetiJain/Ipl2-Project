function manOfTheMatches(matches){
 
    const result ={};
    for(let match of matches){
        const player = match.player_of_match;
        if(result[player]){
            result[player]+=1;
        }
        else{
            result[player]=1;
        }
    }
    var arr = [];
    for (var i in result) {
    arr.push([i, result[i]]);
    }

    arr.sort(function(a, b) {
    return b[1] - a[1];});
return arr.slice(0,15);


}

module.exports = manOfTheMatches