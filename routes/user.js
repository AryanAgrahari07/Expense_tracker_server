const express = require("express")
const bcrypt = require("bcrypt")

const User = require("../models/user.js")
// this User means database of all the users in our database

const router = express.Router();

router.post('/login', async(req,res)=>{
    try {
        const {email , password} = req.body;

        const user = await User.findOne({
        email,
     })
      
        if(!user){
            console.log("Check Credentials");
        }
        if(!bcrypt.compare(password , user.password)){
            console.log("Wrong Password");
        }
        else{     
            res.send(user);
            console.log("Welcome back", user.name )
        }

    } catch (error) {
        console.log("error in login");
        res.status(404).json(error);
    }   
})

router.get('/usersall', async(req,res)=> {
    try {
        const users = await User.find({});
     console.log(req.query);
     res.json({
        success:true,
        users,
     })
    } catch (error) {
        console.log("error",error)
    }
     
})
router.post('/register', async(req, res) =>{
    try {
        const { name, email, password } = req.body;
   
    const hashedpassword = await bcrypt.hash(password , 10);
     await User.create({
       name,
       email,
       password : hashedpassword,
     });

    //  await user.save();
   
     } catch (error) {
       console.log("Trouble", error)
     }
   
     res.status(201).cookie("hello", "chal nikl").json({
       success: true,
       message: "registered successfully",
     });
  });

module.exports = router