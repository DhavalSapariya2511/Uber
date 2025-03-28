import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react';

const UserSignup = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});


    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if (response.status === 201) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        setemail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src='https://logospng.org/download/uber/logo-uber-4096.png' alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                            required
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                            }}
                            type="text"
                            placeholder='First name' />
                        <input
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                            required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                            }}
                            type="text"
                            placeholder='Last name' />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>

                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text- placeholder:text-base'
                        required
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value)
                        }}
                        type="email"
                        placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                    <input
                        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text- placeholder:text-base'
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type="password"
                        placeholder='password' />
                    

                    <button
                        className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'>Create Account</button>

                    <p className='text-center'>Already have a account?
                        <Link to='/login' className='text-blue-600'> Login here</Link> </p>
                </form>
            </div>
            <div>
                <p className='text-xs leading-tight font-medium'>
                    This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                        policy</span> and <span className='underline'>Terms of Service apply</span>.

                </p>
            </div>
        </div>
    )
}

export default UserSignup