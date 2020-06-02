//jshint esversion:6
// Requiring Packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailExistence = require("email-existence");
const saltRounds = 10;

// Using/Initialising External Packages/Modules
const app = express();
app.use(express.static("public"));  // In order to be able to use static files such as Images & CSS
app.use(bodyParser.urlencoded({extended : true}));
mongoose.connect("mongodb://localhost:27017/FinderUsersDB" , {useUnifiedTopology: true , useNewUrlParser : true});
app.set("view engine","ejs");

// Creating User Schema for Sign Up via Mongoose
const userSchema = new mongoose.Schema(
{
  fName :
  {
    type : String,
    required : true,
  },
  lName :
  {
    type : String,
    required : true,
  },
  cName :
  {
    type : String,
    required : true,
  },
  email :
  {
    type : String,
    required : true,
  },
  passWord :
  {
    type : String,
    required : true,
    minlength : 8,
  },
  passWordConf :
  {
    type : String,
    required : true,
    minlength : 8
  }
});
const User =new mongoose.model("User", userSchema);

// User Defined Functions being Used
async function mailCheck(testMail)
{
  let test = 2;
  emailExistence.check(testMail,async function(err,res)
  {
    let test = await res;
    // if(res)
    // {
    //   console.log("MAIL VERIFIED");
    //   test = 1;
    // }
    // else
    // {
    //   console.log("Wrong Email");
    // }
  });
  await test;
  return test;
}

// GET Request for Root Directory
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/index.html");
});

// GET Request for Sign Up Page
app.get("/SignUp.html",function(req,res)
{
  res.sendFile(__dirname + "/SignUp.html");
});
app.post("/SignUp.html",function(req,res)
{
  let First = req.body.fName;
  let Last = req.body.lName;
  let Company = req.body.cName;
  let Mail = req.body.email;
  let Pass = req.body.passWord;
  let Pass2 = req.body.passWordConf;
  async function verifyUser(pass,pass2,mail)
    {
      let flag1 = 0;
      flag1 = await mailCheck(mail);
      await flag1;
      let flag2 = 0;
      if(pass === pass2)
      {
        flag2 = 1;
      }
      let flag3 = 0;
      const personalDomains = ["gmail","yahoo","hotmail","msn","rediffmail","ymail"];
      for(var a = 0 ; a<personalDomains.length ; a++)
      {
        if(mail.includes(personalDomains[a]))
        {
          flag3 = 1;
          console.log("Enter a Business Email");
        }
      }
      if((flag1 == 1)&&(flag2 == 1)&&(flag3 ==0))
      {
        // user.save();
        res.render(Main);
        console.log("Data Successfully Added to Database");
      }
      else
      {
        console.log("Error in Saving Data");
      }
    }
    verifyUser(Pass,Pass2,Mail);
});

// Setting Up Local Server
app.listen(3000,function()
{
  console.log("Server is running at port 3000");
});
