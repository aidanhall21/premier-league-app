//Defines the /api/passing endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const passingRouter = express.Router();

//define the database query
const query = `SELECT dribbles.name, dist_carries, dist_passing, ROUND(dist_carries/dist_passing, 2) as ratio
                FROM dribbles
                LEFT JOIN passing
                    ON dribbles.name = passing.name
                ORDER BY ratio DESC`;

//this GET request returns dribbling and passing statistics
//returned as an array of objects
passingRouter.get('/', (req, res, next) => {
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

module.exports = passingRouter;