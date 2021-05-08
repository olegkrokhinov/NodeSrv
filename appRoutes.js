
module.exports =  function loadRoutesToApp(app) {
    app.use('/users', require('./api/user'));    
    app.use((req, res, next) => {
      res.send(`The route ${req.path} can't be found`);
    });
}