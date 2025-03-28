import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import map from '../assets/map.gif'
import FinishRide from '../Components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../Components/LiveTracking'


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;
    console.log('Ride data received:', rideData);

    const formattedDistance = rideData?.distance ? 
        parseFloat(rideData.distance).toFixed(1) : 
        '2.2';

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0%)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    return (    
        <div className='h-screen'>

            <div className='fixed p-6 top-0 items-center flex justify-between w-screen'>
                <img className='w-16' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-semibold  ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <LiveTracking/>
            </div>
            <div className='h-1/5 p-5 flex items-center relative rounded-2xl justify-between bg-yellow-400 pt-10'
                onClick={() => {
                    setFinishRidePanel(true)
                }}
            >
                <h5 onClick={() => {
                }}
                    className='w-[93%] p-1 text-center absolute top-0'>
                    <i className="text-2xl text-gray-700 ri-arrow-up-wide-line"></i></h5>
                <h4 className='text-xl font-semibold'>{formattedDistance} km away</h4>
                <button className=' bg-green-600  text-white font-semibold p-3 px-10  rounded-lg'>Complete Ride</button>
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  rounded-t-2xl bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding