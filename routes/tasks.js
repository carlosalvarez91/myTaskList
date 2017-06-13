"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Task = require('../models/task');
const User = require('../models/user');

const config = require('../config/database');

const Token = require('../config/token');
const token = new Token();


//Get All Tasks
router.get('/tasks', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            next(err);
        } else {
            Task.find({ owner: decoded._doc._id }, (err, tasks) => {
                if (err) {
                    next(err);
                } else {
                    res.json(tasks);
                    
                }
            });
        }
    });

});

//Get Single Task
router.get('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            next(err);
        } else {
            Task.findOne({ _id: req.params.id, owner: decoded._doc._id }, (err, task) => {
                if (err) {
                    next(err);
                } else {
                    res.json(task);
                }
            });
        }
    })
});
//Save Task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if (!task.title || (!task.passwordSite)) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        token.verify(req, (err, decoded) => {
            if (err) {
                next(err);
            } else {
                var newTask = new Task({
                    title: task.title,
                    passwordSite: task.passwordSite,
                    owner: decoded._doc._id
                });

                // Attempt to save the new task
                newTask.save((err, task, next) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json(task);
                    }
                })
            }
        });

    }
})
//Delete Task
router.delete('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            next(err);
        } else {
            Task.findOneAndRemove({ _id: req.params.id, owner: decoded._doc._id }, (err, task) => {
                if (err) {
                    next(err);
                } else {
                    res.json(task);
                }
            })
        }
    })
});
//Update Task
router.put('/task/:id', (req, res, next) => {
    token.verify(req, (err, decoded) => {
        if (err) {
            next(err);
        } else {
            Task.findOne({ _id: req.params.id, owner: decoded._doc._id }, (err, task) => {
                if (err) {
                    res.send(err);
                } else {
                    task.title = req.body.title;
                    task.passwordSite = req.body.passwordSite;
                    task.owner = decoded._doc._id;
                    task.save((err, task, next) => {
                        if (err) {
                            next(err);
                        } else {
                            res.json(task);
                        }
                    })
                }

            })
        }
    })
});

/* ----------- OLD METHODS -----------------------
//GET ALL TASKS 
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//GET A SINGLE TASK
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//SAVE TASKS (POST)
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title|| !task.passwordSite ){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

//DELETE TASK
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//UPDATE TASK
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask,{},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });

});*/

module.exports = router;