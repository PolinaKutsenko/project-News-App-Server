const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
}); //don't need timestamps field in config, because we don't add this contacts in our site, only get from database

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
