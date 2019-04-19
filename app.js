'use strict'
const express = require('express')
const app = express()
const path = require('path')
const config = require('config-lite')(__dirname)
const pkg = require('./package')
const session = require('express-session')
const bodyParser = require('body-parser')
app.use(session({
    secret:config.session.secret,
    resave:true,
    key:config.session.key,
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:config.session.maxAge
    }
}))

app.set("views",path.join(__dirname,'views'))
//设置模板引擎为html
app.set("view engine",'html')
//可以使用ejs模板引擎来解析.html文件
app.engine('.html',require('ejs').__express)
//设置静态文件夹
app.use(express.static(path.join(__dirname,'public')))
//处理post请求
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//全局中间件，每个路由处理都会先执行这段代码
app.use((req,res,next)=>{
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if(err) res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>'
    next();
})
//自己设置的路由
require('./routes')(app)
//请求根路径时，跳转到/home路径
app.get('/',(req,res)=>{
    res.redirect('/home')
})
//module.parent为引用这个模块的模块
if(module.parent){
    module.exports = app;
}else{
    app.listen(config.port,()=>{
        console.log(`${pkg.name} listening on port ${config.port}`)
    })
}
