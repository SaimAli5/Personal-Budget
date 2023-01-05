const express = require("express");
const spendRouter = express.Router();

// db imports
const {
    envelopes,
    getEnvelopeBycategory
} = require("./db");

// PUT for subtracting the input amount from specific envelop's budget
spendRouter.put("/:categoryName", (req, res, next) =>{
    const envelopeParam = req.params.categoryName;
    const envelopeBody = req.body;

    const envelopeToUpdate = getEnvelopeBycategory(envelopeParam);
    const newBudget = envelopeToUpdate[0].budget - envelopeBody.budget;
    envelopeToUpdate[0].budget = newBudget

    res.send(`You remaing budget: $${envelopeToUpdate[0].budget}`);
});

module.exports = spendRouter;