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
  financialModel = new FinancialModel(results.plan_name,results.id,results.PlanUser.user_name,results.PlanUserId,lifeChapters,chartResult);
  financialModel.computeFinancialResult();
  // console.log(financialModel.chartResult.xPlotToArray());
  // console.log(financialModel.chartResult.yPlotToArray());

  console.log(financialModel);

  return financialModel;
};


// helper function to build a single Life Chapter
function buildOneLifeChapter(lifeChapter,newPlanId) {
  // console.log ("in plan-api-routes.buildOneLifeChapter");
  db.LifeChapter.create({
    seq_no: lifeChapter.seq_no,
    chapter_name: lifeChapter.chapter_name,
    start_age: lifeChapter.start_age,
    end_age: lifeChapter.end_age,
    invest_amount: lifeChapter.invest_amount,
    return_pct: lifeChapter.return_pct,
    inflation_pct: lifeChapter.inflation_pct,
    InvestRateTypeId: lifeChapter.InvestRateType.id,
    PlanId: newPlanId
  }).then(function(results) {
    // res.json(results);
  });

};


// helper function to build a new plan's life chapters
function buildLifeChapters(demoPlan,newPlanId) {
  // console.log ("in plan-api-routes.buildLifeChapters");
    // build lifeChapters
    demoPlan.LifeChapters.map(chapter => {
      console.log(`new plan id ${newPlanId}`);
      console.log(`clone from this plan ${demoPlan.id}`);
      console.log(`clone from this plan ${demoPlan.plan_name}`);
      console.log(`life chapter ${chapter.seq_no}`);
      console.log(`life chapter ${chapter.chapter_name}`);
      console.log(`life chapter ${chapter.start_age}`);
      console.log(`life chapter ${chapter.end_age}`);
      console.log(`life chapter ${chapter.invest_amount}`);
      console.log(`life chapter ${chapter.return_pct}`);
      console.log(`life chapter ${chapter.inflation_pct}`);
      console.log(`life chapter ${chapter.InvestRateType.id}`);
      buildOneLifeChapter(chapter,newPlanId);
    });
   

};


// helper function to build a new plan for cloning
function buildNewPlan(demoPlan) {
  // console.log ("in plan-api-routes.buildNewPlan");
  db.Plan.create({
    plan_name: 'Your Guest Financial IRA Model',
    PlanUserId: 2,
    PlanTypeId: 2
  }).then(function(results) {
    // console.log(`back from inserting new plan id ${results.id}`);
    // console.log(`clone from this plan ${demoPlan.id}`);
    // console.log(`clone from this plan ${demoPlan.plan_name}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].seq_no}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].chapter_name}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].start_age}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].end_age}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].invest_amount}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].return_pct}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].inflation_pct}`);
    // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].InvestRateType}`);
    buildLifeChapters(demoPlan,results.id);
    return results.id;
  });
};

// // helper function to get the newly cloned plan
// function getOnePlan(planId) {
//   // console.log ("in plan-api-routes.getOnePlan");
//   console.log(`the cloned plan to be retreived and returnd is: ${planId}`);
//   db.Plan.findOne({  
//     where: { id: planId },
//     include: [{model: db.LifeChapter, 
//                  include: [{ model: db.InvestRateType }]
//                 }],
//     order: [
//       [db.LifeChapter, 'seq_no', 'asc']
//     ]            
//     })
//     .then(function(results) {
//     // pass result back to client
//       return results;
//     // res.json(results);
//     });
// };






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

 

  // clone a plan 
  // initially this will be used to clone demo plan id 1
  // to allow guest vistors to receive a rendered model
  // and use it without being registered or logged in
  // This cloned model will not be recoverable after user
  // leaves page - (no database cleanup being setup at the moment)
  app.get("/api/clone-plan/:id", function(req, res) {
    // retrieve the model being cloned from
    db.Plan.findOne({  
      where: { id: req.params.id }, 
      include: [{model: db.PlanUser},
                {model: db.LifeChapter, 
                            include: [{ model: db.InvestRateType }]
                  }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]            
      }).then(function(cloneFromPlan) {
        // next step is to create a new plan from the cloneFromPlan
        // console.log("HELLO");
        // console.log(cloneFromPlan);
        console.log('calling buildNewPlan');
        buildNewPlan(cloneFromPlan);
        // return the final result back to the client-side
        console.log(`the Demo Plan being cloned is: ${cloneFromPlan}`);
        // res.json(getOnePlan(buildNewPlan(cloneFromPlan)));
        res.json(buildModel(cloneFromPlan));
      });
    });
  

  // save working partial 
  // app.get("/api/clone-plan/:id", function(req, res) {
  //   // retrieve the model being cloned from
  //   db.Plan.findOne({  
  //     where: { id: req.params.id },
  //     include: [{model: db.PlanUser},
  //               {model: db.LifeChapter, 
  //                           include: [{ model: db.InvestRateType }]
  //                 }],
  //     order: [
  //       [db.LifeChapter, 'seq_no', 'asc']
  //     ]            
  //     }).then(function(cloneFromPlan) {
  //       console.log(`find One: ${cloneFromPlan}`);
  //       res.json(buildModel(cloneFromPlan));
  //     });
  //   });
  



};  // end of module export