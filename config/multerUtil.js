'use strict'
var multer = require('multer')
var storage = multer.diskStorage({
    //设置上传文件的路径
    destination:(req,file,cb)=>{
        cb(null,'/public/images')
    },
    //设置上传文件的名字
    filename:(req,file,cb)=>{
        var fileFormat = (file.originalname).split('.')
        cb(null,file.fieldname+'-'+Date.now()+'.'+fileFormat[fileFormat.length-1])
    }
})
var upload = multer({
    storage:storage
})
module.exports = upload;