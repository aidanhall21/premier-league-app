//defines the /api/youth endpoint
const db = require('../db/index');
const express = require('express');
const ageRouter = express.Router();

//groups teams by the average age of all their players
const query = `SELECT team_name AS name, ROUND(AVG(age), 2) AS avg_age
                FROM players
                GROUP BY team_name
                ORDER BY avg_age DESC`;

//This GET request returns an array of objects with team name and average age of all players on that team
//as keys                
ageRouter.get('/', (req, res, next) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res.rows);
        })
    })
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
});

module.exports = ageRouter;