
const { connect } = require('mongoose');

// require environment variables
require('dotenv').config();

// require models
require('./models');

const dbUrl = `mongodb://${process.env.DB_ADDRESS}/context_db`;
const dbOptions = {
};

module.exports = {
    dock: () => {
        connect(dbUrl, dbOptions)
            .then(db => {
                console.info(`:::CONNECTED::TO:::${db.connections[0].name}::\n` + `:::HOSTED::ON:::${db.connections[0].host}::\n` +
                    `::INSTANTIATED::MODELS::[${db.modelNames()}]::`
                );
            })
            .catch(err => {
                console.error(`:::ERROR::${err}::`);
            });
    }
};
