import React, { useState } from 'react'
import { styled } from 'styled-components'
import useTransactions from '../Hooks/useTransactions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { plus } from '../utils/icons';

export default function Form({ submitFunction, categories, butName }) {
  const { err, setErr,setLoading } = useTransactions();
  const [input, setInput] = useState({
    title: '',
    amount: '',
    date: '',
    description: '',
    category: ''
  });

  const handleSubmit =async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      setLoading(true);
      await submitFunction(input);
      setInput({
        title: '',
        amount: '',
        date: '',
        description: '',
        category: ''
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
    setErr('');
  }

  return (
    <IncomeFromStyle onSubmit={handleSubmit}>
      {err && <p className='error'>{err}</p>}
      <div className='input-con'>
        <input required type='text' name='title' value={input.title} placeholder='Title' onChange={handleChange} />
      </div>
      <div className='input-con'>
        <input required type='text' name='amount' value={input.amount} placeholder='Amount' onChange={handleChange} />
      </div>
      <div className='input-con'>
        <DatePicker
          required
          id='date'
          placeholderText='Date'
          selected={input.date}
          dateFormat="dd/MM/yyyy"
          onChange={(d) => setInput({ ...input, date: d })}
        />
      </div>
      <div className='input-con'>
        <select required value={input.category} name='category' onChange={handleChange}>
          <option value="" disabled >Select Category</option>
          {categories.map((cat, ind) => {
            return (<option key={ind} value={cat}>{cat}</option>);
          })}
        </select>
      </div>
      <div className='input-con' >
        <textarea  name='description' value={input.description} onChange={handleChange} placeholder='Add any description' cols='30' rows='4'  ></textarea>
      </div>
      <div className="submit-btn">
        <ButtonStyle style={{ background:'var(--color-accent' ,padding:'.8rem 1.6rem' , color: '#fff', borderRadius: '30px' }} > {plus} {butName} </ButtonStyle>
      </div>
    </IncomeFromStyle>
  )
}

const IncomeFromStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input, textarea, select{
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder{
          color: rgba(34, 34, 96, 0.4);
      }
  }
  .input-con{
      input{
          width: 100%;
      }
  }
  .selects{
      display: flex;
      justify-content: flex-end;
      select{
          color: rgba(34, 34, 96, 0.4);
          &:focus, &:active{
              color: rgba(34, 34, 96, 1);
          }
      }
  }
  .submit-btn{
      button{
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          &:hover{
              background: var(--color-green) !important;
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
`