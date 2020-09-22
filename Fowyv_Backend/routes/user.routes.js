import { authMiddleware } from "../middlewares";
import controller from "../controllers/user.controller";
import userMatchesController from "../controllers/userMatches.controller";


module.exports = (app)=> {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/user/details",
    [
        authMiddleware.verifyToken
    ],
    controller.getDetails
  );

  app.post(
    "/api/user/details",
    [
        authMiddleware.verifyToken
    ],
    controller.saveDetails
  );
  
  app.post(
    "/api/user/profile",
    [
        authMiddleware.verifyToken
    ],
    controller.setProfile
  );

  app.get(
    "/api/user/matches",
    [
        authMiddleware.verifyToken
    ],
    userMatchesController.getMatches
  );

  app.delete(
    "/api/user/match",
    [
        authMiddleware.verifyToken
    ],
    userMatchesController.deleteMatch
  );

  app.get(
    "/api/user/personalAudio",    
    [
      authMiddleware.verifyToken
    ],
    controller.getPersonalAudio
  )

  app.post(
    "/api/user/personalAudio",
    [
      authMiddleware.verifyToken
    ],
    controller.savePersonalAudio
  )
};