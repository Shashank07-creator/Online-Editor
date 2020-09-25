var express  = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyparser = require("body-parser");
    fetch = require("node-fetch")
    
let user_name

// --------------------------------------------Declarations------------------------------------------------------------------------

app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended:true}));
app.use("./Statics",express.static("Statics"));

// -------------------------------------------Database------------------------------------------------------------------------------

mongoose.connect("mongodb://localhost/onlineEditor");

	var login_db_schema = new mongoose.Schema({
		name: String,
		password: String
	});

	var login_db = mongoose.model("login_db",login_db_schema);


	var project_schema = new mongoose.Schema({
		name:String,
		code:JSON
	});

	var project_db = mongoose.model("project_db",project_schema);


//--------------------------------------------Routes--------------------------------------------------------------------------------

var http = require('http');
var fs = require('fs');
let uname='Mr. X'

app.get('/',(req,res)=>{
    console.log('welcome to home page');
    //res.send("<h1>Welcome</h1>")
    res.render("master")
});

let l = "//test.py"
app.get('/sending',(req,res)=>{
    res.sendFile(__dirname+l)
    res.sendFile(__dirname+"//app2.js")
})

app.get('/login',(req,res)=>{
    res.render('login')
})

let userid="default"

app.get('/loginuser',(req,res)=>{
    user_name = req.body.username;
    console.log(user_name)
    let password = req.body.password;
    console.log(password)
    login_db.create({name:user_name,passkey:password},(err)=>{if(!err)console.log('user registered')})
    userid = login_db.findOne({$e:{name:user_name}},(err,d)=>{
        return d
    })
    res.redirect('/right')
})

app.get('/signup',async (req,res)=>{
    // let t = await getset()
    // console.log(t+" from server2");
    // res.send(t);
    fetch('http://localhost:3000/testing',{credentials:'same-origin'}).then(res=> res.text()).then(data=> t = data).then(()=>{res.send(t)});
})

app.get('/home',(req,res)=>{
    res.send(t)
})

app.get('/preloader',(req,res)=>{
    res.render("preloader");
})

app.get('/left',(req,res)=>{
    res.render("left");
})

app.get('/top',(req,res)=>{
    res.render("top");
})

app.get('/right',(req,res)=>{
    res.render('right')
});

app.post('/share_redirect',(req,res)=>{
    let txt = req.body.textArea;
    console.log(user_name);
    project_db.create({name:user_name,code:txt},(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Inserted into db');
        }
    })
    res.redirect('share_data');
})

app.get('/share_data',(req,res)=>{
    // txt = "<h1>Code to check</h1><br/><p> Sample code to check working</p></p>working fine</p>"
    // project_db.create({name:'test1',code:txt},(err)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{ console.log("added")}
    // })
    res.render('share')
});

app.get('/db_data',(req,res)=>{
console.log('requested for data')
    project_db.find().sort({_id:-1}).limit(50).exec((err,d)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(d.length)
            res.send(JSON.stringify(d));
        }
    });
});

app.get('*',(req,res)=>{res.send("<h1>Page not found</h1>")});


port = process.env.PORT || 5000

app.listen(port,()=>{console.log("Port started on",`${port}`)});