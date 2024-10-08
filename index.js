const express = require('express')
const app = express();
const mongoose=require("mongoose");
const path=require("path")
const Chat=require("./models/Chat.js")
const methodOverride=require("method-override");
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");

app.use(express.static('public'));


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 
main()
.then(()=>{
  console.log("connection successful");
  
})
.catch((err)=>{
  console.log(err);
  
})
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

app.get("/chats",async(req,res)=>{
let chats= await Chat.find()
// console.log(chats);
res.render("index.ejs",{ chats})

})

app.get("/chats/new",(req,res)=>{
  res.render("new.ejs")
})
app.post("/chats",(req,res)=>{
  let {from,to,msg}=req.body;

  let newchats=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  });
  newchats.save().then((res)=>{
    console.log("chat was saved");
    
  }).catch((err)=>{
    console.log(err);
      
  })
  res.redirect("/chats");
})
  app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat});

})
//update route

app.put("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let { msg:newmsg }=req.body;
 let updatedchat=await  Chat.findByIdAndUpdate(
  id,
  {msg:newmsg},
  {runValidators:true,new:true}
);
 console.log(updatedchat);
 res.redirect("/chats")
}) 

app.delete("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let chattobedeleted=await Chat.findByIdAndDelete(id);
  console.log(chattobedeleted);
  res.redirect("/chats")
})
app.get("/",(req,res)=>{
  res.send("working")
})
app.listen(8080,()=>{
  console.log("root is working");
})