const express=require("express")
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;

//for serving static files
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//Set the template engine as pug
app.set('view engine','pug')

//Set the views directory
app.set('views',path.join(__dirname,'views'))

// Our pug demo endpoint
// app.get("/demo",(req,res)=>{
//     res.render('demo',{title : "HELLO SIMMI",message : "KAISI HAI"})
// })

app.get("/",(req,res)=>{
    const param={'title':'This is the title','content':'This is the content'}
    res.render('index.pug',param)
})
app.post("/",(req,res)=>{
    console.log(req.body);
    let name=req.body.name;
    let age=req.body.age;
    let phno=req.body.phno;
    let outputstr=`The name of client is : ${name}.Age is ${age} years old.Contact number is ${phno}`;
    fs.writeFileSync("Output.txt",outputstr);
    const param={'message':'Your form has beem submitted successfully','content':'This is the content'}
    res.render('index.pug',param)
})

// app.get("/",(req,res)=>{
//     res.send("This is my first Express app");
// });
app.get("/about",(req,res)=>{
    res.send("This is About of my first Express app");
});
app.get("/this",(req,res)=>{
    res.status(404).send("This page not found");
});

app.listen(port,()=>{
    console.log(`The app is running at port ${port}`)
})