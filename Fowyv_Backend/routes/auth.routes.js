import { authMiddleware } from "../middlewares";
import controller from "../controllers/auth.controller";

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup", controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  
  app.delete("/api/auth/user", 
  [
    authMiddleware.verifyToken
  ],
  controller.deleteUser);

  app.post("/api/auth/signout",
  [
    authMiddleware.verifyToken
  ], controller.signout);
};