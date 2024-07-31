import React, { createContext, useState } from 'react'
import useAuth from '../Hooks/useAuth';
import useAxiosPriate from '../Hooks/useAxiosPrivate';

const TransactionContext=createContext();

export const TransactionProvider=(props) =>{
    const axiosPrivate=useAxiosPriate();
    const {user} = useAuth();
    const [incomes,setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState();

    const addIncome = async (income)=>{
        try{
            await axiosPrivate.post('/transaction/add_income',{id:user?.id,data:income});
            await getIncomes(axiosPrivate);
        }
        catch (err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const getIncomes = async (ap)=>{
        try{
            const res= await ap.get(`/transaction/get_incomes/${user?.id}`);
            setIncomes(res.data.incomes);
        }
        catch(err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const deleteIncome = async (id)=>{
        try{
            await axiosPrivate.delete(`/transaction/delete_income/${id}`);
            await getIncomes(axiosPrivate);
        }catch (err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const totalIncome =()=>{
        let total=0;
        incomes.forEach((income)=>{
            total+=income.amount;
        })
        return total;
    }

    const addExpense = async (expense)=>{
        try{
            await axiosPrivate.post('/transaction/add_expense',{id:user?.id,data:expense});
            await getExpenses(axiosPrivate);
        }
        catch (err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const getExpenses = async (ap)=>{
        try{
            const res= await ap.get(`/transaction/get_expenses/${user?.id}`);
            setExpenses(res.data.expenses);
            // console.log(res.data.expenses);
        }
        catch(err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const deleteExpense = async (id)=>{
        try{
            await axiosPrivate.delete(`/transaction/delete_expense/${id}`);
            await getExpenses(axiosPrivate);
        }catch (err){
            if(!err?.response){
                setErr("No Response from the server")
            }
            else{
                setErr(err.response.data.message);
            }
        }
    }

    const totalExpenses=  ()=>{
        let total=0;
        expenses.forEach((expense)=>{
            total+=expense.amount;
        })
        return total;
    }

    const totalBalance = ()=>{
        return totalIncome()-totalExpenses();
    }

    const transactionHistory = ()=>{
        const hist=[...incomes,...expenses]
        hist.sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt);
        });
        // console.log(hist.slice(0,3));
        return hist.slice(0,3);
    }

    return (
        <TransactionContext.Provider value={
            {addIncome,getIncomes,deleteIncome,totalIncome,addExpense,getExpenses,deleteExpense,totalExpenses,
            totalBalance,transactionHistory,incomes,expenses,err,setErr,loading,setLoading}
            }>
            {props.children}
        </TransactionContext.Provider>
    )
}

export default TransactionContext;
