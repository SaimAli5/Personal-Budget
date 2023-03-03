const express = require("express");
const transactionRouter = express.Router();

const {
    getTransactions,
    addTransaction,
    deleteTransactionById,
    updateTransactionById
} = require("../controllers/transactionControllers")


transactionRouter.get("/", getTransactions);
 
transactionRouter.post("/", addTransaction);

transactionRouter.put("/:transactionId", updateTransactionById); 

transactionRouter.delete("/:transactionId", deleteTransactionById);


// Error handler
transactionRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("An error occurred, please try again later.");
})


// Export router to "api.js"
module.exports = transactionRouter;