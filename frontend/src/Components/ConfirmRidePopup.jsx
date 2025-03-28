import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const sumbitHanlder = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
                
                // Ensure distance is properly passed
                const rideWithDistance = {
                    ...props.ride,
                    distance: props.ride.distance || '2.2' // Use existing distance or default
                };
                
                navigate('/captain-riding', { 
                    state: { 
                        ride: rideWithDistance
                    } 
                });
            }
        } catch (error) {
            console.error('Error starting ride:', error);
        }
    }

    return (
        <div>
            <h5
                onClick={() => {
                    props.setConfirmRidePopupPanel(false)
                }}
                className='w-[93%] p-1 text-center absolute top-0'>
                <i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to start</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://th.bing.com/th/id/R.a974526b0d8e713d6d10c6dbc35a5c91?rik=PxQRbin%2fOhnx2Q&riu=http%3a%2f%2fbr.web.img2.acsta.net%2fpictures%2f18%2f06%2f29%2f00%2f35%2f0101925.jpg&ehk=CSN0w13UxlvwbfQVwIRgLcU1NDeetirwL0F0KpsbOI0%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <h2 className='text-xl font-semibold capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.ride?.distance || '2.2'} Km</h5>
            </div>

            <div className='flex gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>pickup</h3>
                            <p className=' text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>destination</h3>
                            <p className=' text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className=' text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
                    <form onSubmit={sumbitHanlder}>
                        <input value={otp} onChange={(e) => {
                            setOtp(e.target.value)
                        }} type="text" placeholder='Enter OTP' className='bg-[#eee] placeholder-gray-600 px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' />
                        <button className='w-full text-lg bg-green-600 mt-5 flex justify-center text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false);
                            props.setRidePopupPanel(false);
                        }}
                            className='w-full mt-2 text-white text-lg bg-red-600 font-semibold p-3 rounded-lg'>Cancle</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup