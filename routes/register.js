'use strict'
const User = require('../lib/user')
module.exports  = (app)=>{
    //渲染注册页面
    app.get('/register',(req,res)=>{
        res.render('register')
    })
    //注册用户
    app.post('/register',(req,res,next)=>{
        let inUsername = req.body.username;
        let inPassword = req.body.password;
        try{
            if(!(inUsername.length > 1&&inUsername.length <=10)){
                throw new Error('名字请限制在1-10个字符')
            }
            if(req.body.password != req.body.confirmpwd){
                throw new Error('两次输入密码不一致')
            }
        }catch(e){
            //注册失败
            req.session.error = e.message;
          
            return res.redirect('/register')
        }
        //查询用户名是否已存在
        User.getOne({username:inUsername},(error,oneUser)=>{
            if(error){
                res.status(error.statusCode || 500).json({code:0,msg:'500'})
                
             }else if(oneUser){
                req.session.error = "用户已存在！";
                res.redirect('/register')
                
             }else{
                User.createOne({username:inUsername,password:inPassword},(error)=>{
                    if(error){
                        req.session.error = "网络错误";
                        res.redirect('/register')
                    }else{
                        req.session.error = "用户创建成功"
                        
                        res.redirect('/login')
                    }
                })
             }
        })
      
    })
}