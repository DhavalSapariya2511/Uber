import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
    
    
const CaptainSignUp = () => {

    const navigate = useNavigate();

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');


    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if (response.status === 201) {
            const data = response.data
            setCaptain(data.captain);
            localStorage.setItem('token', data.token)
            navigate('/captain-home');
        }


        setemail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src='https://pngimg.com/d/uber_PNG24.png' alt="" />
                <form onSubmit={(e) => {
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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

                    <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>

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

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>

                    <div className='flex gap-4 mb-7'>
                        <input
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            required
                            type="text"
                            placeholder='Vehicle Color'
                            onChange={(e) => setVehicleColor(e.target.value)} />

                        <input
                            className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            required
                            type="text"
                            placeholder='Vehicle Number'
                            onChange={(e) => setVehiclePlate(e.target.value)} />
                    </div>

                    <div className='flex gap-4 mb-7'>
                        <input
                            className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            required
                            type="number"
                            placeholder='Vehicle Capacity'
                            min="1"
                            onChange={(e) => setVehicleCapacity(e.target.value)} />

                        <select
                            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
                            required
                            onChange={(e) => setVehicleType(e.target.value)} >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="motorcycle">Motorcycle</option>
                        </select>
                    </div>

                    <button
                        className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2  w-full text-[18px] placeholder:text-base'>Create Captain Account</button>

                    <p className='text-center'>Already have a account?
                        <Link to='/captain-login' className='text-blue-600'> Login here</Link> </p>
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

export default CaptainSignUp