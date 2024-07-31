const Income = require("../model/Income");
const Expense=require('../model/Expense');

const addIncome=async (req,res)=>{
    // console.log(req.body);
    const {id,data}=req.body;
    if(!id || !data) return res.status(400).send({"message":"missing data"});
    const {title,amount,category,description,date}=data;
    if( !title || !amount || !category || !date){
        return res.status(400).send({"message":"Please enter all the fields"});
    }
    if( isNaN(amount) || amount<0) {
        return res.status(400).send({"message":"amount must be a positive number"});
    }
    const newIncome=Income({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        newIncome.user=id;
        await newIncome.save();
        return res.sendStatus(201);
    }
    catch(err){
        res.status(500).send({'message':err.message});
    }
}

const getIncomes=async (req,res)=>{
    // console.log(req);
    const {id}=req.params;
    try{
        const incomes=await Income.find({user:id}).sort({createdAt:-1});
        return res.status(200).send({incomes});
    }
    catch(error){
        return res.status(500).send({'message':error.message});
    }
}

const deleteIncome=async (req,res)=>{
    const {id}=req.params;
    try{
       await Income.findByIdAndDelete(id);
       return res.status(200).send({"message":"income deleted"});
    }
    catch(err){
        return res.status(500).send({'message':error.message});
    }
}

const addExpense=async (req,res)=>{
    // console.log(req.body);
    const {id,data}=req.body;
    if(!id || !data) return res.status(400).send({"message":"missing data"});
    const {title,amount,category,description,date}=data;
    if( !title || !amount || !category || !date){
        return res.status(400).send({"message":"Please enter all the fields"});
    }
    if( isNaN(amount) || amount<0) {
        return res.status(400).send({"message":"amount must be a positive number"});
    }
    const newExpense=Expense({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        newExpense.user=id;
        await newExpense.save();
        return res.sendStatus(201);
    }
    catch(err){
        res.status(500).send({'message':err.message});
    }
}

const getExpenses=async (req,res)=>{
    // console.log(req);
    const {id}=req.params;
    try{
        const expenses=await Expense.find({user:id}).sort({createdAt:-1});
        return res.status(200).send({expenses});
    }
    catch(error){
        return res.status(500).send({'message':error.message});
    }
}

const deleteExpense=async (req,res)=>{
    const {id}=req.params;
    try{
       await Expense.findByIdAndDelete(id);
       return res.status(200).send({"message":"expense deleted"});
    }
    catch(err){
        return res.status(500).send({'message':error.message});
    }
}

module.exports={addIncome,getIncomes,deleteIncome,addExpense,getExpenses,deleteExpense};