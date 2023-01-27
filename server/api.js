const express = require('express');
const apiRouter = express.Router();

// categoryRouter
const categoryRouter = require("./route/spending-category");
apiRouter.use("/spending-category", categoryRouter)

// transactionRouter
const transactionRouter = require("./route/transaction");
apiRouter.use("/transactions", transactionRouter)

// Export router to "server.js"
module.exports = apiRouter;