const express = require('express');
const ErrorHandle = require('../middleware/handleError');
const AuthController = require('../controller/AuthController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const ActivityController = require('../controller/ActivityController');
const TripController = require('../controller/TripController');
const router = express.Router();

router.post('/login', AuthController.login)
router.post('/regis', AuthController.regis)
router.post('/login-google', AuthController.loginGoogle)

router.use(authentication)

router.get('/trips', TripController.read)
router.post('/trips', TripController.create)
router.get('/trips/:id', authorization, TripController.detail)
router.put('/trips/:id', authorization, TripController.update)
router.delete('/trips/:id', authorization, TripController.delete)


router.put('/trips/:tripId/activities/:activityId', authorization, ActivityController.update)
router.delete('/trips/:tripId/activities/:activityId', authorization, ActivityController.delete)
router.post('/trips/:tripId/generate', authorization, ActivityController.generate)

router.get('/trips/:id/weather', authorization, TripController.weather)
router.get('/trips/:id/photo', authorization, TripController.photo)



router.use(ErrorHandle)


module.exports = router