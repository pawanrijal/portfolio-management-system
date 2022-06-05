const userRouter = require("express").Router();
const UserController = require("../controllers/userController");

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.get("/profile/:id", UserController.profile);

module.exports = { userRouter };
