import React from 'react'
import useTransactions from '../Hooks/useTransactions';
import {styled} from 'styled-components';

export default function History() {
  const { transactionHistory } = useTransactions();
  const history = transactionHistory();

  return (
    <HistoryStyle>
      <h3>Recent History</h3>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className='history-item' >
            <p style={{
              color: type === 'expense' ? 'red' : 'var(--color-green)'
            }}>
              {title}
            </p>
            <p style={{
              color: type === 'expense' ? 'red' : 'var(--color-green)'
            }}>
              {
                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`
              }
            </p>
          </div>
        );
      })}
    </HistoryStyle>
  )
}

const HistoryStyle=styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .history-item{
    background: #FCF6F9;
    border: 2px solid #FFF;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:4rem;
  }
`
