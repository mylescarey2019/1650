// *********************************************************************************
// this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var express = require('express');
// var router = express.Router();
var db = require("../models");

// classes
var { FinancialModel }  = require("../public/assets/js/financialModel.js");
var { LifeChapter }  = require("../public/assets/js/lifeChapter.js");
var { ChartResult }  = require("../public/assets/js/chartResult.js");

// helper functions
function buildModel(results) {
  // console.log ("in plan-api-routes.buildModel");
  // var firstModelYear = '';
  // var lastModelYear = '';
  var resultPlots = [];
  var lifeChapters = [];  // an array of life chapter objects
  var chartResult  = {};  // a chart result object

  // get start year for Result Plot
  // firstModelYear = results.LifeChapters[0].start_age;

  // build lifeChapters
  results.LifeChapters.map(chapter => {
    lifeChapters.push(new LifeChapter(chapter.seq_no, chapter.chapter_name,
      chapter.start_age, chapter.end_age, chapter.invest_amount,chapter.InvestRateType.invest_type,
      chapter.return_pct, chapter.inflation_pct));
      // lastModelYear = chapter.end_age;
  });
  
  // build chartResult
  chartResult =  new ChartResult(results.LifeChapters[0].start_age,results.LifeChapters[results.LifeChapters.length - 1].end_age,resultPlots);

  // build financialModel
  financialModel = new FinancialModel(results.plan_name,results.PlanUser.user_name,results.PlanUserId,lifeChapters,chartResult);
  financialModel.computeFinancialResult();
  // console.log(financialModel.chartResult.xPlotToArray());
  // console.log(financialModel.chartResult.yPlotToArray());

  console.log(financialModel);

  return financialModel;
};





// Routes
// =============================================================

module.exports = function(app) {

  // get specific plan, its user and its type
  app.get("/api/plan-plan-user/:id", function(req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.Plan.findOne({  where: { id: req.params.id },
                      include: [db.PlanType,db.PlanUser]}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // get specific plan and its life chapters and their invest rate types
  app.get("/api/plan-life-chapter/:id", function(req, res) {
    db.Plan.findOne({  
      where: { id: req.params.id },
      include: [{model: db.LifeChapter, 
                   include: [{ model: db.InvestRateType }]
                  }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]            
                    }).then(function(results) {
      // pass result back to client
      res.json(results);
    });
  });

  // get specific plan, its user and its life chapters and their invest rate types
  app.get("/api/plan-user-life-chapter/:id", function(req, res) {
    db.Plan.findOne({  
      where: { id: req.params.id },
      include: [{model: db.PlanUser},
                {model: db.LifeChapter, 
                            include: [{ model: db.InvestRateType }]
                  }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]            
                    }).then(function(results) {
      // create model object from the results and pass to client    
      // console.log(results);           
      // res.json(results);
      res.json(buildModel(results));
    });
  });

  // Get specific plan
  app.get("/api/plan/:id", function(req, res) {
    db.Plan.findOne({
      where: { id: req.params.id }
    }).then(function(results) {
      res.json(results);
    });
  });

  // get all plan
  app.get("/api/plan", function(req, res) {
    db.Plan.findAll({}).then(function(results) {
      res.json(results);
    });
  });

  // insert plan
  app.post("/api/plan", function(req, res) {
    db.Plan.create({
      plan_name: req.body.plan_name,
      PlanUserId: req.body.PlanUserId,
      PlanTypeId: req.body.PlanTypeId
    }).then(function(results) {
      res.json(results);
    });
  });

  // update plan
  app.put("/api/plan", function(req, res) {
    db.Plan.update({
      plan_name: req.body.plan_name,
      PlanUserId: req.body.PlanUserId,
      PlanTypeId: req.body.PlanTypeId
      },
      {
        where: { id: req.body.id }
      }
    )
    .then(function(results) {
      res.json(results);
    });
  });

  // delete plan
  app.delete("/api/plan/:id", function(req, res) {
    db.Plan.destroy({
        where: { id: req.params.id }
    })
    .then(function(results) {
      res.json(results);
    });
  });

};