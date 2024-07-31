import React, { useEffect, useState } from "react";
import axios from "../../Api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../Hooks/useAuth";
import './style.css';
import toast, { Toaster } from "react-hot-toast";

export default function Login(props) {
    const [uname, setUname] = useState("");
    const [pword, setPword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const { setUser, persist, setPersist } = useAuth();

    const login = async (event) => {
        event.preventDefault();
        let user = {
            uname: uname,
            pword: pword
        }
        toast.promise(axios.post('/auth/login', user),
            {
                loading: "Processing...",
                success: (response) => {
                    setUser({ id: response.data.id, uname, accessToken: response.data.accessToken });
                    navigate(from, { replace: true });
                    return "";
                },
                error: (err) => {
                    if (!err?.response) {
                        return 'No response from the server';
                    }
                    else if (err.response?.status === 400) {
                        return "Missing username or password";
                    }
                    else if (err.response?.status === 401) {
                        return 'Check your username or password';
                    }
                    else {
                        return 'login Failed';
                    }
                },
            }
        )
        //     try {
        //         const res = await axios.post('/auth/login', user);
        //         // console.log(res.data);
        //         setUname('');
        //         setPword('');
        //         setUser({ id: res.data.id, uname, accessToken: res.data.accessToken });
        //         navigate(from, { replace: true });
        //     }
        //     catch (err) {
        //         if (!err?.response) {
        //             toast.error('No response from the server');
        //         }
        //         else if (err.response?.status === 400) {
        //             toast.error("Missing username or password");
        //         }
        //         else if (err.response?.status === 401) {
        //             toast.error('Check your username or password');
        //         }
        //         else {
        //             toast.error('login Failed');
        //         }
        //     }
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

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
            <form >
                <div className="loginBox">
                    <div className="login">
                        Sign In
                    </div>
                    <div className="username">
                        <input className="uname" type="text" placeholder="Username" value={uname} required onChange={(e) => setUname(e.target.value)} />
                    </div>
                    <div className="password">
                        <div className="pass-con" >
                            <input className="pword" type={showPass ? "text" : "password"} placeholder="Password" value={pword} required onChange={(e) => { setPword(e.target.value) }} />
                            <i className={showPass ? "fa fa-eye-slash" : "fa fa-eye"} aria-hidden="true"
                                onClick={() => { setShowPass(!showPass) }} ></i>
                        </div>
                    </div>
                    <div className="or1">
                        not a member?<Link className="orsign" to="/register" > signup now </Link><br></br>
                    </div>
                    <div className="loginbtn">
                        <button className="but" onClick={login} >SIGN IN</button>
                        <br />
                        <input id="persist" type="checkbox" onChange={() => setPersist(!persist)} checked={persist} />
                        <label htmlFor="persist"> Remember Me</label>
                    </div>
                </div>
            </form>
        </>
    )
}