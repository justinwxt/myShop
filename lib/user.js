'use strict'
const rp = require('request-promise')
const elasticConfig = require('../config/elasticConfig.js')
const baseUrl = `${elasticConfig.host}:${elasticConfig.port}/${elasticConfig.userIndex}/${elasticConfig.userType}`

//查找某个用户
let getOne = async (data,cb)=>{
    let url = baseUrl + '/_search'
    try{
       let users =  (await rp({json:true,uri:url,headers: {
        'User-Agent': 'Request-Promise'
    },body:{query:{match:data}}})).hits.hits
       cb(null,users[0])
    }catch(error){
        cb(error)
    }
    
}
//创建用户
/**
 * 
 * @param {*} data {username,password}
 * @param {*} cb 
 */
let createOne = async (data,cb)=>{
    let url = baseUrl;
    try{
       
       let esBody = await rp.post({json:true,uri:url,headers:{'User-Agent': 'Request-Promise'},body:data})
       cb(null)
    }catch(error){
        cb(error)
    }
}
module.exports = {
    getOne,
    createOne
}