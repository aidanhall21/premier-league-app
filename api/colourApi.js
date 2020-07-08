//Defines the /api/colour endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const colourRouter = express.Router();

//define the database query
const query = `SELECT name, color FROM teams_info`;

//this GET request grabs all teams in the premierleague from a database table
//and their main color, returned as an array of objects
colourRouter.get('/', (req, res, next) => {
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

module.exports = colourRouter;