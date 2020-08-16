import jwt from "jsonwebtoken";
import config from "../../config/auth.config.js";


export const authUserWebSocket = function socketAuth(socket, next){
  let token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) 
        return socket.emit("tokenExpired")
      socket.user = decoded.email;
      next();
    });
  }
  return socket.emit("tokenEmpty")
};