const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;
const User = require('./user');
//Task Schema 
const TaskSchema = new Schema({
            title:{
            type: String,
            required: true
            },
            passwordSite:{
            type: String,
            required: true
            },
            owner:{
                type: Schema.Types.ObjectId,
                ref:'User'
            }
        }
        );
const Task = module.exports = mongoose.model('Task', TaskSchema);