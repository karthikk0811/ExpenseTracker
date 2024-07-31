import React, { useState } from 'react';
import { signout } from '../utils/icons';
import { dashboard, expenses, transactions, trend } from '../utils/icons';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import useLogout from '../Hooks/useLogout';
import useAuth from '../Hooks/useAuth';

export default function Navbar() {
    const {user} = useAuth();
    const logout = useLogout();
    const navigate= useNavigate();
    const [menu, setMenu] = useState([
        {
            id: 1, title: 'Dashboard', icon: dashboard, link: '/', active: false
        },
        {
            id: 2, title: "View Transactions", icon: transactions, link: "/transactions", active: false
        },
        {
            id: 3, title: "Incomes", icon: trend, link: "/incomes", active: false
        },
        {
            id: 4, title: "Expenses", icon: expenses, link: "/expenses", active: false
        },
    ])

    const handleClick = (id) => {
        // console.log("click", id);
        // console.log(menu);
        setMenu((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, active: true } : {...item,active:false}
            )
        );
        // console.log(menu);
    };

    const signOut = async ()=>{
        try{
            await logout();
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <NavStyle>
            <div className='user-con'>
                <div className='text'>
                    <h2>{user?.uname}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <div className='items'>
                <ul>
                    {menu.map((item) => {
                        return <li
                            key={item.id}
                            className={item.active ? 'acitve' : ''}
                            onClick={() => handleClick(item.id)} >
                            <Link to={item.link} className='links' >
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
            <div className='bottom-nav'>
                <li onClick={signOut}>
                    {signout} Sign Out
                </li>
            </div>
        </NavStyle>
    )
}

const NavStyle=styled.div`
    padding: 2rem 1.5rem;
    width: 25%;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
    .items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            align-items: center;
            margin: 1rem 0;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            span{
                font-size:1.2rem;
                padding-left:1rem;
            }
            .links{
                text-decoration:none;
                color: rgba(34, 34, 96, .6);
                font-weight: 400;
                font-size:1.2rem;
            }
        }
    }
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
    .bottom-nav{
        cursor:pointer;
    }
`;
