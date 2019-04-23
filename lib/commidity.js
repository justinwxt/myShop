'use strict'
const rp = require('request-promise')
const elasticConfig = require('../config/elasticConfig.js')
const baseUrl = `${elasticConfig.host}:${elasticConfig.port}/${elasticConfig.commodityIndex}/${elasticConfig.commodityType}`
let getAll = async (cb)=>{
    let url = baseUrl + '/_search'
    try{
       let commoditys =  (await rp({json:true,uri:url,headers: {
        'User-Agent': 'Request-Promise'
    },})).hits.hits
       cb(null,commoditys)
    }catch(error){
        cb(error)
    }
    
}
/**
 * 
 * @param {*} data {name,price,imgSrc}
 * @param {*} cb 
 */
let create = async (data,cb)=>{
    let url = baseUrl;
    try{
        let esBody = await rp.post({json:true,uri:url,headers:{'User-Agent': 'Request-Promise'},body:data})
        cb(null)
    }catch(error){
        cb(error)
    }
}
module.exports = {
    getAll,
    create
}