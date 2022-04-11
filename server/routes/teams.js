const router = require('express').Router();


module.exports = (db) => {
  // all routes will go here 
  router.get('/teams', (req, res) => {
    const command = "SELECT * FROM teams ORDER BY id";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  });
  router.get('/teams/:id', (req, res) => {
    const command = "SELECT * FROM teams WHERE tournament_id = $1";  
    db.query(command, [req.params.id]).then(data => {
      res.json(data.rows)
      console.log(data.rows);

    })
  });

  return router;
}