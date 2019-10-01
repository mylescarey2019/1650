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
  // specialized route
    app.get("/api/life-chapter-invest-rate/:id", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.life_chapter.findOne({
      where: { id: req.params.id },
      include: ['invest_rate_type']
      // include: [
      //   {model: db.plan, include: [db.plan_user, db.plan_type]}
      // ]
      
      }).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  }); 

  // Get specific life_chapter
  app.get("/api/life_chapter/:id", function(req, res) {
    db.life_chapter.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all life_chapter
  app.get("/api/life_chapter", function(req, res) {
    db.life_chapter.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert life_chapter
  app.post("/api/life_chapter", function(req, res) {
    db.life_chapter.create({
      seq_no: req.body.seq_no,
      chapter_name: req.body.chapter_name,
      start_age: req.body.start_age,
      end_age: req.body.end_age,
      invest_amount: req.body.invest_amount,
      return_pct: req.body.return_pct,
      inflation_pct: req.body.inflation_pct,
      investRateTypeId: req.body.investRateTypeId,
      planId: req.body.planId
    }).then(function(results) {
      res.json(results);
    });
  });

  // update life_chapter
  app.put("/api/life_chapter", function(req, res) {
    db.life_chapter.update({
      seq_no: req.body.seq_no,
      chapter_name: req.body.chapter_name,
      start_age: req.body.start_age,
      end_age: req.body.end_age,
      invest_amount: req.body.invest_amount,
      return_pct: req.body.return_pct,
      inflation_pct: req.body.inflation_pct,
      investRateTypeId: req.body.investRateTypeId,
      planId: req.body.planId
      },
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete life_chapter
  app.delete("/api/life_chapter/:id", function(req, res) {
    db.life_chapter.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });

};