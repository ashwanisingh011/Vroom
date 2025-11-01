const captainModel = require('../models/captain.model')

module.exports.createCaptain = async ({
    firstname, lastname, email, password, vehileType, color, plate, capacity 
}) => {
   if(!firstname || !lastname || !email || !password || !vehileType || !color || !plate || !capacity) {
    throw new Error('All fields are required');
   }
   const captain = captainModel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType: vehileType
        }
   })
   return captain;
}