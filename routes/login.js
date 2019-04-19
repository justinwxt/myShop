'use strict'

const User = require('../lib/user')
module.exports = (app)=>{
    //登陆页面
    app.get('/login',(req,res)=>{
        res.render('login')
    })
    //登陆
    app.post('/login',(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        User.getOne({username},(error,returnUser)=>{
            if(error){
                req.session.error = "网络错误"
              
               res.json({code:0,msg:'网络错误'})
               
            }else if(!returnUser){
                req.session.error = "用户名不存在"
                res.json({code:0,msg:'用户名不存在'})
               
            }else{
                if(password != returnUser._source.password ){
                    req.session.error = "密码错误"
                    res.json({code:0,msg:'密码错误'})
                }else{
                    req.session.user = returnUser._source;
                    res.json({code:1,msg:'登陆成功'})
                }
            }
        })
    })
}
