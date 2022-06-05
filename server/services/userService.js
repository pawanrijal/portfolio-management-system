const { user, stockList } = require("../lib/databaseConnection");
const {
  passwordMismatchException,
} = require("../exceptions/passwordMismatchException");
const {
  alreadyExistsException,
} = require("../exceptions/alreadyExistsException");
const { notFoundException } = require("../exceptions/notFoundException");

const bcrypt = require("bcrypt");
const generateToken = require("../utils/tokenGenerator");

class UserService {
  async create(payload) {
    let userData = await user.findOne({
      where: { username: payload.username },
    }); //fetch user

    if (userData == null) {
      const saltRounds = 10; //password hash
      const { password } = payload;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      payload.password = hash;

      const data = await user.create(payload);

      return data;
    } else {
      throw new alreadyExistsException("User");
    }
  }

  async login(payload) {
    const { email, password } = payload;
    let _user = await user.findOne({ where: { email: email } });
    if (_user != null) {
      const compared = await bcrypt.compare(password, _user.password); //compare hashed password
      if (compared) {
        const token = generateToken(_user); //jwt token
        return token;
      } else {
        throw new passwordMismatchException();
      }
    } else {
      throw new notFoundException("User");
    }
  }
  async profile(id) {
    let _user = await user.findOne({
      where: { id },
      include: [stockList],
      attributes: { exclude: ["password", "createdAt", "updatedAt", "id"] },
    });
    return _user;
  }
}

module.exports = new UserService();
