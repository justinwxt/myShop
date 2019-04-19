module.exports = (app)=>{
    require('./login')(app)
    require('./home')(app)
    require('./logout')(app)
    require('./register')(app)
}