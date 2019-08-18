
let http =require('http')
let fs =require('fs')
let url = require('url')

http.createServer((request,response)=>{
  console.log(request.method)
  fs.readFile(request.url.substr(1),(error,data)=>{
    console.log(error,data.toString())
  })
  response.write("hello");
  response.end();
}).listen(8089)

console.log("server run")
