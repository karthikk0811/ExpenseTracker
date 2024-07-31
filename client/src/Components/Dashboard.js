import React, { useEffect } from 'react';
import useTransactions from '../Hooks/useTransactions';
import History from './History';
import { dollar } from '../utils/icons';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { InnerLayout } from '../Styles/Layout';
import styled from 'styled-components';
import Chart from './Chart';

export default function Dashboard() {
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } =
    useTransactions();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted=true;
    const getTransactions = async ()=>{
      if(isMounted){
        try {
          await getExpenses(axiosPrivate);
          await getIncomes(axiosPrivate);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getTransactions();
    return ()=>{
      isMounted=false;
    }
  }, [])

  return (
    <DashboardStyle>
      <InnerLayout>
        <h2>All Transactions</h2>
        <div className='stats'>
          <div className='chart'>
            <Chart/>
            <div className='amount'>
              <div className='income'>
                <h3>Total Income</h3>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className='expense'>
                <h3>Total Expense</h3>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className='balance'>
                <h3>Total Balance</h3>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className='history'>
            <History />
            <h2 className='salary-title'>Min <span>Salary</span> Max</h2>
            <div className='salary-item'>
              <p>
                ${incomes.length>0?Math.min(...incomes.map(item => item.amount)):0}
              </p>
              <p>
                ${incomes.length>0? Math.max(...incomes.map(item => item.amount)):0}
              </p>
            </div>
            <h2 className='salary-title'>Min <span>Expense</span> Max</h2>
            <div className='salary-item'>
              <p>
                ${expenses.length>0?Math.min(...expenses.map(item => item.amount)):0}
              </p>
              <p>
                ${expenses.length>0?Math.max(...expenses.map(item => item.amount)):0}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyle>
  )
}

const DashboardStyle = styled.div`
    .stats{
      display: grid;
      grid-template-columns: repeat(5,1fr);
      gap: 2rem;
    }
    .chart{
      grid-column: 1/4;
      height: 300px;
    }
    .amount{
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .income, .expense{
      grid-column: span 2;
    }
    .income, .expense, .balance{
      background: #FCF6F9;
      border: 2px solid #FFF;
      box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
      border-radius: 20px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .income, .expense, .balance p{
      font-size: 1.5rem;
      font-weight: 700;
    }
    .balance{
      grid-column: 2/4;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .balance p{
      color: var(--color-green);
      opacity: 0,6;
      font-size: 1.5rem;
    }
    .history{
      grid-column: 4/-1;
    }
    .history h2{
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .salary-title{
      font-size: 1.2rem;
    }
    .salary-title span{
      font-size: 1.8rem;
    }
    .salary-item{
      background: #FCF6F9;
      border: 2px solid #FFF;
      box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
      padding: 1rem;
      border-radius: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .salary-item p{
      font-size: 1.6rem;
    }
`;