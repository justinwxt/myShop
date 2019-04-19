var testController = require('../middlewares/testController')
//降上传的文件存储为临时文件
var multipart = require('connect-multiparty')
//临时文件存储在public下
var multipartMiddleware = multipart({uploadDir:'../public/'})
var checkLogin = require('../middlewares/check').checkLogin;
var Commodity = require('../lib/commidity')
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
          
            res.render('home',{Commoditys:docs,login:login})
        })
      
    })
}