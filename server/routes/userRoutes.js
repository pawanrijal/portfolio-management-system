const userRouter = require("express").Router();
const UserController = require("../controllers/userController");
const DashboardController = require("../controllers/dashboardController");
const authenticate = require("../middlewares/authenticationMiddleware");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/profile", authenticate, UserController.profile);
userRouter.get("/dashboard", authenticate, DashboardController.dashboard);

module.exports = { userRouter };
