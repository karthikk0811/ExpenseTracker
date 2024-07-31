const express=require('express');
const { addIncome, getIncomes, deleteIncome, addExpense, getExpenses, deleteExpense } = require('../controllers/transactions');
const router=express.Router();

router.post('/add_income',addIncome);
router.get('/get_incomes/:id',getIncomes);
router.delete('/delete_income/:id',deleteIncome);
router.post('/add_expense',addExpense);
router.get('/get_expenses/:id',getExpenses);
router.delete('/delete_expense/:id',deleteExpense);

module.exports=router;