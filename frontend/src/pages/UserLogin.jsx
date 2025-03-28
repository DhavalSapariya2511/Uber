import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react';
import axios from 'axios';


const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

        if (response.status === 200) {
            const data = response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }

        setEmail('');
        setPassword('');
    }

  return (
      <div className='p-7 h-screen flex flex-col justify-between'>
          <div>
          <img className='w-16 mb-10' src='https://logospng.org/download/uber/logo-uber-4096.png' alt="" />
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

                  <p className='text-center'>New here? 
                    <Link to='/signup' className='text-blue-600'> Create new Account</Link> </p>
          </form>
          </div>
          <div>
              <Link to='/captain-login' className='bg-[#ffd52b] flex items-center justify-center text-[#111] font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base' >Sign In as Captain</Link>
          </div>
    </div>
  )
}

export default UserLogin