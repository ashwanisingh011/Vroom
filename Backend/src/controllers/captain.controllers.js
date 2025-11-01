const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const {validationResult} = require('express-validator')

module.exports.registerCaption= async (req, res) => {
     const error = validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
     }
     const {fullname, email, password, vehicle} = req.body;
     const hashedPassword = await captainModel.hashPassword(password);

     const isCaptainAlreadyExist = await captainModel.findOne({email})

     if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Caption already exists'})
     }

     const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        vehileType: vehicle.vehicleType,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity
     });

     const token = await captain.generateAuthtoken();
     res.status(201).json({ captain, token });
}