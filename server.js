const express = require('express');
var app=express()
const multer = require('multer');
var port=3005


// ! we have manage storage 
//  * we tell multer where we will store our files

const storageOfMulter=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const uploadfile=multer({storage:storageOfMulter}).single("file");

app.listen(port,()=>{

    console.log("server is listening at port,",port);

})

app.post("/",(req,res)=>{
    uploadfile(req,res,(err)=>{
        if (err) {
            console.log(err);
        }
        return res.send(req.file)
    })
})
// app.use("/public",express.static(__dirname,"/public"));
app.use("/public", express.static(__dirname+ "/public"));

app.get("/test",(req,res)=>{
res.send("server is running fine")
})