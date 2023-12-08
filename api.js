const express = require('express');
const api = express();
const morgan = require('morgan');
const port = 9001 || process.env.PORT;

api.use(express.json());
api.use(morgan('combined'));

api.listen(port, () => console.log(`::SERVER:RUNNING:ON:PORT:${port}::`));