const router = require("express").Router();
const { userRouter } = require("./userRoutes");
const { stockListRouter } = require("./stockListRoutes");
const { stockRouter } = require("./stockRoutes");

router.use(stockListRouter);
router.use(userRouter);
router.use(stockRouter);

module.exports = { router };
