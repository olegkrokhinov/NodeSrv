const http = require('http');
const url  = require('url');
const fs = require('fs');
const path = require('path');

function UrlToArr(myURL, delimiter){
    PathName =  myURL.pathname.substr(1);
    let arr = PathName.split('/');
    
};


function doGET(myURL, response){
    
    let res = JSON.stringify({ 'msg': 'Nothing to do' })
    
      
    let filename = path.parse(myURL.pathname).base;


    urlArr = UrlToArr(myURL);

    if (filename.indexOf('.') != -1) {
        response.end(JSON.stringify({ 'file': filename }));
        return;
    } 
    
    if (myURL.pathname.substr(1)) {     
      const data = fs.readFileSync('./users.json');
      let users = JSON.parse(data);

      userPathName = myURL.pathname.substr(1);
      let UserFromDB = users.find(item => item.name==userPathName);
      
      (UserFromDB != undefined)? res = JSON.stringify(UserFromDB)
        : res = JSON.stringify({ 'err': 'User not found' });    
       
    } else {
      res = JSON.stringify({ 'msg': 'Nothing to search.' });    
    }

    response.end(res);

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
  //console.log(myURL);
  
  methods = {
    "GET":    doGET,
    "POST":   doPOST,
    "PUT":    doPUT,
    "DELETE": doDELETE,
  };

  methods[request.method](myURL, response);
});

server.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});
