const mongoose = require('mongoose')

const connectDB = async () => {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        console.warn('MONGODB_URI not set in environment - skipping MongoDB connection')
        return
    }

    try {
        const connectionInstance = await mongoose.connect(uri)
        console.log(`\nMongoDB connected. DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error('MONGODB connection is not working', error)
    }
}

module.exports = connectDB