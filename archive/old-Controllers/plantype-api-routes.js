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
  // Get specific plan-type
  app.get("/api/plan-type/:id", function(req, res) {
    db.plan_type.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all plan-type
  app.get("/api/plan-type", function(req, res) {
    db.plan_type.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert plan-type
  app.post("/api/plan-type", function(req, res) {
    db.plan_type.create({
      type_name: req.body.type_name
    }).then(function(results) {
      res.json(results);
    });
  });

  // update plan-type
  app.put("/api/plan-type", function(req, res) {
    db.plan_type.update({
      type_name: req.body.type_name},
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete plan-type
  app.delete("/api/plan-type/:id", function(req, res) {
    db.plan_type.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });

};