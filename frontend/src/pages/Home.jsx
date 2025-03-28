import React, { useEffect, useRef, useState } from 'react'
import map from '../assets/map.gif'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../Components/LocationSearchPanel'
import Vehiclepanel from '../Components/Vehiclepanel'
import ConfirmRide from '../Components/ConfirmRide'
import LookingForDriver from '../Components/LookingForDriver'
import WaitingForDriver from '../Components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../Components/LiveTracking'


const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const navigate = useNavigate();

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log(user);
    socket.emit('join', { userType: 'user', userId: user._id });
  }, [user])

  socket.on('ride-confirmed', ride => {

    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false);
    navigate('/riding', { state: { ride } });
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    }
    catch (error) {
      if (error.response) {
        console.error('Error fetching pickup suggestions:', error.response.data);
      } else if (error.request) {
        console.error('Error fetching pickup suggestions: No response received');
      } else {
        console.error('Error fetching pickup suggestions:', error.message);
      }
      console.error('Error details:', error); // Log the error details
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    }
    catch (error) {
      if (error.response) {
        console.error('Error fetching destination suggestions:', error.response.data);
      } else if (error.request) {
        console.error('Error fetching destination suggestions: No response received');
      } else {
        console.error('Error fetching destination suggestions:', error.message);
      }
      console.error('Error details:', error); // Log the error details
    }
  }


  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 26,
        // opacity: 1
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        // opacity: 0
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data);

  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }

    })
    console.log(response.data);
  }

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
      <div className='h-screen w-screen'>
        <LiveTracking/>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] rounded-t-3xl p-6 bg-white relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false)
            }}
            className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 top-[38%] left-10 bg-gray-700 w-1 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] placeholder-gray-600 px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a Pick-up location' />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] placeholder-gray-600 px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white font-semibold px-4 py-2 rounded-lg mt-6 w-full'>
            Find a Trip
          </button>
        </div>
        <div ref={panelRef} className='h-0 bg-white '>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-50 bottom-0 translate-y-full rounded-t-2xl bg-white px-3 py-10 pt-12'>
        <Vehiclepanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel} />
      </div>
      {confirmRidePanel && pickup && destination && (
        <div ref={confirmRidePanelRef} className='fixed w-full z-40 bottom-0 translate-y-full rounded-t-2xl bg-white px-3 py-6 pt-12'>
          <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            // passenger={passenger}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound} />
        </div>
      )}
      {vehicleFound && (
        <div ref={vehicleFoundRef} className='fixed w-full z-30 bottom-0 translate-y-full rounded-t-2xl bg-white px-3 py-6 pt-12'>
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound} />
        </div>
      )}
      {waitingForDriver && (
        <div ref={waitingForDriverRef} className='fixed w-full z-20 bottom-0 translate-y-full rounded-t-2xl bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver} />
        </div>
      )}
    </div>
  )
}

export default Home