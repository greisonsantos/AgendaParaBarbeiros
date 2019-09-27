const express = require("express");
const routes = express.Router();

const multer = require("./config/multer");
const upload = require("multer")(multer);

const authMiddleware = require("./app/middlewares/auth");
const guestMiddleware = require("./app/middlewares/guest");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const DashboardController = require("./app/controllers/DashboardController");
const FileController = require("./app/controllers/FileController");

routes.use((req, res, next) => {
  res.locals.flashSucces = req.flash("success");
  res.locals.flashError = req.flash("error");

  return next();
});

routes.get("/", guestMiddleware, SessionController.create);
routes.post("/signin", SessionController.store);

routes.get("/signup", guestMiddleware, UserController.create);
routes.post("/signup", upload.single("avatar"), UserController.store);

//todas as rotas que começa com app passaram pelo middleware
routes.use("/app", authMiddleware);
routes.get("/app/logout", SessionController.destroy);

routes.get("/app/dashboard", DashboardController.index);

//rota para uploadas
routes.get("/files/:file", FileController.show);

module.exports = routes;
