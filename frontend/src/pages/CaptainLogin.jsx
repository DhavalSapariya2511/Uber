import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {

    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

        if (response.status === 200) {
            const data = response.data
            setCaptain(data.captain);
            localStorage.setItem('token', data.token)
            navigate('/captain-home');
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src='https://pngimg.com/d/uber_PNG24.png' alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>

                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        type="email"
                        placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder='password' />

                    <button
                        className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Login</button>

                    <p className='text-center'>Join a fleet?
                        <Link to='/captain-signup' className='text-blue-600'> Register as a Captain</Link> </p>
                </form>
            </div>
            <div>
                <Link to='/login' className='bg-[#2dd724] flex items-center justify-center text-[#111] font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' >Sign In as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin