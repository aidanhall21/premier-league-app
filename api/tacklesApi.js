//Defines the /api/tackles endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const tacklesRouter = express.Router();

//define the database query
const query = `SELECT * FROM tackles`;

//this GET request returns an array of objects
tacklesRouter.get('/', (req, res, next) => {
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

module.exports = tacklesRouter;