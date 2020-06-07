import { authMiddleware } from "../middlewares";
import controller from "../controllers/search.controller";

module.exports = (app)=> {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/search",
    [
        authMiddleware.verifyToken
    ],
    controller.searchUsers
  );

  app.get(
    "/api/search/settings",
    [
        authMiddleware.verifyToken
    ],
    controller.getSearchSettings
  );
  
  app.post(
    "/api/search/settings",
    [
        authMiddleware.verifyToken
    ],
    controller.setSearchSettings
  );
};