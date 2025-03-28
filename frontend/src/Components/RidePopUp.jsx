import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5
                onClick={() => {
                    props.setRidePopupPanel(false)
                }}
                className='w-[93%] p-1 text-center absolute top-0'>
                <i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Avalaible !</h3>

            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-16 w-16 rounded-full object-cover' src="https://th.bing.com/th/id/R.a974526b0d8e713d6d10c6dbc35a5c91?rik=PxQRbin%2fOhnx2Q&riu=http%3a%2f%2fbr.web.img2.acsta.net%2fpictures%2f18%2f06%2f29%2f00%2f35%2f0101925.jpg&ehk=CSN0w13UxlvwbfQVwIRgLcU1NDeetirwL0F0KpsbOI0%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    <h2 className='text-xl font-semibold'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{props.ride?.distance || '2.2'} Km</h5>
            </div>

            <div className='flex gap-2 flex-col justify-between items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className=' text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
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
                <div className='flex mt-5 w-full items-center justify-between'>
                <button onClick={() => {
                        props.setRidePopupPanel(false);
                    }}
                        className=' bg-gray-300 mt-1 text-gray-800 font-semibold p-3 px-10  rounded-lg'>Ignore</button>
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true);
                        props.confirmRide();
                    }}
                        className=' bg-green-600  text-white font-semibold p-3 px-10  rounded-lg'>Accept</button>
                    
                </div>

            </div>
        </div>
    )
}

export default RidePopUp