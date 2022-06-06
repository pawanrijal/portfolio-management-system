const DashboardService = require("../services/dashboardService");
const successResponse = require("../utils/successResponse");

class DashboardController {
  async dashboard(req, res, next) {
    try {
      const id = req.id;
      const data = await DashboardService.dashboard(id);
      successResponse(res, 200, data, "dashboard fetched");
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new DashboardController();
