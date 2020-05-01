const mongoose = require('mongoose');

const DescriptionSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : mongoose.Schema.Types.String,
    description : mongoose.Schema.Types.String
});

module.exports = mongoose.model('DescriptionModel',DescriptionSchema);