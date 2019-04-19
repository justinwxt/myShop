'use strict'
module.exports = (app)=>{
    app.get('/logout',(req,res,next)=>{
        req.session.user = null;
        req.session.error = null;
        res.redirect('/home')
    })
}