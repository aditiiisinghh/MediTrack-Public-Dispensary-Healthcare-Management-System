import React, { useState } from 'react'
import './login.css'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ForgotModal from '../../components/FogotModal/forgotModal'

const Login = (props) => {
    const navigate = useNavigate();
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loginField, setLoginField] = useState({ email: "", password: "" });
    const [registerField, setRegisterField] = useState({ name: "", email: "", password: "", roll: "" });

    const handleForgotModal = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnChange = (event, key, card) => {
        if (card === "login") {
            setLoginField({ ...loginField, [key]: event.target.value });
        } else {
            setRegisterField({ ...registerField, [key]: event.target.value });
        }
    }

    const handleLogin = async () => {
        if (loginField.email.trim() === "" || loginField.password.trim() === "") return toast.error("Please enter the credentials");
        props.showLoader();
        await axios.post('http://localhost:4000/api/auth/login', loginField, { withCredentials: true }).then(resp => {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("userInfo", JSON.stringify(resp.data.userInfo));
            props.handleLogin("true");
            const role = resp.data.userInfo.role;
            const id = resp.data.userInfo._id;
            if (role === "student") {
                navigate(`/student/${id}`);
            } else {
                navigate('/admin/dashboard');
            }
        }).catch(err => {
            toast.error(err?.response?.data?.error || "Login failed");
        }).finally(() => {
            props.hideLoader();
        });
    }

    const handleRegister = async () => {
        if (registerField.name.trim() === "" || registerField.email.trim() === "" || registerField.password.trim() === "" || registerField.roll.trim() === "") {
            return toast.error("Please fill all the fields");
        }
        props.showLoader();
        await axios.post('http://localhost:4000/api/auth/register', registerField, { withCredentials: true }).then(resp => {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("userInfo", JSON.stringify(resp.data.userInfo));
            props.handleLogin("true");
            navigate(`/student/${resp.data.userInfo._id}`);
        }).catch(err => {
            toast.error(err?.response?.data?.error || "Registration failed");
        }).finally(() => {
            props.hideLoader();
        });
    }

    return (
        <div className='login-page'>
            <div className='login-page-card'>
                <div className='card-header-form'>Login</div>
                <div className='form-input-fields'>
                    <input className='input-box-register' value={loginField.email} onChange={(e) => handleOnChange(e, "email", "login")} type='email' placeholder='Email' />
                    <input className='input-box-register' value={loginField.password} onChange={(e) => handleOnChange(e, "password", "login")} type='password' placeholder='Password' />
                </div>
                <div className='form-btn' onClick={handleLogin}>Login</div>
                <div className='forgot-password-link' onClick={handleForgotModal}>Forgot Password?</div>
            </div>

            <div className='signup-page-card'>
                <div className='card-header-form'>Register</div>
                <div className='form-input-fields'>
                    <input className='input-box-register' value={registerField.name} onChange={(e) => handleOnChange(e, "name", "register")} type='text' placeholder='Full Name' />
                    <input className='input-box-register' value={registerField.email} onChange={(e) => handleOnChange(e, "email", "register")} type='email' placeholder='Email' />
                    <input className='input-box-register' value={registerField.password} onChange={(e) => handleOnChange(e, "password", "register")} type='password' placeholder='Password' />
                    <input className='input-box-register' value={registerField.roll} onChange={(e) => handleOnChange(e, "roll", "register")} type='text' placeholder='Roll Number' />
                </div>
                <div className='form-btn' onClick={handleRegister}>Register</div>
            </div>

            <ToastContainer />
            {forgotPassword && <ForgotModal showLoader={props.showLoader} hideLoader={props.hideLoader} closeModal={handleForgotModal} />}
        </div>
    )
}

export default Login
