const jwt = require("jsonwebtoken");

exports.checkCurrentUser = (req, res, next) => {
  // Access authorization from header
  const Authorization = req.header("Authorization");
  if (!Authorization) {
    req.user = null;
    next();
  } else {
    // Get token from Authorization
    const token = Authorization.replace("Bearer ", "");
    try {
      const { userID } = jwt.verify(token, process.env.APP_SECRET);
      // Assign req
      req.user = { userID };
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
};
