'use strict'
var muiler = require('../config/multerUtil')
//接受一个以imgSrc命名的文件
var upload = muiler.single('imgSrc');
exports.dataInput = (req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return console.log(err)
        }
        console.log(req)
    })
}
