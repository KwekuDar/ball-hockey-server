const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  router.get('/users', (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res.status(500)
      res.json({error: err.message})
    })
  });
  return router;
};
