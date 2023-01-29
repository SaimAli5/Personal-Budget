const pool = require("../config/db");

// GET /spending-category
const getSpendingCategory = async (req, res, next) =>{
    const query = 'SELECT * FROM spending_category';

  try {
        const spendingCategory = await pool.query(query)
        if (spendingCategory.rowCount < 1){
            return res.status(404).send({
                message: "Records not found"
            });
        } 
        res.send({
            status: "success",
            message: "Spending Categories retrieved",
            data: spendingCategory.rows
            });
  } catch (err) {
    next(err)
  }
};

// GET /spending-category/:categoryName
const getSpendingCategoryByName = async (req, res, next) =>{
    const categoryName = req.params.categoryName;
    const query = `SELECT * FROM spending_category 
    WHERE spending_category.category = '${categoryName}'`;

  try{
       const spendingCatgeoryById = await pool.query(query);
       if (spendingCatgeoryById.rowCount < 1){
           return res.status(404).send({
             message: "Record not found"
           });
       }
       res.send({
           status: "success",
           message: "Spending Categories Retrieved", 
           data: spendingCatgeoryById.rows
           });
  } catch (err) {
    next(err);
  };
};

// POST /spending-category
const addSpendingCategory = async (req, res, next) =>{
    const {id, category, budget} = req.body;
    const query = `INSERT INTO spending_category (id, category, budget)
    VALUES (${id}, '${category}', ${budget}) RETURNING *`;

  try{
       const newSpendingCategory = await pool.query(query);
       res.status(201).send({
           status: "Success",
           message: "New Spending Category created",
           data: newSpendingCategory.rows
           });
  } catch(err) {
    next(err);
  };
};

// PUT /spending-category/:categoryName
const updateSpendingCategoryByName = async (req, res, next) =>{
    const categoryName = req.params.categoryName;
    const {id, category, budget} = req.body;
    const query = `UPDATE spending_category
        SET id = ${id}, category = '${category}', budget = ${budget}
        WHERE category = '${categoryName}' RETURNING *`

  try{
       const updatedSpendingCategory = await pool.query(query);
       res.send({
           status: "Success",
           message: "Spending Category has been updated",
           data: updatedSpendingCategory.rows
           });
  } catch (err) {
    next(err)
  };
};

// DELETE /speinding-category/:categoryName
const deleteSpendingCategorybyName = async (req, res, next)=>{
    const categoryName = req.params.categoryName;
    const checkQuery = `SELECT * FROM spending_category 
    WHERE spending_category.category = '${categoryName}'`
    const query = `DELETE FROM spending_category
    WHERE category = '${categoryName}'`

  try{
       const spendingCategoryToDelete = await pool.query(checkQuery);
       if (spendingCategoryToDelete.rowCount < 1){
           return res.status(404).send({
            message: "Category does not exist"
           })
       }
       await pool.query(query);
       res.status(204).send();
  } catch (err) {
    next(err);
  };
};

module.exports = {
    getSpendingCategory,
    getSpendingCategoryByName,
    addSpendingCategory,
    updateSpendingCategoryByName,
    deleteSpendingCategorybyName
};