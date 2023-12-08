const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contexts: [{
        type: Schema.Types.ObjectId,
        ref: 'Context'
    }]
});

module.exports = model('User', userSchema);
