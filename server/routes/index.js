const router = require("express").Router();
const { userRouter } = require("./userRoutes");
const { stockRouter } = require("./stockRoutes");

router.use(stockRouter);
router.use(userRouter);

module.exports = { router };
