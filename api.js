const express = require('express');
const cors = require('cors');
const api = express();
const morgan = require('morgan');
const port = 9000 || process.env.PORT;

// require database
const { dock } = require('./database');

api.use(cors());
api.use(morgan('dev'));
api.use(express.json());

// connect to database
dock();

api.listen(port, () => {
    console.log(`Context API Running on #${port}`);
});