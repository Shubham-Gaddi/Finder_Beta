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

function mailCheck(testMail)
{
  emailExistence.check(testMail ,function(err,res)
  {
    if(err)
    {
      console.log("Invalid Email Address");
    }
    else
    {
      console.log("Flag 3 Updated");
    }
    return 1;
  });
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
  async function registerUser(pass,pass2,mail)
  {
    let flag1 = 0;
    let flag2 = 0;
    let flag3 = 0;
    function mailCheck(testMail)
    {
      emailExistence.check(testMail ,function(err,res)
      {
        if(err)
        {
          console.log("Invalid Email Address");
        }
        else
        {
          console.log("Flag 3 Updated");
        }
        return 1;
      });
    }
    flag3 = mailCheck(mail);
    console.log("flag3"+flag3);
    if(pass === pass2)
    {
      flag1 = 1;
    }
    else
    {
      console.log("Passwords Do Not Match");
    }
    const personalDomains = ["gmail","yahoo","hotmail","msn","rediffmail","ymail"];
    for(var a = 0 ; a<personalDomains.length ; a++)
    {
      if(mail.includes(personalDomains[a]))
      {
        flag2 = 1;
        console.log("Enter a Business Email");
      }
    }
    console.log("flag3"+flag3);
    await flag3;
    console.log("flag3"+flag3);
    console.log("All Checks Passed");
    console.log(flag1 , flag2 , flag3);
    if((flag1 === 1)&&(flag2 === 0)&&(flag3 === 1))
    {
      user.save();
      res.redirect(__dirname + "/Main.html");
      console.log("Data Successfully Added to Database");
      // console.log(flag1, flag2, First, Last, Company, Mail, Pass, Pass2);
    }
    else
    {
      console.log("Check Data Again");
    }
}

// Setting Up Local Server
app.listen(3000,function()
{
  console.log("Server is running at port 3000");
});
