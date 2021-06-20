const usersModel = require("./../../db/models/users");
const db = require("./../../db/db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email=?;`;
  const array = [email];
  db.query(query, array, (err, result) => {
    if (err) throw err;

    if (result[0]) {
      bcrypt.compare(password, result[0].password, (err, result_1) => {
        if (result_1 === true) {
          const payload = {
            id: result[0].id,
            role: result[0].role,
          };
          const secret = process.env.SECRET;
          const option = { expiresIn: "60m" };

          res.json(jwt.sign(payload, secret, option));
        }else{
			res.send("wrong password")
		}
      });
    }
  });
};

module.exports = {
  login,
};
