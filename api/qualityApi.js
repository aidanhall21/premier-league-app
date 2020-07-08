//Defines the /api/quality endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const qualityRouter = express.Router();

//define the database query
const query = `SELECT name, "xGdiff90"
                FROM teams_info`;


//this GET request returns an array of objects
qualityRouter.get('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        });
    })
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err)
    })
});

module.exports = qualityRouter;