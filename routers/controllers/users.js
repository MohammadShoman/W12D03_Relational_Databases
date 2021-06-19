const usersModel = require("./../../db/models/users");
const db = require("./../../db/db");
const bcrypt = require("bcrypt");
const createNewAuthor = async (req, res) => {
  const { firstName, lastName, age, country, email, password, role_id } =
    req.body;

  const query = `INSERT INTO users (firstName, lastName, age, country, email, password, role_id) VALUES (?,?,?,?,?,?,?);`;
  const pass = await bcrypt.hash(password, 10);
  const array = [firstName, lastName, age, country, email, pass, role_id];
  
  db.query(query, array, (err, result) => {
    if (err) throw err;
    const query = `SELECT * FROM users WHERE email=?;`;
    array_1 = [email];
    db.query(query, array_1, (err, result_1) => {
      if (err) throw err;
      res.json(result_1);
    });
  });
};

module.exports = {
  createNewAuthor,
};
