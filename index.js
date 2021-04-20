const http = require('http');
const url  = require('url');
const fs = require('fs');

function doGET(myURL, response){
    
    let res = JSON.stringify({ 'msg': 'Nothing to do' })

    if (myURL.pathname.substr(1)) {

      const data = fs.readFileSync('./users.json');
      let users = JSON.parse(data);

      userPathName = myURL.pathname.substr(1);
      let UserFromDB = users.find(item => item.name==userPathName);
      
      (UserFromDB != undefined)? res = JSON.stringify(UserFromDB)
        : res = JSON.stringify({ 'err': 'User not found' });    
        
    } else {
      console.log('Nothing to find.');
      res = JSON.stringify({ 'msg': 'Nothing to search.' });    
    }

    response.end(res);

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

server.listen(3016, function(){
    console.log("Сервер ожидает подключения...");
});
