function dlMethod(matches){

    const result={};
    for(let match of matches){
        const dl = match.dl_applied;
        if(dl == 1){
            const winner = match.winner;
            if(result[winner]){
                result[winner] +=1;
            }
            else{
                result[winner]=1;
            }
        }
    }

return result;

}
module.exports = dlMethod;