
module.exports =  function loadRoutesToApp(app) {
  
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "access-control-allow-origin, content-type, authorization")
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
    
  app.use('/users', require('./api/user'));
  app.use('/auth', require('./api/auth')); 
  app.use('/toys', require('./api/game/toy'));   

 // app.use((req, res, next) => {
 //     res.send(`The route ${req.path} can't be found`);
 // });

    

}