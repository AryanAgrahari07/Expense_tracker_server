const express = require("express")
const Transaction = require("../models/transaction")
const router = express.Router();
const moment = require("moment")

router.post("/add-transaction" , async(req, res)=> {
        try {
           const newtransaction = new Transaction(req.body)
           await newtransaction.save();
           res.send("New transaction added");
        } catch (error) {
            console.log("Error in adding a transaction" , error);
        }
});


router.post("/edit-transaction" , async(req, res)=> {
        try {
            await Transaction.findOneAndUpdate({_id: req.body.transactionId}, req.body.payload)
            res.send("Transaction updated successfully");
        } catch (error) {
            res.status(500).json(error);
        }
});


router.post("/delete-transaction" , async(req, res)=> {
        try {
            await Transaction.findOneAndDelete({_id : req.body.transactionId})
            res.send("Transaction Deleted Successfully");
        } catch (error) {
            res.status(500).json(error);
        }
});


router.post("/get-all-transactions" , async(req, res)=> {
    const { frequency , selectedRange, type } = req.body;
    try {
        const transactions = await Transaction.find({
            ...(frequency !== "custom"? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
                },
            }
            : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                },
            }),
            userid: req.body.userid,
            ...(type!=="all"&&{type})
        });

        res.send(transactions);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router

