const express = require('express');
const categoryRouter = express.Router();

const {
  getSpendingCategory,
  getSpendingCategoryByName,
  addSpendingCategory,
  updateSpendingCategoryByName,
  deleteSpendingCategorybyName
} = require("../controllers/spending-categoryControllers");


categoryRouter.get("/", getSpendingCategory);

categoryRouter.get("/:categoryName", getSpendingCategoryByName);

categoryRouter.post("/", addSpendingCategory);

categoryRouter.put("/:categoryName", updateSpendingCategoryByName);

categoryRouter.delete("/:categoryName", deleteSpendingCategorybyName);


// Error handler
categoryRouter.use((err, req, res, next)=>{
  console.error(err.stack);
  res.status(500).send("An error occurred, please try again later.");
})


// Export router to "api.js"
module.exports = categoryRouter;