import { authMiddleware } from "../middlewares";
import controller from "../controllers/interactions.controller";

module.exports = (app)=> {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/interaction/like",
    [
        authMiddleware.verifyToken
    ],
    controller.likeUser
  );

  app.post(
    "/api/interaction/dislike",
    [
        authMiddleware.verifyToken
    ],
    controller.dislikeUser
  );
};