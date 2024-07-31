import React from 'react';
import { styled } from 'styled-components';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../utils/icons';
import FormatDate from '../utils/FormatDate';
import useTransactions from '../Hooks/useTransactions';

export default function TransactionItem(props) {
  const {setLoading} = useTransactions();
  const incomeIcon = () => {
    switch (props.category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'stocks':
        return users;
      case 'bitcoin':
        return bitcoin;
      case 'investments':
        return stocks;
      case 'bank transfer':
        return card;
      case 'youtube':
        return yt;
      case 'other':
        return piggy;
      default:
        return '';
    }
  }
  const expenseIcon = () => {
    // console.log(props.category)
    switch (props.category) {
      case 'education':
        return book;
      case 'food':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'clothing':
        return clothing;
      case 'travelling':
        return freelance;
      case 'other':
        return circle;
      default:
        return '';
    }
  }
  const handleClick= async ()=>{
    try{
      setLoading(true);
      await props.deleteItem(props.id);
      setLoading(false);
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }

  }
  return (
    <ItemStyle indicator={props.indicator}>
      <div className='icon'>
        {props.type === 'expense' ? expenseIcon() : incomeIcon()}
      </div>
      <div className='content'>
        <h5>{props.title}</h5>
        <div className='inner-content'>
          <div className='text'>
            <p>{dollar}{props.amount}</p>
            <p>{calender}{FormatDate(props.date)}</p>
            <p>{comment} {props.description}</p>
          </div>
          {props.deleteItem && <div className='btn-con'>
            <ButtonStyle style={{ background:'var(--primary-color', padding:'1rem', color:'#fff', borderRadius: '50%' }} onClick={handleClick} >{trash}</ButtonStyle>
          </div>}
        </div>
      </div>
    </ItemStyle>
  )
}

const ItemStyle = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height:30%;
  color: #222260;
  .icon{
      width: 70px;
      height: 70px;
      border-radius: 20px;
      background: #F5F5F5;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
      i{
          font-size: 2.6rem;
      }
  }
  .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: .2rem;
      h5{
          font-size: 1.3rem;
          padding-left: 2rem;
          position: relative;
          &::before{
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: .8rem;
              height: .8rem;
              border-radius: 50%;
              background: ${props => props.indicator};
          }
      }
      .inner-content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .text{
              display: flex;
              align-items: center;
              gap: 1.5rem;
              p{
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  color: var(--primary-color);
                  opacity: 0.8;
              }
          }
      }
  }
`;

const ButtonStyle = styled.button`
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: .5rem;
  cursor: pointer;
  transition: all .4s ease-in-out;
`;

