const UserService = require("../services/userService");
const successResponse = require("../utils/successResponse");

class UserController {
  async register(req, res, next) {
    try {
      const user = await UserService.create(req.body);
      successResponse(res, 200, user, "User Created");
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const data = await UserService.login(req.body);
      successResponse(res, 200, data, "Logged in Successfully");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async profile(req, res, next) {
    try {
      const id = req.id;
      const data = await UserService.profile(id);
      successResponse(res, 200, data, "Profile");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new UserController();
