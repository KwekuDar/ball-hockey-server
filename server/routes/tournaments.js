const router = require('express').Router();


module.exports = (db) => {
  // all routes will go here 
  router.get('/tournaments', (req, res) => {
    const command = "SELECT * FROM tournaments ORDER BY id";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  });
  router.get('/tournaments/:id', (req, res) => {
    const command = "SELECT * FROM tournaments WHERE id = $1";  
    db.query(command, [req.params.id]).then(data => {
      res.json(data.rows[0])
      console.log(data.rows[0]);

    })
  });
  
  router.post('/tournaments', async (req, res) => {
    try {
      const command = "INSERT INTO tournaments (organizer_id, name, type, tournament_size, team_format, gender, start_date, end_date, description, link, location) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning * "
      const results = await db.query(command, [req.body.organizer_id, req.body.name, req.body.type, req.body.tournament_size, req.body.team_format, req.body.gender, req.body.start_date, req.body.end_date, req.body.description, null, req.body.location ])
      console.log(results);
      res.status(201).json({
        status: "success",
        data: {
          tournaments: results.rows[0]
        }
      })
      
    } catch (error) {
      console.log(error); 
    }
   
  })
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
  router.delete('/tournaments/:id', async (req, res) => {
    try {
      const command = "DELETE from tournaments WHERE id = $1 "
      const results = await db.query(command, [req.params.id])
      res.status(204).json({
        status: "success",
    })
    } catch (error) {
      console.log(error);
    }
    
  })


  return router;
}