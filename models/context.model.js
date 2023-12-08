const { model, Schema } = require('mongoose');

const contextSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    persistent: {
        type: String,
        required: true,
        defaultsTo: '',
    },
    active: {
        type: String,
        required: true,
        defaultsTo: '',
    },
    historical: {
        type: String,
        required: true,
        defaultsTo: '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Context', contextSchema);