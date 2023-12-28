const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require('path')
const userroute = require("./routes/user.js")
const transactionRoute = require("./routes/transaction.js")

app.use(express.json());
app.use('/api/users/', userroute);
app.use('/api/transactions/', transactionRoute);

mongoose.connect("mongodb+srv://newuser_1:aryan1000@cluster0.ecaluid.mongodb.net/?retryWrites=true&w=majority" , {
}).then(()=> {
    console.log("Database Connected");
}).catch((e) => {console.log(e)});
const port =process.env.PORT || 5000

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}
app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))
