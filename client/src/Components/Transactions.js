import React, { useEffect, useState } from 'react'
import useTransactions from '../Hooks/useTransactions'
import TransactionItem from './TransactionItem';
import { styled } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';

export default function Transactions() {
    const {incomes, expenses,getIncomes,getExpenses,loading,setLoading} = useTransactions();
    const [all,setAll] = useState([]);
    const axiosPrivate=useAxiosPrivate();
    useEffect(()=>{
        let isMounted=true;
        const getTransactions= async ()=>{
            if(isMounted){
                try {
                    setLoading(true);
                    await getExpenses(axiosPrivate);
                    await getIncomes(axiosPrivate);
                    setAll([...incomes,...expenses]);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        }
        getTransactions();
        return ()=>{
            isMounted=false;
        }
    },[])
    return (
        <ItemDiv>
            {loading?<Skeleton count={3}/>:all.map((item) => {
                const {_id, title, amount, date, category, description, type} = item;
                return (
                <TransactionItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    category={category}
                    type={type}
                    indicator={type==="income"?"var(--color-green)":"red"}
                />
                );
            })}
        </ItemDiv>
      );
}

const ItemDiv=styled.div`
    padding:1rem;
    display:flex;
    flex-direction:column;
`;
