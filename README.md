# Roamly

Roamly is a travel planner application designed to help users organize their trips and create personalized itineraries using AI. Users can manage their travel plans, generate activities, and explore destination information such as weather forecasts and photos.

Tech Stack used to build this app:
* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL
* JSON Web Token (JWT)
* bcrypt
* Google OAuth
* Gemini API
* OpenWeatherMap API
* Unsplash API

&nbsp;

## Deployment

> The Roamly API has been deployed and can be accessed publicly through the following domain.

```text
DEPLOY USER URL = https://YOUR-DOMAIN.com
```

```text
DEPLOY CLIENT URL = https://YOUR-DOMAIN.com
```

```text
BASE URL DEVELOPMENT = http://localhost:3000
```

&nbsp;

## API Endpoints

### POST /regis

> Register a new user.

_Request Header_
```text
no needed
```

_Request Body_
```json
{
  "username": "nadya",
  "email": "nadya@gmail.com",
  "password": "password123",
  "imgUrl": "https://example.com/photo.jpg"
}
```

_Response (201)_
```json
{
  "message": "Succeed register user"
}
```

---

### POST /login

> Login using email and password.

_Request Header_
```text
no needed
```

_Request Body_
```json
{
  "email": "nadya@gmail.com",
  "password": "password123"
}
```

_Response (200)_
```json
{
  "access_token": "your_jwt_token"
}
```

---

### POST /login-google

> Login using Google authentication.

_Request Header_
```text
{
  "token": "<Google credential>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "access_token": "your_jwt_token"
}
```

---

## TRIPS

> All trip endpoints require authentication.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

### GET /trips

> Get all trips belonging to the authenticated user.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "userId": 1,
    "destination": "Bali",
    "title": "Summer Vacation",
    "days": 3,
    "startDate": "2026-11-10",
    "budget": 3000000
  }
]
```

---

### POST /trips

> Create a new trip.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```json
{
  "destination": "Bali",
  "title": "Summer Vacation",
  "days": 3,
  "startDate": "2026-11-10",
  "budget": 3000000
}
```

_Response (201)_
```json
{
  "message": "Successfully create trip",
  "data": {
    "id": 1,
    "destination": "Bali",
    "title": "Summer Vacation",
    "days": 3,
    "startDate": "2026-11-10",
    "budget": 3000000
  }
}
```

---

### GET /trips/:id

> Get a single trip and its activities based on the trip ID.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "id": 1,
  "userId": 1,
  "destination": "Bali",
  "title": "Summer Vacation",
  "days": 3,
  "startDate": "2026-11-10",
  "budget": 3000000,
  "Activities": [
    {
      "id": 1,
      "tripId": 1,
      "title": "Visit Kuta Beach",
      "day": 1,
      "note": "Enjoy the beach and sunset"
    }
  ]
}
```

---

### PUT /trips/:id

> Update an existing trip based on the trip ID.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```json
{
  "destination": "Yogyakarta",
  "title": "Holiday in Yogyakarta",
  "days": 4,
  "startDate": "2026-11-15",
  "budget": 2500000
}
```

_Response (200)_
```json
{
  "message": "Successfully update trip",
  "data": {
    "id": 1,
    "destination": "Yogyakarta",
    "title": "Holiday in Yogyakarta",
    "days": 4,
    "startDate": "2026-11-15",
    "budget": 2500000
  }
}
```

---

### DELETE /trips/:id

> Delete an existing trip based on the trip ID.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "message": "Successfully delete trip"
}
```

---

## ACTIVITIES

> All activity endpoints require authentication.

### POST /trips/:tripId/generate

> Generate a personalized itinerary using Gemini AI based on trip information.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```json
{
  "style": "Adventure"
}
```

_Response (200)_
```json
{
  "message": "Successfully generate activities",
  "activities": [
    {
      "id": 1,
      "tripId": 1,
      "title": "Visit Kuta Beach",
      "day": 1,
      "note": "Enjoy the beach and sunset"
    },
    {
      "id": 2,
      "tripId": 1,
      "title": "Explore Ubud",
      "day": 2,
      "note": "Visit rice terraces and local attractions"
    }
  ]
}
```

---

### PUT /trips/:tripId/activities/:activityId

> Update an activity based on its trip ID and activity ID.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```json
{
  "title": "Visit Ubud",
  "day": 2,
  "note": "Explore the beautiful rice terraces"
}
```

_Response (200)_
```json
{
  "message": "Successfully update activity"
}
```

---

### DELETE /trips/:tripId/activities/:activityId

> Delete an activity based on its trip ID and activity ID.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "message": "Successfully delete activity"
}
```

---

## EXTERNAL API FEATURES

### GET /trips/:id/weather

> Get weather forecast based on the trip destination using OpenWeatherMap API.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "destination": "Bali",
  "result": [
    {
      "date": "2026-11-10",
      "description": "Clear sky",
      "minTemp": 24,
      "maxTemp": 30
    },
    {
      "date": "2026-11-11",
      "description": "Light rain",
      "minTemp": 23,
      "maxTemp": 29
    }
  ]
}
```

---

### GET /trips/:id/photo

> Get a destination photo based on the trip destination using Unsplash API.

_Request Header_
```text
{
  "Authorization": "Bearer <your access token>"
}
```

_Request Body_
```text
not needed
```

_Response (200)_
```json
{
  "destination": "Bali",
  "photo": {
    "url": "https://example.com/bali.jpg",
    "photographer": "Photographer Name",
    "link": "https://example.com"
  }
}
```
