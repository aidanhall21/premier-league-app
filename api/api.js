//this file mounts all the various routers onto the main apiRouter
const express = require('express');
const apiRouter = express.Router();

const ageRouter = require('./ageApi');
const tacklesRouter = require('./tacklesApi');
const colourRouter = require('./colourApi');
const qualityRouter = require('./qualityApi');
const pointsRatioRouter = require('./pointsRatioApi');
const passingRouter = require('./passingApi');
const balanceRouter = require('./balanceApi');

apiRouter.use('/age', ageRouter);
apiRouter.use('/tackles', tacklesRouter);
apiRouter.use('/colour', colourRouter);
apiRouter.use('/quality', qualityRouter);
apiRouter.use('/ratio', pointsRatioRouter);
apiRouter.use('/passing', passingRouter);
apiRouter.use('/balance', balanceRouter);

module.exports = apiRouter;