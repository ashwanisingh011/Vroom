const mongoose = require('mongoose')

const connectDB = async () => {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        console.warn('MONGODB_URI not set in environment - skipping MongoDB connection')
        return
    }

    try {
        // Configure mongoose connection options
        mongoose.set('strictQuery', true)
        
        const connectionInstance = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000, // 10 seconds timeout
            maxPoolSize: 10,
            socketTimeoutMS: 45000, // 45 seconds timeout
            family: 4 // Use IPv4, skip trying IPv6
        })

        console.log(`\nMongoDB connected successfully`)
        console.log(`DB HOST: ${connectionInstance.connection.host}`)
        console.log(`DB Name: ${connectionInstance.connection.name}`)
    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        if (error.name === 'MongooseBufferError') {
            console.error('Buffer error detected. Please check your MongoDB URI and network connection')
        }
        // Optionally force process to exit on connection failure
        // process.exit(1)
    }
}

module.exports = connectDB