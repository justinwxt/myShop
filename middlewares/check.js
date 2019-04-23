'use strict'
module.exports = {
    checkLogin:(req,res,next)=>{
        if(!req.session.user){
            req.session.error = "请先登陆"
            res.redirect('/login')
        }else{
            next()
        }
       
    },
    checkNotLogin:(req,res,next)=>{
        if(req.session.user){
            req.session.error = '已登陆'
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
   
}