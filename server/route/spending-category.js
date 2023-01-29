const express = require('express');
const categoryRouter = express.Router();
const pool = require("../db");

// utils import
const {
    envelopes,
    getEnvelopeBycategory,
    updateEnvelopeByIndex
} = require("./utils");

// => API/spending-category routes 
categoryRouter.get("/", (req, res, next) =>{
    try {
       pool.query('SELECT * FROM spending_category', (err, result)=>{
        if(err){
          throw err
        }
        res.send(result.rows);
       });
    } catch (err) {
        next(err)
    }
});

categoryRouter.get("/:categoryName", (req, res, next) =>{
    const categoryName = req.params.categoryName;
    try{
      const selectQuery = `SELECT * FROM spending_category 
      WHERE spending_category.category = '${categoryName}'`
      pool.query(selectQuery, (err, result) =>{
        if(err){
          throw err;
        };
        res.send(result.rows);
      });
    }catch(err) {
      next(err);
    };
});

categoryRouter.post("/", (req, res, next) =>{
  const {id, category, budget} = req.body;
    try{
       const insertQuery = `INSERT INTO spending_category (id, category, budget)
       VALUES (${id}, '${category}', ${budget})`

       pool.query(insertQuery, (err, result) =>{
        if(err){
          throw err
        }
        res.status(201).send("Envelope successfully added");
       })
    } catch(err) {
      next(err)
    }
});

categoryRouter.put("/:categoryName", (req, res, next) =>{
  const categoryName = req.params.categoryName;
  const {id, category, budget} = req.body;
    try{
      const updateQuery = `UPDATE spending_category
      SET id = ${id}, category = '${category}', budget = ${budget}
      WHERE category = '${categoryName}'`

      pool.query(updateQuery, (err, result) =>{
        if(err){
          throw err;
        }
        res.send(`Category: ${categoryName} has been updated`)
      });
    }catch(err) {
      next(err)
    }
});

categoryRouter.delete("/:categoryName", (req, res, next)=>{
    const categoryName = req.params.categoryName;
    try{
      const deleteQuery = `DELETE FROM spending_category
      WHERE category = '${categoryName}'`

      pool.query(deleteQuery, (err, result) =>{
        if(err){
          throw err;
        }
        res.status(204).send("Envelope successfully deleted");
      })
    }catch(err) {
      next(err)
   }
});

categoryRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    req.status(500).send(err.message)
})


// Export router to "api.js"
module.exports = categoryRouter;