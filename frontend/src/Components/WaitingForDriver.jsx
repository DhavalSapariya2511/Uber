import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5
                onClick={() => {
                    props.waitingForDriver(false)
                }}
                className='w-[93%] p-1 text-center absolute top-0'>
                <i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <div className='flex items-center justify-between'>
                <img className='h-20' src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-semibold capitalize'>{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-gray-600'>Mercedes Benz</p>
                    <h1 className='text-lg font-semibold border-2 border-gray-700 rounded text-center mt-3'>PIN : {props.ride?.otp}</h1>
                </div>
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
            </div>


        </div>
    )
}

export default WaitingForDriver