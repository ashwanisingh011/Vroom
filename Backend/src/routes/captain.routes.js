const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const captainControllers = require('../controllers/captain.controllers')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/register', [
    body('email').isEmail().withMessage('Invaild email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 6 character'),
    body('password').isLength({min: 6}).withMessage('Password must be at least of 6 character'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 character'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must  be at least 3 character'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcyle', 'auto']).withMessage('Invaild')
],
    captainControllers.registerCaption
)

router.post('/login', [
    body('email').isEmail().withMessage('Invaild email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least of 6 character')
],
    captainControllers.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainControllers.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainControllers.logoutCaptain)

module.exports = router;