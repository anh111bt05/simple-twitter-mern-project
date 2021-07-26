//Entry point

//dotenv -> setup dau tien do khoi tao nhung bien dau tien
require('dotenv').config();

//connct DB
const {connectDB} = require('./configs/db')

connectDB();


// npm run startDev -> run nodemon and auto run after save
const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
// Import error handler
const {errorHandler} = require('./middleware/errorHandler');

const app = express();

// Allow front contact to backend
app.use(cors());

// Body parser, allow user input transform to object
app.use(express.json())

// Mount the route -> authRoute route
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/posts', postRoute)

// Unhandle route
app.all('*', (req, res, next)=> {
  const err = new Error('The route cannot be found')
  err.statusCode = 404
  next(err);
})
app.use(errorHandler);

// Khoi tao tu dotenv va lay tu trong .env
const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})