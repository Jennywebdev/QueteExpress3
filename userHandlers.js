const database = require("./database");

const getUserList = (req, res) => {
  database.query("SELECT * FROM users").then((i) => {
    res.status(200).json(i[0]);
  });
};

const postUsers = (req, res) => {
  const { firstname, lastname, email } = req.body;
  database
    .query("INSERT INTO users(firstname, lastname, email) VALUES (?, ?, ?)", [
      firstname,
      lastname,
      email,
    ])
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Users");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database.query(`SELECT * FROM users WHERE id=${id}`).then((i) => {
    if (i[0][0]) {
      res.status(200).json(i[0][0]);
    } else {
      res.status(404).json("no data found");
    }
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email } = req.body;

  database
    .query("update users set firstname = ?, lastname = ?, mail = ?", [
      firstname,
      lastname,
      email,
    ])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};

module.exports = {
  getUserList,
  getUserById,
  postUsers,
  updateUser,
};
