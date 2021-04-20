const http = require('http');
const url  = require('url');
const fs = require('fs');

function doGET(myURL, response){
    
    console.log('execute function doGET(myURL, response)');
  
    

    if (myURL.pathname.substr(1)) {

      const data = fs.readFileSync('./users.json');
      let users = JSON.parse(data);

      userPathName = myURL.pathname.substr(1);
      let UserFromDB = users.find(item => item.name==userPathName);
      (UserFromDB != undefined)? console.log(`User name: ${UserFromDB.name}, user age: ${UserFromDB.age}`)
       :console.log(`User ${userPathName} not found.`); 
    } else {
      console.log('Nothing to find.');
    }
};

function doPOST(myURL, response){
    console.log('execute function doPOST(myURL, response)');
};
function doPUT(myURL, response){
    console.log('execute function doPUT(myURL, response)');
};
function doDELETE(myURL, response){
    console.log('execute function doDELETE(myURL, response)');
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

server.listen(3015, function(){
    console.log("Сервер ожидает подключения...");
});
