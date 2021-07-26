const jwt = require('jsonwebtoken')

exports.verifyToken = async (req, res, next) => {
  try {
    const Authorization = req.header('Authorization');

    if(!Authorization){
      // Error: Unauthorization
      const err = new Error('Unauthorization')
      err.statusCode = 401;
      return next(err);
    }

    //Get token
    const token = Authorization.replace('Bearer ', '')

    const {userID} = jwt.verify(token, process.env.APP_SECRET);

    // Assign req
    req.user = {userID};
    
    // De di tiep vao controller
    next();
  } catch (error) {
    res.json(error);
  }
};