const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cors = require("cors");
const userroute = require("./routes/user.js");
const transactionRoute = require("./routes/transaction.js");

const app = express();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true,
        optionsSuccessStatus: 204,
    })
);

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const handler = (req, res) => {
    const d = new Date();
    res.end(d.toString());
};

app.use(express.json());
app.use('/api/users/', allowCors(userroute));
app.use('/api/transactions/', allowCors(transactionRoute));

// Database Connection 
mongoose.connect("mongodb+srv://newuser_1:aryan1000@cluster0.ecaluid.mongodb.net/expense_tracker", {

}).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
});

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is connected at port ${port}`);
});

