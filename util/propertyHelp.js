exports.pick = (obj,...arr)=>{
    if(!obj || typeof obj !== 'object'){
        return obj
    }
    let res = {};
    for(let prop in obj){
        if(arr.indexOf(prop) !== -1){
            res[prop] = obj[prop]
        }
    }
    return res;
}