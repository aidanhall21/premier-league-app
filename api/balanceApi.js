//Defines the /api/balance endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const balanceRouter = express.Router();

//define the database query
const query = `SELECT teams_info.name, "xG", dspi 
                FROM teams_info
                LEFT JOIN spi
                ON teams_info.name = spi.name`;

//this GET request returns an array of objects with team names
//and there offensive and defensive stats
balanceRouter.get('/', (req, res, next) => {
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

module.exports = balanceRouter;