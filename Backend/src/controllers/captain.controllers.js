const blacklistTokenModel = require('../models/blacklistToken.model');
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
module.exports.loginCaptain = async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()})
      }
      const {email, password} = req.body;
      const captain = await captainModel.findOne({email}).select('+password');
      if(!captain){
         return res.status(401).json({message: 'Invalid email or password'})
      }
      const isMatch = await captain.comparePassword(password);
      if(!isMatch){
         return res.status(401).json({message:'Invaild  email or password'});
      }
      const token = await captain.generateAuthtoken();
      res.cookie('token', token)
      res.status(200).json({token, captain})
}

module.exports.getCaptainProfile = async (req, res, next) => {
      res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      // Safely read cookie token (req.cookies may be undefined if cookie-parser isn't used)
      const cookieToken = req.cookies ? req.cookies.token : null;
      const headerToken = (authHeader && authHeader.startsWith('Bearer ')) ? authHeader.split(' ')[1] : null;
      const token = cookieToken || headerToken;

      if (!token) {
         return res.status(401).json({ message: 'No token found' });
      }

      await blacklistTokenModel.create({ token });
      if (req.clearCookie) res.clearCookie('token');
      res.status(200).json({ message: 'Logged out successfully' });
   } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Error during logout' });
   }
}