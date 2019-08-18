
let express=require('express')
let bodyParser= require('body-parser')
let multer = require('multer')
let fs=require('fs')
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multer({dest:'/tmp/'}).array("filee"));

app.listen(8090);
app.get("/getfile",(req,res)=>{
  console.log(req);
  res.send("hello expressiam");
})

app.post("/postfile",(req,res)=>{
  // console.log(__dirname);
  console.log(req.files);
  console.log(req.body);
  fs.readFile(req.files[0].path,(err,data)=>{
    console.log("filedata:",data)
    fs.writeFile(__dirname+"/"+req.files[0].originalname,data,function(err){})
  });
  res.send("hello expressiammm");
})


app.get("/getlist",(req,res)=>{
  fs.readFile(__dirname+"/list.json",(err,data)=>{
    if(err){}else{
      res.end(data);
    }
  });
})
app.post("/reviseadd",(req,res)=>{
  fs.readFile(__dirname+"/list.json",(err,data)=>{
    if(err){}else{
      data=JSON.parse(data);
      for(let i in data){
        if(data[i].id==req.body.id){
          data[i].name=req.body.name;
          data[i].profession=req.body.profession;
          res.end(JSON.stringify(data));
          fs.writeFile(__dirname+"/list.json",JSON.stringify(data),(res)=>{
            console.log(res)
          })
          return;
        }
      }
      data.push(req.body);
      res.end(JSON.stringify(data));
      fs.writeFile(__dirname+"/list.json",JSON.stringify(data),(res)=>{
        console.log(res)
      })
    }
  });
})
app.get("/delete/:id",(req,res)=>{
  fs.readFile(__dirname+"/list.json",(err,data)=>{
    data=JSON.parse(data);
    for(let i in data){
      if(data[i].id==req.params.id){
        data.splice(i,1);
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname+"/list.json",JSON.stringify(data),(res)=>{
          console.log(res)
        })
      }
    }
  })
})
