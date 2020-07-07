const db = require('../db/index');
const express = require('express');
const passingRouter = express.Router();

const query = `SELECT dribbles.name, dist_carries, dist_passing, ROUND(dist_carries/dist_passing, 2) as ratio
                FROM dribbles
                LEFT JOIN passing
                    ON dribbles.name = passing.name
                ORDER BY ratio DESC`;

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