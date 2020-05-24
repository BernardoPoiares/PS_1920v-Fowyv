import { userDetailsMiddleware,authMiddleware } from "../middlewares";
import controller from "../controllers/user.controller";

module.exports = (app)=> {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/details",
    [
        authMiddleware.verifyToken,
        userDetailsMiddleware.verifyDetails
    ],
    controller.saveDetails
  );
  
  app.post(
    "/api/user/profile",
    [
        authMiddleware.verifyToken,
        userDetailsMiddleware.verifyDetails
    ],
    controller.setProfile
  );
};