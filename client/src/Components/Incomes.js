import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import useTransactions from '../Hooks/useTransactions';
import {InnerLayout} from '../Styles/Layout';
import TransactionItem from './TransactionItem';
import Form from './Form';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Incomes() {
  const {incomes,totalIncome,deleteIncome,getIncomes,addIncome,loading,setLoading}=useTransactions();
  const categories=["salary","investments","freelancing","bitcoin","bank transfer","youtube","other"];
  const axiosPrivate = useAxiosPrivate();
  useEffect(()=>{
    let isMounted=true;
    const GetIcnomes = async () =>{
      if(isMounted){
        try {
          setLoading(true);
          await getIncomes(axiosPrivate);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    }
    GetIcnomes();
    return ()=>{
      isMounted=false;
    }
  },[])
  return (
    <IncomeStyle>
      <InnerLayout>
        <h2>Incomes</h2>
        <h3 className='total'>Total Income: <span>${totalIncome()}</span></h3>
        <div className='content'>
          <div className='form'>
            <Form submitFunction={addIncome} categories={categories} butName="Add Income" />
          </div>
          <div className='incomes'>
            { loading?<Skeleton count={3}/>: incomes.map((income)=>{
              // console.log(income);
              const {_id,title,amount,date,category,description,type} = income;
              return <TransactionItem
                       key={_id}
                       id={_id}
                       title={title}
                       description={description}
                       amount={amount}
                       date={date}
                       category={category}
                       type={type}
                       indicator="var(--color-green)"
                       deleteItem={deleteIncome} 
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