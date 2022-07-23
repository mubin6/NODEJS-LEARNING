const express = require('express');

const api = express.Router();

const planetRouter = require('./planets/planets.router');
const launchRouter = require('./launches/launches.router');

api.use('/planets', planetRouter);
api.use('/launches', launchRouter);

module.exports = api;
