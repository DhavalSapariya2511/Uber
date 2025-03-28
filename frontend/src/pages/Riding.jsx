import React from 'react'
import map from '../assets/map.gif'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {};
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    socket.on('ride-ended', () => {
        navigate('/home');
    })

    return (
        <div className='h-screen overflow-hidden flex flex-col'>
            <Link to='/home' className='fixed h-10 w-10 right-2 top-2 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-semibold  ri-home-4-line"></i>
            </Link>
            <div className='flex-1'>
                <LiveTracking/>
            </div>
            <div className='flex-1 p-4 overflow-y-auto'>
                <div className='flex items-center justify-between'>
                    <img className='h-20' src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-semibold'>{ride?.captain?.fullname?.firstname + " " + ride?.captain?.fullname?.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='text-gray-600'>Mercedes Benz</p>
                    </div>
                </div>

                <div className='flex gap-2 flex-col justify-between items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className=' text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className=' text-gray-600'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-600 mt-5 text-lg text-white font-semibold p-3 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding