# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by accepting their first name, last name, email, and password.

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
    - `fullname.firstname` (string, required): First name of the user (minimum 3 characters).
    - `fullname.lastname` (string, optional): Last name of the user (minimum 3 characters).
- `email` (string, required): Valid email address.
- `password` (string, required): Password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object):
     - `fullname.firstname` (string): First name of the user (minimum 3 characters).
     - `fullname.lastname` (string): Last name of the user (minimum 3 characters).
  - `email` (string): Valid email address.
  - `password` (string): Password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/login` Endpoint

### Description

Authenticates a user using their email and password.

### HTTP Method

`POST`

### Request Body

- `email` (string, required): Valid email address.
- `password` (string, required): Password (minimum 6 characters).

### Example Response

- `user` (object):
  - `fullname` (object):
     - `fullname.firstname` (string): First name of the user (minimum 3 characters).
     - `fullname.lastname` (string): Last name of the user (minimum 3 characters).
  - `email` (string): Valid email address.
  - `password` (string): Password (minimum 6 characters).
- `token` (String): JWT Token

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the authenticated user.

### HTTP Method

`GET`

### Headers

- `Authorization`: Bearer token obtained upon login.

### Example Response

- `user` (object):
  - `fullname` (object):
     - `fullname.firstname` (string): First name of the user.
     - `fullname.lastname` (string): Last name of the user.
  - `email` (string): Valid email address.

## `/users/logout` Endpoint

### Description

Logs out the authenticated user by invalidating their token.

### HTTP Method

`GET`

### Headers

- `Authorization`: Bearer token obtained upon login.

### Example Response

- `message` (string): Confirmation message, e.g., "Logged Out".

## `/captains/register` Endpoint

### Description

Registers a new captain by accepting their first name, last name, email, password, and vehicle details.

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
    - `firstname` (string, required): First name of the captain (minimum 3 characters).
    - `lastname` (string, optional): Last name of the captain.
- `email` (string, required): Valid email address.
- `password` (string, required): Password (minimum 6 characters).
- `vehicle` (object):
    - `color` (string, required): Color of the vehicle (minimum 3 characters).
    - `plate` (string, required): License plate of the vehicle (minimum 3 characters).
    - `capacity` (number, required): Capacity of the vehicle (minimum 1).
    - `vehicleType` (string, required): Type of the vehicle (must be one of 'car', 'auto', 'motorcycle').

### Example Response

- `captain` (object):
  - `fullname` (object):
     - `firstname` (string): First name of the captain.
     - `lastname` (string): Last name of the captain.
  - `email` (string): Valid email address.
  - `password` (string, required): Password (minimum 6 characters).
  - `vehicle` (object):
    - `color` (string): Color of the vehicle.
    - `plate` (string): License plate of the vehicle.
    - `capacity` (number): Capacity of the vehicle.
    - `vehicleType` (string): Type of the vehicle.
- `token` (string): JWT Token

## `/captains/login` Endpoint

### Description

Authenticates a captain using their email and password.

### HTTP Method

`POST`

### Request Body

- `email` (string, required): Valid email address.
- `password` (string, required): Password (minimum 6 characters).

### Example Response

- `captain` (object):
  - `fullname` (object):
     - `firstname` (string): First name of the captain.
     - `lastname` (string): Last name of the captain.
  - `email` (string): Valid email address.
  - `vehicle` (object):
    - `color` (string): Color of the vehicle.
    - `plate` (string): License plate of the vehicle.
    - `capacity` (number): Capacity of the vehicle.
    - `vehicleType` (string): Type of the vehicle.
- `token` (string): JWT Token

## `/captains/profile` Endpoint

### Description

Retrieves the profile information of the authenticated captain.

### HTTP Method

`GET`

### Headers

- `Authorization`: Bearer token obtained upon login.

### Example Response

- `captain` (object):
  - `fullname` (object):
     - `firstname` (string): First name of the captain.
     - `lastname` (string): Last name of the captain.
  - `email` (string): Valid email address.
  - `vehicle` (object):
    - `color` (string): Color of the vehicle.
    - `plate` (string): License plate of the vehicle.
    - `capacity` (number): Capacity of the vehicle.
    - `vehicleType` (string): Type of the vehicle.

## `/captains/logout` Endpoint

### Description

Logs out the authenticated captain by invalidating their token.

### HTTP Method

`GET`

### Headers

- `Authorization`: Bearer token obtained upon login.

### Example Response

- `message` (string): Confirmation message, e.g., "Logout successfully".

## `/maps/get-coordinates` Endpoint

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### HTTP Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

- `GET` /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA

### Example Response

- {
  "ltd": 37.4224764,
  "lng": -122.0842499
}

### Error Response

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.
- {
  "message": "Coordinates not found"
}

## `/maps/get-distance-time` Endpoint

### Description

Retrieves the distance and estimated travel time between two locations.

### HTTP Method

`GET`

### Request Parameters

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

### Example Request

- `GET` /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA

### Example Response

- {
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}

### Error Response

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.
- {
  "message": "No routes found"
}

## `/maps/get-suggestions` Endpoint

### Description

Retrieves autocomplete suggestions for a given input string.

### HTTP Method

`GET`

### Request Parameters

- `input` (string, required): The input string for which to retrieve suggestions.

### Example Request

- `GET` /maps/get-suggestions?input=1600+Amphitheatre

### Example Response

- [
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]

### Error Response

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.
- {
  "message": "Unable to fetch suggestions"
}

## `/rides/create` Endpoint

### Description

Creates a new ride with the provided information.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header: `Authorization: Bearer <token>`

### Request Body

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

### Example Response

- `ride` (object):
- `user` (string): User ID.
- `pickup` (string): Pickup address.
- `destination` (string): Destination address.
- `fare` (number): Fare amount.
- `status` (string): Ride status.
- `duration` (number): Duration in seconds.
- `distance` (number): Distance in meters.
- `otp` (string): OTP for the ride.

### Error Response

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.
- {
  "message": "Error message"
}

## `/rides/get-fare` Endpoint
## Description

Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header: `Authorization:

Bearer

### Request Parameters

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

### Example Request

- `GET` /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA

### Example Response

- {
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}

### Error Response

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.
- {
  "message": "Error message"
}