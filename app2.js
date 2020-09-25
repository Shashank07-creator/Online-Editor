var app = require('express')();
var exec = require('child_process').exec;
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.set("view engine","ejs");

app.get('/',(req,res)=>{
    res.send('From server 2')
})

io.on('connection',(socket)=>{
    socket.emit('announcements',{message:'A new user has joined!'});
    socket.on('event',function(data){ console.log(data.message);});
});

app.get('/socket_conn',(req,res)=>{    
    res.render('scoket');
})

app.get('/testing',(req,res)=>{
    //console.log(req);
    //res.send('Server ready to serve');
    let child = exec('EntityRecognition_spacy.py Hello Mr. Fox! Welcome to India Google welcomes you here.',(err,stdout,stderr)=>{
        console.log(stdout)
        if(err){res.send('error')}
        res.send(stdout);
    })
})

app.get('*',(req,res)=>{res.send("Not found")})

app.listen(3000,()=>{console.log('started server 2')});