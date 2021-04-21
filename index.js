const http = require('http');
const url  = require('url');
const fs = require('fs');
const path = require('path');


function UrlToArr(myURL, delimiter){
    PathName =  myURL.pathname.substr(1);
    let arr = PathName.split('/');
    return arr;
};



function checkRoute(myURL, pattern, strong=1) {

    let pathname = myURL.pathname;
    if (pathname == pattern){
        return [pattern.slice(1)];        
     } else {
         if (strong) {
             return [];
         }
     }


    arr2 = pathname.split('/');
    arr1 = pattern.split('/');

    
    let includes = 1;
    arr2.forEach((item, index, array) => {
        if ((index <= (arr1.length-1))&&(item != arr1[index])) {
          includes = 0};
    });
    if (includes) {
      return arr2.slice(arr1.length, arr2.length);
    }else{
        return [];
    }
    
//    console.log(arr1);
//    console.log(arr2);
  
};    

function doGET(myURL, response){
    
    let res = JSON.stringify({ 'msg': 'Nothing to do' })

    urlArr = UrlToArr(myURL);

    // отловить Get file
    let filename = path.parse(myURL.pathname).base;    
    if ( path.extname(filename) ) {
        console.log(`Get ${filename}`);
        return;
    }; 
    

   if (result = checkRoute(myURL, '/', 1))

    pathname = myURL.pathname;

     
    if (myURL.pathname.substr(1)) {     
      const data = fs.readFileSync('./users.json');
      let users = JSON.parse(data);

      userPathName = myURL.pathname.substr(1);
      let UserFromDB = users.find(item => item.name==userPathName);
      
      (UserFromDB != undefined)? res = JSON.stringify(UserFromDB)
        : response.end(JSON.stringify({ 'err': 'User not found' }));    
       
    } else {
        response.end(JSON.stringify({ 'msg': 'Nothing to search.' }));    
    }



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

server.listen(3001, function(){
    console.log("Сервер ожидает подключения...");
});
