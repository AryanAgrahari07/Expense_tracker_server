const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require('path')
const userroute = require("./routes/user.js")
const transactionRoute = require("./routes/transaction.js")

app.use(express.json());
app.use('/api/users/', userroute);
app.use('/api/transactions/', transactionRoute);

// Database Connection 
mongoose.connect("mongodb://localhost:27017/expense_tracker" , {
  
}).then(()=> {
    console.log("Database Connected");
}).catch((e) => {console.log(e)});


// app.get("/" , (req, res) =>{
//     res.send("Nice working");
// })
// app.get('*' , (req, res)=>{
    // res.sendFile(path.resolve(__dirname, 'client/src/pages/home.jsx'))
// })
app.listen(3000 , ()=>{
    console.log("Server is Conneted");
})