const pool = require("../config/db");


// GET /transactions
const getTransactions = async (req, res, next) =>{
    const query = `SELECT * FROM transaction`
  try{
       const transactions = await pool.query(query);
       if(transactions.rowCount < 1){
          return res.status(404).send({
            message: "Records not found"
          });
       };
       res.send({
           status: "Success",
           message: "Transaction retrieved",
           data: transactions.rows
           });
  } catch(err){
    next(err);
  };
};

// POST /transactions
const addTransaction = async (req, res, next) =>{
    const {id, date, category_id, payment} = req.body;
    const insertQuery = `INSERT INTO transaction (id, date, category_id, payment)
        VALUES (${id}, '${date}', ${category_id}, ${payment})`
    const updateCategoryQuery = `UPDATE spending_category
        SET budget = budget - ${payment}
        WHERE spending_category.id = ${category_id} RETURNING *`

  try{
       await pool.query(insertQuery);
       const updatedCategory = await pool.query(updateCategoryQuery);
       res.send({
           status: "Success",
           message: "Transaction created",
           data: updatedCategory.rows
           });
  } catch (err){ 
    next(err) 
  }
};

// PUT /transactions/:transactionId {currently not operational}
const updateTransactionById = async (req, res, next) =>{ 
    const transactionId = req.params.transactionId;
    const {id, date, category_id, payment} = req.body;
    const updateTransactionQuery = `UPDATE transaction
      SET id = ${id}, date = '${date}', category_id = ${category_id}, payment = ${payment} 
      WHERE id = ${transactionId} RETURNING *`
    const transactionToSubtract = `SELECT payment - ${payment} FROM transaction WHERE id = ${id}`
    const transactionToAdd = `SELECT ${payment} - payment FROM transaction WHERE id = ${id}`
    const updateCategoryQuery = `UPDATE spending_category
    SET budget = 
    CASE 
        WHEN (SELECT payment FROM transaction WHERE id = ${id}) < ${payment} 
        THEN budget - (SELECT payment - ${payment} FROM transaction WHERE id = ${id})
        WHEN (SELECT payment FROM transaction WHERE id = ${id}) > ${payment}
        THEN budget + (SELECT ${payment} - payment FROM transaction WHERE id = ${id})
        ELSE budget + 2
    END
    WHERE spending_category.id = ${category_id}`

  try{
       const updatedTransaction = await pool.query(updateTransactionQuery);
       res.send({
           status: "Success",
           message: "Transaction updated",
           data: updatedTransaction.rows
           })
       await pool.query(updateCategoryQuery);
  } catch (err){
    next(err)
  };
};

// DELETE /transactions/:transactionId
const deleteTransactionById = async (req, res, next) =>{
    const transactionId = req.params.transactionId;
    const updateCategoryQuery = `UPDATE spending_category
        SET budget = budget + (SELECT payment FROM transaction WHERE id = ${transactionId})
        WHERE spending_category.id = (SELECT category_id FROM transaction WHERE id = ${transactionId})`
    const checkQuery = `SELECT * FROM transaction 
    WHERE transaction.id = '${transactionId}'`
    const deleteQuery = `DELETE FROM transaction 
        WHERE id = ${transactionId}`
  try{ 
       const transactionToDelete = await pool.query(checkQuery);
       if(transactionToDelete.rowCount < 1){
        return res.status(404).send({
            message: "Transaction does not exist"
        });
       };  
       await pool.query(updateCategoryQuery);
       await pool.query(deleteQuery);
       res.status(204).send({
           status: "Success",
           messsage: "transaction successfully deleted"
           });
  } catch (err){
    next(err);
  };
};

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransactionById,
    updateTransactionById
};