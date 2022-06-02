const router = require("express").Router();
const { userRouter } = require("./userRoutes");

router.use(userRouter);

module.exports = { router };
