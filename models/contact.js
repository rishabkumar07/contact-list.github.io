const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        }
    });

//Collection name should be capital model fun signifies a collection
const Contact = mongoose.model('Contact',contactSchema);

//to export this
module.exports = Contact;