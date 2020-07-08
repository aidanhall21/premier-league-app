//Defines the /api/ratio endpoint
//require in our database pool
//and instantiate a router
const db = require('../db/index');
const express = require('express');
const pointsRatioRouter = express.Router();

//define the database query
const query = `WITH Points AS (SELECT name, team_name AS team1, goals, assists, SUM(goals + assists) AS points
                    FROM players
                    GROUP BY 1, 2, 3, 4
                    ORDER BY points DESC), 
                Totals AS (
                    SELECT team1 AS team2, SUM(points) AS total_points
                    FROM Points
                    GROUP BY 1), 
                Running_Points AS (
                    SELECT *, ROUND(points/total_points, 2) AS points_ratio
                        FROM Points
                        LEFT JOIN Totals
                            ON Points.team1 = Totals.team2
                        ORDER BY points_ratio DESC), 
                Running_Points_Rows AS (
                    SELECT *, SUM(points_ratio) OVER(PARTITION BY team1 ORDER BY points_ratio DESC) AS top_3_ratio, ROW_NUMBER() OVER(PARTITION BY team1) AS Row 
                    FROM Running_Points)
                SELECT team1 AS name, total_points, top_3_ratio FROM Running_Points_Rows WHERE row = 3`;

//this GET request will return the top 3 players by points scored for each team
//returned as an array of objects
pointsRatioRouter.get('/', (req, res, next) => {
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

module.exports = pointsRatioRouter;