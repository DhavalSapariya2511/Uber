
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LiveTracking = ({ userLocation, driverLocation, destination }) => {
    const [center, setCenter] = useState(userLocation || { lat: 20.5937, lng: 78.9629 });

    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    };

    useEffect(() => {
        if (userLocation) {
            setCenter(userLocation);
        }
    }, [userLocation]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                {userLocation && (
                    <Marker
                        position={userLocation}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        }}
                    />
                )}
                {driverLocation && (
                    <Marker
                        position={driverLocation}
                        icon={{
                            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        }}
                    />
                )}
                {destination && (
                    <Marker position={destination} />
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;