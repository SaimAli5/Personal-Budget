const express = require("express");
const { Pool } = require("pg");
const transactionRouter = express.Router();
const pool = require("../db");

// utils import
const {
    transactions, 
    getEnvelopeBycategory
} = require("./utils");

// => API/transaction routes 

// GET
transactionRouter.get("/", (req, res, next) =>{
    try{
        const selectQuery = `SELECT * FROM transaction`
        pool.query(selectQuery, (err, result) =>{
            if(err){
                throw err;
            }
            res.send(result.rows);
        })
    } catch(err){
        next(err);
    };
});
 
// POST
transactionRouter.post("/", (req, res, next) =>{
    const {id, date, category_id, payment} = req.body;
    try{
        const insertQuery = `INSERT INTO transaction (id, date, category_id, payment)
        VALUES (${id}, '${date}', ${category_id}, ${payment})`

        pool.query(insertQuery, (err, result) =>{
            if(err){
                throw err;
            }
            res.status(201).send("Transaction successfully added");
        });

        const updateCategoryQuery = `UPDATE spending_category
        SET budget = budget - ${payment}
        WHERE spending_category.id = ${category_id}`

        pool.query(updateCategoryQuery, (err, result) =>{
            if(err){
                throw err;
            }
        })
    } catch(err){ 
        next(err) 
    }
});

// DELETE
transactionRouter.delete("/:transactionId", (req, res, next) =>{
    const transactionId = req.params.transactionId;
    try{
        const updateCategoryQuery = `UPDATE spending_category
        SET budget = budget + (SELECT payment FROM transaction 
                               WHERE id = ${transactionId})
        WHERE spending_category.id = (SELECT category_id FROM transaction 
                                     WHERE id = ${transactionId})`
        
        pool.query(updateCategoryQuery, (err, result) =>{
            if(err){
                throw err;
            }
        });

        const deleteQuery = `DELETE FROM transaction 
        WHERE id = ${transactionId}`

        pool.query(deleteQuery, (err, result) =>{
            if(err){
                throw err;
            }
            res.status(204).send("transaction successfully deleted")
        });
    } catch(err){
        next(err)
    }
});

transactionRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("An error occurred, please try again later.");
})

module.exports = transactionRouter;

// abandoned:

// //PUT for subtracting the input amount from specific envelop's budget
// transactionRouter.put("/:transactionId", (req, res, next) =>{
//    const transactionId = req.params.transactionId;
//    const {id, date, category_id, payment} = req.body;

//     try{
//         const updatetransactionQuery = `UPDATE transaction
//         SET id = ${id}, date = '${date}', 
//         category_id = ${category_id}, payment = ${payment}
//         WHERE id = ${transactionId}`

//           pool.query(updatetransactionQuery, (err, result) =>{
//               if(err){
//                   throw err;
//               }
//               res.send("Transaction has been updated");
//           });

//           pool.query(`SELECT payment - ${payment} as transactionToSubtract FROM transaction WHERE id = ${id}`, (err, result) => {
//             if(err){
//                 throw err;
//             }
//             const transactionToSubtract = result.rows[0].transactionToSubtract;
    
//             pool.query(`SELECT ${payment} - payment as transactionToAdd FROM transaction WHERE id = ${id}`, (err, result) => {
//                 if(err){
//                     throw err;
//                 }
//                 const transactionToAdd = result.rows[0].transactionToAdd;
    
//                 const updateCategoryQuery = `UPDATE spending_category
//                 SET budget = 
//                 CASE 
//                     WHEN (SELECT payment FROM transaction WHERE id = ${id}) < ${payment} 
//                     THEN budget - ${transactionToSubtract}
//                     WHEN (SELECT payment FROM transaction WHERE id = ${id}) > ${payment}
//                     THEN budget + ${transactionToAdd}
//                     ELSE budget
//                 END
//                 WHERE spending_category.id = ${category_id}`
    
//                 pool.query(updateCategoryQuery, (err, result) =>{
//                     if(err){
//                         throw err;
//                     }
//                 });
//             });
//         });    
//     } catch(err){
//         next(err)
//     };
// });