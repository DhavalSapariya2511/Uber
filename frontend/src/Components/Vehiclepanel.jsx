import React from 'react'

const Vehiclepanel = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="w-[93%] p-1 text-center absolute top-0"
      >
        <i className="text-2xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      {props.fare ? (
        <>
          <div
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.setVehiclePanel(false);
              props.selectVehicle('car');
            }}
            className="flex border-[3px] mb-2 active:border-black rounded-xl w-full items-center justify-between p-3"
          >
            <img
              className="h-12"
              src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
              alt=""
            />
            <div className="w-1/2">
              <h4 className="font-medium text-lg">
                UberGO <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="font-medium">2 mins away</h5>
              <p className="font-normal text-base text-gray-600">
                Affordable, compact rides
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
          </div>
          <div
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.setVehiclePanel(false);
              props.selectVehicle('moto');
            }}
            className="flex border-[3px] mb-2 active:border-black rounded-xl w-full items-center justify-between p-3"
          >
            <img
              className="h-12"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt=""
            />
            <div className="w-1/2">
              <h4 className="font-medium text-lg">
                Moto <span>
                  <i className="ri-user-3-fill"></i>1
                </span>
              </h4>
              <h5 className="font-medium">3 mins away</h5>
              <p className="font-normal text-base text-gray-600">
                Affordable motorcycle rides
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.moto}</h2>
          </div>
          <div
            onClick={() => {
              props.setConfirmRidePanel(true);
              props.setVehiclePanel(false);
              props.selectVehicle('auto');
            }}
            className="flex border-[3px] mb-2 active:border-black rounded-xl w-full items-center justify-between p-3"
          >
            <img
              className="h-12"
              src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
              alt=""
            />
            <div className="w-1/2">
              <h4 className="font-medium text-lg">
                UberAuto <span>
                  <i className="ri-user-3-fill"></i>3
                </span>
              </h4>
              <h5 className="font-medium">2 mins away</h5>
              <p className="font-normal text-base text-gray-600">
                Affordable auto rides
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
          </div>
        </>
      ) : (
        <p>Loading fare information...</p>
      )}
    </div>
  );
};

export default Vehiclepanel;
