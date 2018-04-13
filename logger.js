/**
 * Created by ASUS on 07.04.2018.
 */
const fs = require('fs');
const _ = require('lodash');
// function log
let log = function log(data){
    fs.appendFile('log.txt', data+". Time:"+_.now()+"\n",(err)=>{
        if(err) throw err
    });
}
module.exports = log
