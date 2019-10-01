// *********************************************************************************
// this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var express = require('express');
// var router = express.Router();
var db = require("../models");

// Routes
// =============================================================

module.exports = function(app) {
  // Get specific invest-rate-type
  app.get("/api/invest-rate-type/:id", function(req, res) {
    db.invest_rate_type.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all invest-rate-type
  app.get("/api/invest-rate-type", function(req, res) {
    db.invest_rate_type.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert invest-rate-type
  app.post("/api/invest-rate-type", function(req, res) {
    db.invest_rate_type.create({
      invest_type: req.body.invest_type
    }).then(function(results) {
      res.json(results);
    });
  });

  // update invest-rate-type
  app.put("/api/invest-rate-type", function(req, res) {
    db.invest_rate_type.update({
      invest_type: req.body.invest_type},
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete invest-rate-type
  app.delete("/api/invest-rate-type/:id", function(req, res) {
    db.invest_rate_type.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });


};
