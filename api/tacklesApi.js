const db = require('../db/index');
const express = require('express');
const tacklesRouter = express.Router();

const query = `SELECT * FROM tackles`;

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