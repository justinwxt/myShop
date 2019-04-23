var testController = require('../middlewares/testController')
//降上传的文件存储为临时文件
var multipart = require('connect-multiparty')
//临时文件存储在public下
var multipartMiddleware = multipart({uploadDir:'../public/'})
var checkLogin = require('../middlewares/check').checkLogin;
var Commodity = require('../lib/commidity')
const upload = require('multer')({dest:'/public/images/'})
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
module.exports = (app)=>{
    app.get('/home',(req,res)=>{
        var login = {
            href:'/login',
            message:'登陆'
        }
        if(req.session.user){
            login.href = '/logout'
            login.message = '退出'
        }
        //查找数据库，渲染商品列表
          Commodity.getAll((err,docs)=>{
            if(err){
                res.status(err.statusCode || 500).json(err)
                return
            }
          console.log('docs',docs)
            res.render('home',{Commoditys:docs,login:login})
        })
      
    })

    //添加商品页
    app.get('/addcommodity',checkLogin,(req,res)=>{
      
        res.render("addcommodity")
    })
    //添加商品操作
    app.post('/addcommodity',(req,res)=>{
       let form =new formidable.IncomingForm();
       form.uploadDir = path.join(__dirname,'../public/images')
       form.parse(req,(err,fields,files)=>{
           if(err){
               throw err
           }
           var oldPath = files.imgSrc.path;
           var newPath = path.join(path.dirname(oldPath),files.imgSrc.name)
           let id = (new Date()).getTime();
           fs.rename(oldPath,newPath,(err)=>{
               if(err) throw err
               Commodity.create({
                name:fields.cname,
                price:fields.cprice,
                imgSrc:files.imgSrc.name,
                id
            },(error)=>{
                setTimeout(() => {
                    if(error){
                        res.json({code:0,msg:'添加失败'})
                    }else{
                        res.json({code:1,msg:'添加成功'})
                    }
                }, 1000);
               
            })

           })
        console.log(fields,files)
       
       
       })
        
       
    })

}