import jwt from "jsonwebtoken"


const auth = (req, res, next) => { 
    try {
      const accessToken = req.headers.authorization.replace("Bearer ", "");
     
      const jwt_payload = jwt.verify(accessToken, process.env.SECRET_KEY);

      req.userinfo = jwt_payload;
    }
    catch (e) {
      res.status(401).json({
        status: "Error",
        message: "Unauthorize",
      });
      return;
    }
  
    next();
  };
  
export default auth