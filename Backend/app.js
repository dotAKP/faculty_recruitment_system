 import express from 'express';
 const app = express();
 app.use(express.urlencoded({extended:true}));
 app.use(express.json());
 app.use(express.static('public'));


 app.set("views","views");
 app.set("view engine","ejs");

app.get('/',(req,res)=>{
      res.render("home.ejs");
});








app.listen(3000,()=>
{
 console.log("Connection Established Successfully");
});
