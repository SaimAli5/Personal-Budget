const express = require("express");
const transactionRouter = express.Router();

// utils import
const {
    transactions, 
    getEnvelopeBycategory
} = require("./utils");

// => API/transaction routes 

// GET
transactionRouter.get("/", (req, res, next) =>{
    try{
        res.send(transactions);
    } catch(err){
        next(err);
    };
});

// POST
transactionRouter.post("/", (req, res, next) =>{
});

//PUT for subtracting the input amount from specific envelop's budget
transactionRouter.put("/:categoryName", (req, res, next) =>{
    const envelopeParam = req.params.categoryName;
    const envelopeBody = req.body;

    const envelopeToUpdate = getEnvelopeBycategory(envelopeParam);
    envelopeToUpdate[0].budget -= envelopeBody.budget;

    res.send(`You remaining budget: $${envelopeToUpdate[0].budget}`);
});

// DELETE
transactionRouter.delete("/:categoryName", (req, res, next) =>{
});

module.exports = transactionRouter;