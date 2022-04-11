const router = require('express').Router();


module.exports = (db) => {
  // all routes will go here 
  router.get('/matches', (req, res) => {
    const command = "SELECT * FROM matches ORDER BY id";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  });
  router.get('/matches/:id', (req, res) => {
    const command = "SELECT * FROM matches WHERE tournament_id = $1";  
    db.query(command, [req.params.id]).then(data => {
      res.json(data.rows)
      console.log(data.rows);

    })
  });

  router.put('/tournaments/:id', async (req, res) => {

    try {
      const command = "UPDATE tournaments SET organizer_id = $1, name = $2 , type = $3, tournament_size = $4, team_format = $5, gender = $6, start_date = $7, end_date = $8, description = $9, link= $10, location = $11 where id = $12 returning * "
      const results = await db.query(command, [req.body.organizer_id, req.body.name, req.body.type, req.body.tournament_size, req.body.team_format,  req.body.gender, req.body.start_date, req.body.end_date, req.body.description, null, req.body.location, req.params.id])
      console.log(results);
      res.status(200).json({
        status: "success",
        data: {
          tournament: results.rows[0]
        }
      })
    } catch (error) {
      
    }
   
  })
  return router;
}