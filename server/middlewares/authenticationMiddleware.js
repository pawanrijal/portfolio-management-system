const jwt = require("jsonwebtoken");

const {
  tokenExpiredException,
} = require("../exceptions/tokenExpiredException");
const AuthorizationException = require("../exceptions/authorizationException");
const SECRET = process.env.JSON_WEB_TOKEN_SECRET;

const authenticationMiddleware = async (req, res, next) => {
  try {
    if (
      req.headers.authorization === null ||
      req.headers.authorization === undefined
    ) {
      throw new AuthorizationException();
    }
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);
    //jwt token check
    if (decoded.exp * 1000 < Date.now()) {
      //if expired
      throw new tokenExpiredException();
    }
    const id = decoded.sub;
    req.id = id;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationMiddleware;
