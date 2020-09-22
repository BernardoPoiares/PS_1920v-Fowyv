import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

const verifyToken = (req, res, next) => {
  const authorizationValue = req.headers["authorization"];
  let token= authorizationValue !==undefined ? authorizationValue.replace('Bearer ',''):null;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.email = decoded.email;
    next();
  });
};

export const authMiddleware = {
  verifyToken,
};