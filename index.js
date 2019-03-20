const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());



const port = process.env.PORT || 9090;
server.listen(port, () =>
  console.log(`server is running on ${port}`));
