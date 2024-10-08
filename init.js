const mongoose=require("mongoose");

const Chat=require("./models/Chat.js")

main()
.then(()=>{
  console.log("connection successful");
  
})
.catch((err)=>{
  console.log(err);
  
});
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}
let allchats=[
  {
    from:"kishor",
  to:"sonu",
  msg:"thankf for assignment",
  created_at:new Date(),
  },
  {
    from:"bablu",
  to:"yadav ji",
  msg:"thanks sir",
  created_at:new Date(),
  },
  {
    from:"neha",
  to:"dablu",
  msg:"assignment is done",
  created_at:new Date(),
  },
  {
    from:"sishil",
  to:"manish",
  msg:"hello sir",
  created_at:new Date(),
  },
]

Chat.insertMany(allchats);