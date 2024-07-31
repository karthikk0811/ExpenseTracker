import React, { useEffect } from 'react'
import useTransactions from '../Hooks/useTransactions';
import { InnerLayout } from '../Styles/Layout';
import TransactionItem from './TransactionItem';
import { styled } from 'styled-components';
import Form from './Form';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import Skeleton from 'react-loading-skeleton';

export default function Expenses() {
  const {expenses,totalExpenses,deleteExpense,getExpenses,addExpense,loading,setLoading}=useTransactions();
  const axiosPrivate = useAxiosPrivate();
  const categories=["education","food","health","subscriptions","takeaways","clothing","travelling","other"];
  useEffect(()=>{
    let isMounted=true;
    const GetExpenses = async ()=>{
      if(isMounted){
        try {
          setLoading(true);
          await getExpenses(axiosPrivate);
          setLoading(false);
          
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
    GetExpenses();
    return ()=>{
      isMounted=false;
    }
  },[])  
  return (
    <IncomeStyle>
      <InnerLayout>
        <h2>Expenses</h2>
        <h3 className='total'>Total Expenses: <span>${totalExpenses()}</span></h3>
        <div className='content'>
          <div className='form'>
            <Form submitFunction={addExpense} categories={categories} butName="Add Expense" />
          </div>
          <div className='incomes'>
            {loading?<Skeleton count={3}/>: expenses.map((expense)=>{
              // console.log(expense);
              const {_id,title,amount,date,category,description,type} = expense;
              return <TransactionItem
                       key={_id}
                       id={_id}
                       title={title}
                       description={description}
                       amount={amount}
                       date={date}
                       category={category}
                       type={type}
                       indicator="red"
                       deleteItem={deleteExpense} 
                        />
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyle>   
  )
}
const IncomeStyle=styled.div`
  display: flex;
  overflow: auto;
  .total{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-green);
      }
  }
  .content{
      display: flex;
      gap: 2rem;
      .incomes{
          flex: 1;
      }
  }
`;