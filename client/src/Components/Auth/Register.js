import React, { useState } from "react";
import axios from '../../Api/axios';
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import toast, { Toaster } from 'react-hot-toast';

export default function Register(props) {
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [confirmPword, setConfirmPword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const unameChange = (event) => {
        setUname(event.target.value);
    }
    const pwrodChange = (event) => {
        setPword(event.target.value);
    }
    const cpwordChange = (event) => {
        setConfirmPword(event.target.value);
    }
    const validatePass = (pass) => {
        if (pass.length < 8) {
            toast.error("Password must contain atleast 8 characters")
            return false;
        }
        const hasUpper = /[A-Z]/;
        const hasLower = /[a-z]/;
        const hasDigit = /\d/;
        const hasSpecial = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/;
        if (!hasUpper.test(pass)) {
            toast.error("Password must contain atleast 1 uppercase");
            return false;
        }
        else if (!hasLower.test(pass)) {
            toast.error("Password must contain atleast 1 lowercase");
            return false;
        }
        else if (!hasDigit.test(pass)) {
            toast.error("Password must contain atleast 1 digit");
            return false;
        }
        else if (!hasSpecial.test(pass)) {
            toast.error("Password must contain atleast 1 special character");
            return false;
        }
        return true;
    }
    const register = async (event) => {
        event.preventDefault();
        if (uname === '' || pword === '' || confirmPword === '') {
            toast.error("Please enter all the fields");
        }
        else if (pword !== confirmPword) {
            toast.error("Passwords do not match");
        }
        else {
            if (!validatePass(pword)) return;
            let user = {
                uname: uname,
                pword: pword
            }
            toast.promise(axios.post('/auth/register', user), {
                loading: "Processing...",
                success: (response)=>{
                    navigate('/login',{replace:true})
                    return response.data.message;
                },
                error: (err) => {
                    if (!err?.response) {
                        return "No response from the server";
                    }
                    else if (err.response?.status === 409) {
                        return "Username taken";
                    }
                    else {
                        return "Registration Failed";
                    }
                }
            })
            // try {
            //     const res = await axios.post('/auth/register', user);
            //     console.log(res);
            //     navigate('/login', { replace: true });
            // }
            // catch (err) {
            //     if (!err?.response) {
            //         toast.error("No response from the server");
            //     }
            //     else if (err.response?.status === 409) {
            //         toast.error("Username taken");
            //     }
            //     else {
            //         toast.error("Registration Failed");
            //     }
            // }
        }
    }
    return (
        <>
            <div>
                <Toaster
                    position="top-center"
                    toastOptions={{
                        error:{
                            duration:2500
                        },
                        success:{
                            duration:2500
                        }
                    }}
                />
            </div>
            <form action="/">
                <div className="box">
                    <div className="login">
                        Sign Up
                    </div>
                    <div className="username">
                        <input className="uname" value={uname} onChange={unameChange} type="text" placeholder="username" required />
                    </div>
                    <div className="password">
                        <div className="pass-con">
                            <input className="pword" value={pword} onChange={pwrodChange} type={showPass ? 'text' : 'password'} placeholder="password" required />
                            <i className={showPass ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"
                                onClick={() => { setShowPass(!showPass) }} ></i>
                        </div>
                        <br />
                        <span>*must contain one upper,lower,digit,special character</span>
                    </div>
                    <div className="password">
                        <div className="pass-con">
                            <input className="pword" value={confirmPword} onChange={cpwordChange} type={showPass ? 'text' : 'password'} placeholder="confirm password" required />
                            <i className={showPass ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"
                                onClick={() => { setShowPass(!showPass) }} ></i>
                        </div>
                    </div>
                    <div className="or1">
                        already a member?<Link className="orsign" to="/login" > signin </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={register}>SIGN UP</button>
                    </div>
                </div>
            </form>
        </>
    );
}