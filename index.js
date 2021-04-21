const http = require('http');
const url  = require('url');
const fs = require('fs');
const path = require('path');
let checkRouteResult = [];

function checkRoute(myURL, pattern, strong = 1) {

    let pathname = myURL.pathname;
    
    if ( strong ) {
        if ( pathname == pattern )   {
            checkRouteResult = [pattern.slice(1) ];
            return true;        
        } else {  
             checkRouteResult = [];
             return false;
        };
    };

    if (( !strong ) && ( pathname==pattern )) {
        checkRouteResult = [];
        return false;
    };
    
    pathNameArray = pathname.split('/');
    patternArray = pattern.split('/');

    let includes = 1;
        pathNameArray.forEach((item, index, array) => {
        if (( index <= ( patternArray.length-1 )) && ( item != patternArray[index] )) {
          includes = 0};
    });
    if (includes) {
        checkRouteResult = pathNameArray.slice( patternArray.length, pathNameArray.length );
        return true;
    }else{
        checkRouteResult = [];
        return false;
    }
    
};    

function doGET(myURL, response){
    
    let res = JSON.stringify({ 'msg': 'Nothing to do' })

    // отловить Get file
    let filename = path.parse(myURL.pathname).base;    
    if ( path.extname(filename) ) {
        console.log(`Get ${filename}`);
        return;
    }; 
    
    const data = fs.readFileSync('./users.json');
    let users = JSON.parse(data);
    let checkRouteFinded = 0;

   if (checkRoute(myURL, '/', 1)){
       response.end(JSON.stringify({ 'msg': 'Home page. Try /users оr /users/someUserName' }));
       checkRouteFinded = true;
   };

   if (checkRoute(myURL, '/users', 1)){
       response.end(JSON.stringify(users));
       checkRouteFinded = true;
   };

   if (checkRoute(myURL, '/users', 0)){
    let UserFromDB = users.find(item => item.name==checkRouteResult[0]);
      
    (UserFromDB != undefined)? response.end(JSON.stringify(UserFromDB))
      : response.end(JSON.stringify({ 'err': 'User not found' }));
      checkRouteFinded = true;
   };

   !checkRouteFinded ? response.end(JSON.stringify({ 'msg': 'route not founded. Try /users оr /users/someUserName' })) : '';
};

function doPOST(myURL, response){
    res = JSON.stringify({ 'method': 'POST' });
    response.end(res);
};
function doPUT(myURL, response){
    res = JSON.stringify({ 'method': 'PUT' });
    response.end(res);
};
function doDELETE(myURL, response){
    res = JSON.stringify({ 'method': 'DELETE' });
    response.end(res);
};


const server = http.createServer((request, response)=>{

  const baseURL = 'http://' + request.headers.host + '/';
  const myURL = new URL(request.url,baseURL);
  
  
  methods = {
    "GET":    doGET,
    "POST":   doPOST,
    "PUT":    doPUT,
    "DELETE": doDELETE,
  };

  methods[request.method](myURL, response);
});

server.listen(3001, function(){
    console.log("Сервер ожидает подключения...");
});
