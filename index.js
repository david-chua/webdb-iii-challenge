const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/api/cohorts', async(req,res) => {
  try{
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error){
    res.status(500).json(error);
  }
});

server.get('/api/cohorts/:id', async(req,res) => {
  try{
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch(error){
    res.status(500).json(error);
  }
});

const errors = {
  '19': 'Another record with that value exists',
};



const port = process.env.PORT || 9090;
server.listen(port, () =>
  console.log(`server is running on ${port}`));
