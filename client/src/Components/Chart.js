import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useTransactions from '../Hooks/useTransactions';
import {styled} from 'styled-components';
import FormatDate from '../utils/FormatDate';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

export default function Chart() {
    const { incomes, expenses } = useTransactions();
    const allTransactions=[...incomes,...expenses];
    allTransactions.sort((a,b)=>{
        return new Date(a.date.split('/').reverse().join('/')) - new Date(b.date.split('/').reverse().join('/')) ;
    });
    const groupedData={};
    allTransactions.forEach((transaction)=>{
        const date=transaction.date;
        if(!groupedData[date]){
            groupedData[date]={income:0,expense:0}
        }
        if(transaction.type==='income'){
            groupedData[date].income+=transaction.amount;
        }
        else{
            groupedData[date].expense+=transaction.amount;
        }
    });
    const labelData=Object.keys(groupedData);
    const data={
        labels:[...labelData.map((date)=>FormatDate(date))],
        datasets:[
            {
                label:'Expense',
                data:labelData.map((date)=>groupedData[date].expense),
                backgroundColor:'red',
                tension:.2
            },
            {
                label:'Income',
                data:labelData.map((date)=>groupedData[date].income),
                backgroundColor:'green',
                tension:.2
            }
        ]
    }
    return (
        <ChartStyle>
            <Line data={data} />
        </ChartStyle>
    )
}

const ChartStyle= styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;