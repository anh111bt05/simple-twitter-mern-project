const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      // tranh in cac thong bao warning 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log("DB connection successfully");
  } catch (error) {
    console.log(error);
    process.exit(1)
  }

}

module.exports = { connectDB }