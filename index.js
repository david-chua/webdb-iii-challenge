const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// get all cohorts
server.get('/api/cohorts', async(req,res) => {
  try{
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error){
    res.status(500).json(error);
  }
});

// get Cohorts by ID
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

// get all students from cohort with matching id
server.get('/api/cohorts/:id/students', async(req,res) => {
  try {
    const cohort = await db('cohorts')
    .from('cohorts')
    .innerJoin('students', 'cohorts.id', 'students.cohort_id')
    .where({cohort_id: req.params.id})
    res.status(200).json(cohort);
  } catch(error){
    res.status(500).json(error);
  }
})

const errors = {
  '19': 'Another record with that value exists',
};

// create cohorts
server.post('/api/cohorts', async(req,res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const cohort = await db('cohorts')
    .where({ id })
    .first();

    res.status(201).json(cohort)
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
});

// update Cohorts
server.put('/api/cohorts/:id', async (req,res) => {
  try{
    const count = await db('cohorts')
      .where({id: req.params.id })
      .update(req.body);

      if (count > 0 ){
        const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first()

        res.status(200).json(cohort);
      } else {
        res.status(404).json({ mesage: "Record not found"});
      }
  } catch(error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
});

server.delete('/api/cohorts/:id', async(req,res) => {
  try{
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0){
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch(error){
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
})

// get all students
server.get('/api/students', async(req,res) => {
  try{
    const students = await db('students');
    res.status(200).json(students);
  } catch (error){
    res.status(500).json(error);
  }
})

// get student by ID
server.get('/api/students/:id', async(req,res) => {
  try{
    const student = await db('students')
      .select('students.id', 'students.name as Student','cohorts.name as "Cohort Name"')
      .from('students')
      .innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
      .where({ 'students.cohort_id': req.params.id })
    res.status(200).json(student);
  } catch(error){
    res.status(500).json(error);
  }
})

server.post('/api/students', async(req,res) =>{
  try {
    const [id] = await db('students').insert(req.body);

    const student = await db('students')
    .where({ id })
    .first();

    res.status(201).json(student)
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
})

server.put('/api/students/:id', async (req,res) => {
  try{
    const count = await db('students')
      .where({id: req.params.id })
      .update(req.body);

      if (count > 0 ){
        const student = await db('students')
        .where({ id: req.params.id })
        .first()

        res.status(200).json(student);
      } else {
        res.status(404).json({ mesage: "Record not found"});
      }
  } catch(error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
});

server.delete('/api/students/:id', async(req,res) => {
  try{
    const count = await db('students')
      .where({ id: req.params.id })
      .del();

    if (count > 0){
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Records not found" });
    }
  } catch(error){
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({message, error });
  }
})


const port = process.env.PORT || 9090;
server.listen(port, () =>
  console.log(`server is running on ${port}`));
