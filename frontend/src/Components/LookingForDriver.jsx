import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5
                onClick={() => {
                    props.setVehicleFound(false)
                }}
                className='w-[93%] p-1 text-center absolute top-0'>
                <i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 flex-col justify-between items-center'>
                <img className='h-40' src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className=' text-gray-600'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className=' text-gray-600'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare && typeof props.fare === 'object' && props.vehicleType in props.fare
                                ? props.fare[props.vehicleType]
                                : 'Unavailable'}</h3>
                            <p className=' text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver