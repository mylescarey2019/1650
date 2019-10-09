// *********************************************************************************
// this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
// var express = require('express');
// var router = express.Router();
var db = require("../models");

// classes
var { FinancialModel } = require("../public/assets/js/financialModel.js");
var { LifeChapter } = require("../public/assets/js/lifeChapter.js");
var { ChartResult } = require("../public/assets/js/chartResult.js");

// helper functions
function buildModel(results) {
  // console.log ("in plan-api-routes.buildModel");
  // var firstModelYear = '';
  // var lastModelYear = '';
  var resultPlots = [];
  var lifeChapters = [];  // an array of life chapter objects
  var chartResult = {};  // a chart result object

  // get start year for Result Plot
  // firstModelYear = results.LifeChapters[0].start_age;
  console.log(`IN BUILD MODEL.plan_name>>> ${results.plan_name}`);
  console.log(`IN BUILD MODEL.LifeChapters.length>>> ${results.LifeChapters.length}`);
  // build lifeChapters
  results.LifeChapters.map(chapter => {
    lifeChapters.push(new LifeChapter(chapter.id, chapter.seq_no, chapter.chapter_name,
      chapter.start_age, chapter.end_age, chapter.invest_amount, chapter.InvestRateType.id, chapter.InvestRateType.invest_type,
      chapter.return_pct, chapter.inflation_pct));
    // lastModelYear = chapter.end_age;
  });

  // build chartResult
  chartResult = new ChartResult(results.LifeChapters[0].start_age, results.LifeChapters[results.LifeChapters.length - 1].end_age, resultPlots);

  // build financialModel
  financialModel = new FinancialModel(results.plan_name, results.id, results.PlanUser.user_name, results.PlanUserId, 
                                      results.PlanTypeId, lifeChapters, chartResult);
  financialModel.computeFinancialResult();
  // console.log(financialModel.chartResult.xPlotToArray());
  // console.log(financialModel.chartResult.yPlotToArray());

  console.log(financialModel);

  return financialModel;
};


// // helper function to build a single Life Chapter
// function buildOneLifeChapter(lifeChapter, newPlanId) {
//   // console.log ("in plan-api-routes.buildOneLifeChapter");
//   db.LifeChapter.create({
//     seq_no: lifeChapter.seq_no,
//     chapter_name: lifeChapter.chapter_name,
//     start_age: lifeChapter.start_age,
//     end_age: lifeChapter.end_age,
//     invest_amount: lifeChapter.invest_amount,
//     return_pct: lifeChapter.return_pct,
//     inflation_pct: lifeChapter.inflation_pct,
//     InvestRateTypeId: lifeChapter.InvestRateType.id,
//     PlanId: newPlanId
//   }).then(function (results) {
//     // res.json(results);
//   });

// };


// // helper function to build a new plan's life chapters
// function buildLifeChapters(demoPlan, newPlanId) {
//   // console.log ("in plan-api-routes.buildLifeChapters");
//   // build lifeChapters
//   demoPlan.LifeChapters.map(chapter => {
//     console.log(`new plan id ${newPlanId}`);
//     console.log(`clone from this plan ${demoPlan.id}`);
//     console.log(`clone from this plan ${demoPlan.plan_name}`);
//     console.log(`life chapter ${chapter.seq_no}`);
//     console.log(`life chapter ${chapter.chapter_name}`);
//     console.log(`life chapter ${chapter.start_age}`);
//     console.log(`life chapter ${chapter.end_age}`);
//     console.log(`life chapter ${chapter.invest_amount}`);
//     console.log(`life chapter ${chapter.return_pct}`);
//     console.log(`life chapter ${chapter.inflation_pct}`);
//     console.log(`life chapter ${chapter.InvestRateType.id}`);
//     buildOneLifeChapter(chapter, newPlanId);
//   });


// };


// // helper function to build a new plan for cloning
// function buildNewPlan(demoPlan) {
//   // console.log ("in plan-api-routes.buildNewPlan");
//   db.Plan.create({
//     plan_name: 'Your Guest Financial IRA Model',
//     PlanUserId: 2,
//     PlanTypeId: 2
//   }).then(function (results) {
//     // console.log(`back from inserting new plan id ${results.id}`);
//     // console.log(`clone from this plan ${demoPlan.id}`);
//     // console.log(`clone from this plan ${demoPlan.plan_name}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].seq_no}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].chapter_name}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].start_age}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].end_age}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].invest_amount}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].return_pct}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].inflation_pct}`);
//     // console.log(`life chapter 0 ${demoPlan.LifeChapters[0].InvestRateType}`);
//     buildLifeChapters(demoPlan, results.id);
//     return results.id;
//   });
// };

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

module.exports = function (app) {

  // get specific plan, its user and its type
  app.get("/api/plan-plan-user/:id", function (req, res) {

    // Finding all plan_users, and then returning them  as JSON.
    db.Plan.findOne({
      where: { id: req.params.id },
      include: [db.PlanType, db.PlanUser]
    }).then(function (results) {
      // results are available to us inside the .then
      res.json(results);
    });
  });

  // get specific plan and its life chapters and their invest rate types
  app.get("/api/plan-life-chapter/:id", function (req, res) {
    db.Plan.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.LifeChapter,
        include: [{ model: db.InvestRateType }]
      }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]
    }).then(function (results) {
      // pass result back to client
      res.json(results);
    });
  });

  // get specific plan and its life chapters and their invest rate types
  app.get("/api/test/:id", function (req, res) {
    db.Plan.findOne({
      where: { id: req.params.id },
      include: [{ model: db.PlanUser },
      {
        model: db.LifeChapter,
        include: [{ model: db.InvestRateType }]
      }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]
    }).then(function (results) {
      // pass result back to client
      res.json(results);
    });
  });

  // get specific plan, its user and its life chapters and their invest rate types
  app.get("/api/plan-user-life-chapter/:id", function (req, res) {
    db.Plan.findOne({
      where: { id: req.params.id },
      include: [{ model: db.PlanUser },
      {
        model: db.LifeChapter,
        include: [{ model: db.InvestRateType }]
      }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]
    }).then(function (results) {
      // create model object from the results and pass to client    
      // console.log(results);           
      // res.json(results);
      res.json(buildModel(results));
    });
  });

  // Get specific plan
  app.get("/api/plan/:id", function (req, res) {
    db.Plan.findOne({
      where: { id: req.params.id }
    }).then(function (results) {
      res.json(results);
    });
  });

  // get all plan
  app.get("/api/plan", function (req, res) {
    db.Plan.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  // insert plan
  app.post("/api/plan", function (req, res) {
    db.Plan.create({
      plan_name: req.body.plan_name,
      PlanUserId: req.body.PlanUserId,
      PlanTypeId: req.body.PlanTypeId
    }).then(function (results) {
      res.json(results);
    });
  });

  // update plan
  app.put("/api/plan", function (req, res) {
    db.Plan.update({
      plan_name: req.body.plan_name,
      PlanUserId: req.body.PlanUserId,
      PlanTypeId: req.body.PlanTypeId
    },
      {
        where: { id: req.body.id }
      }
    )
      .then(function (results) {
        res.json(results);
      });
  });

  // delete plan
  app.delete("/api/plan/:id", function (req, res) {
    db.Plan.destroy({
      where: { id: req.params.id }
    })
      .then(function (results) {
        res.json(results);
      });
  });

  // update a finanical model and return to client for
  // rendering
  // this treats the model as whole
  // it will update the Plan model
  // it will bulk update the Plan's LifeChapter model(s)
  // it take in an object that has an array of objects
  //  {
  //        {          // Plan Object
  //          id: id,    
  //          plan_name: plan_name,
  //          PlanUserId: PlanUserId,
  //          PlanTypeId: PlanTypeId
  //         },
  //         [         // Array of Life Chapter Objects
  //             {
  //                  id: id,  
  //                  seq_no: seq_no,
  //                  chapter_name: chapter_name,
  //                  start_age: start_age,
  //                  end_age: end_age,
  //                  invest_amount: invest_amount,
  //                  return_pct: return_pct,
  //                  inflation_pct: inflation_pct,
  //                  InvestRateTypeId: InvestRateTypeId,
  //                  PlanId: PlanId  
  //             }
  //         ]
  //  }  
  // 
  app.put("/api/plan-life-chapters", function (req, res) {
    // update a financial plan (plan and its life chapters)
    // update the plan
    db.Plan.update({
      plan_name: req.body.plan_name,
      PlanUserId: req.body.PlanUserId,
      PlanTypeId: req.body.PlanTypeId
      },
        {
          where: { id: req.body.id }
        }
      )
      .then(function (results) {
      // // commenting out forced update data object  
      // var updatedChapters = [];

      //   updatedChapters.push({
      //     id: 203,
      //     seq_no: 1,
      //     chapter_name: 'FOO',
      //     start_age: 12,
      //     end_age: 16,
      //     invest_amount: 3.33,
      //     return_pct: 9.9,
      //     inflation_pct: 1.1,
      //     InvestRateTypeId: 1,
      //     PlanId: 41
      //   });
      //   updatedChapters.push({
      //     id: 204,
      //     seq_no: 2,
      //     chapter_name: 'FOOBAR',
      //     start_age: 17,
      //     end_age: 22,
      //     invest_amount: 7.77,
      //     return_pct: 10.9,
      //     inflation_pct: 1.2,
      //     InvestRateTypeId: 2,
      //     PlanId: 41
      //   });
 
      console.log(`BULK UPDATE TO CHAPTERS >>> ${JSON.stringify(req.body.updatedChapters)}`);
      db.LifeChapter.bulkCreate(req.body.updatedChapters,{updateOnDuplicate: ['chapter_name','start_age',
        'end_age','invest_amount','return_pct','inflation_pct']})
      .then(function(resul) {
      // re-retrive updated model to send back to client  
      db.Plan.findOne({
        where: { id: req.body.id },
        include: [{ model: db.PlanUser },
        {
          model: db.LifeChapter,
          include: [{ model: db.InvestRateType }]
        }],
        order: [
          [db.LifeChapter, 'seq_no', 'asc']
        ]
      })
      .then(function(resul2) {
      // return to client  
      console.log(`resul2>> ${resul2}`);
      res.json(buildModel(resul2));
      });
    });
  });
});



  // MRC ***

  // clone a plan 
  // initially this will be used to clone demo plan id 1
  // to allow guest vistors to receive a rendered model
  // and use it without being registered or logged in
  // This cloned model will not be recoverable after user
  // leaves page - (no database cleanup being setup at the moment)
  app.get("/api/clone-plan/:id", function (req, res) {
    // retrieve the model being cloned from
    db.Plan.findOne({
      where: { id: req.params.id },
      include: [{ model: db.PlanUser },
      {
        model: db.LifeChapter,
        include: [{ model: db.InvestRateType }]
      }],
      order: [
        [db.LifeChapter, 'seq_no', 'asc']
      ]
    }).then(function (cloneFromPlan) {
      db.Plan.create({
        plan_name: 'Your Guest Financial IRA Model',
        PlanUserId: 2, // guest user id
        PlanTypeId: 2  // guest plan type id
      }).then(function (results) {

        // results.LifeChapters.map(chapter => {
        //   lifeChapters.push(new LifeChapter(chapter.seq_no, chapter.chapter_name,
        //     chapter.start_age, chapter.end_age, chapter.invest_amount, chapter.InvestRateType.invest_type,
        //     chapter.return_pct, chapter.inflation_pct));
        var newChapters = [];
        cloneFromPlan.LifeChapters.map(chapter => {
          newChapters.push({
            seq_no: chapter.seq_no,
            chapter_name: chapter.chapter_name,
            start_age: chapter.start_age,
            end_age: chapter.end_age,
            invest_amount: chapter.invest_amount,
            return_pct: chapter.return_pct,
            inflation_pct: chapter.inflation_pct,
            InvestRateTypeId: chapter.InvestRateType.id,
            PlanId: results.id
          })
        });
        console.log(`BULK DATA>>> ${JSON.stringify(newChapters)}`);
        // db.LifeChapter.create({
        //   seq_no: cloneFromPlan.LifeChapters[0].seq_no,
        //   chapter_name: cloneFromPlan.LifeChapters[0].chapter_name,
        //   start_age: cloneFromPlan.LifeChapters[0].start_age,
        //   end_age: cloneFromPlan.LifeChapters[0].end_age,
        //   invest_amount: cloneFromPlan.LifeChapters[0].invest_amount,
        //   return_pct: cloneFromPlan.LifeChapters[0].return_pct,
        //   inflation_pct: cloneFromPlan.LifeChapters[0].inflation_pct,
        //   InvestRateTypeId: cloneFromPlan.LifeChapters[0].InvestRateType.id,
        //   PlanId: results.id
        // })
        db.LifeChapter.bulkCreate(newChapters)
          .then(function (resul) {
          // console.log(`new chapter created ${res}`);
          db.Plan.findOne({
            where: { id: results.id },
            include: [{ model: db.PlanUser },
            {
              model: db.LifeChapter,
              include: [{ model: db.InvestRateType }]
            }],
            order: [
              [db.LifeChapter, 'seq_no', 'asc']
            ]
          }).then(data3 => {
            console.log(`data3>> ${data3}`);
            res.json(buildModel(data3));
          })

        })
      })
    })
  });

  // MRC

  // // clone a plan 
  // // initially this will be used to clone demo plan id 1
  // // to allow guest vistors to receive a rendered model
  // // and use it without being registered or logged in
  // // This cloned model will not be recoverable after user
  // // leaves page - (no database cleanup being setup at the moment)
  // app.get("/api/clone-plan/:id", function (req, res) {
  //   // retrieve the model being cloned from
  //   db.Plan.findOne({
  //     where: { id: req.params.id },
  //     include: [{ model: db.PlanUser },
  //     {
  //       model: db.LifeChapter,
  //       include: [{ model: db.InvestRateType }]
  //     }],
  //     order: [
  //       [db.LifeChapter, 'seq_no', 'asc']
  //     ]
  //   }).then(function (cloneFromPlan) {
  //     db.Plan.create({
  //       plan_name: 'Your Guest Financial IRA Model',
  //       PlanUserId: 2,
  //       PlanTypeId: 2
  //     }).then(function (results) {

  //       db.LifeChapter.create({
  //         seq_no: cloneFromPlan.LifeChapters[0].seq_no,
  //         chapter_name: cloneFromPlan.LifeChapters[0].chapter_name,
  //         start_age: cloneFromPlan.LifeChapters[0].start_age,
  //         end_age: cloneFromPlan.LifeChapters[0].end_age,
  //         invest_amount: cloneFromPlan.LifeChapters[0].invest_amount,
  //         return_pct: cloneFromPlan.LifeChapters[0].return_pct,
  //         inflation_pct: cloneFromPlan.LifeChapters[0].inflation_pct,
  //         InvestRateTypeId: cloneFromPlan.LifeChapters[0].InvestRateType.id,
  //         PlanId: results.id
  //       }).then(function (resul) {
  //         // console.log(`new chapter created ${res}`);
  //         db.Plan.findOne({
  //           where: { id: results.id },
  //           include: [{ model: db.PlanUser },
  //           {
  //             model: db.LifeChapter,
  //             include: [{ model: db.InvestRateType }]
  //           }],
  //           order: [
  //             [db.LifeChapter, 'seq_no', 'asc']
  //           ]



  //         }).then(data3 => {
  //           console.log(`data3>> ${data3}`);
  //           res.json(buildModel(data3));
  //         })

  //       })

  //       //   })
  //       // cloneFromPlan.LifeChapters.map(chapter => {
  //       //   // console.log(`life chapter ${chapter.seq_no}`);
  //       //   // console.log(`life chapter ${chapter.chapter_name}`);
  //       //   db.LifeChapter.create({
  //       //     seq_no: chapter.seq_no,
  //       //     chapter_name: chapter.chapter_name,
  //       //     start_age: chapter.start_age,
  //       //     end_age: chapter.end_age,
  //       //     invest_amount: chapter.invest_amount,
  //       //     return_pct: chapter.return_pct,
  //       //     inflation_pct: chapter.inflation_pct,
  //       //     InvestRateTypeId: chapter.InvestRateType.id,
  //       //     PlanId: results.id
  //       //   }).then(function (res) {
  //       //     console.log(`new chapter created ${res}`);

  //       //   })

  //       // }) // end of map
  //       // console.log(`AFTER MAP>>> ${results} `);
  //       // console.log(`AFTER MAP2>>> ${res} `);
  //       // db.Plan.findOne({
  //       //   where: { id: results.id },
  //       //   include: [{ model: db.PlanUser },
  //       //   {
  //       //     model: db.LifeChapter,
  //       //     include: [{ model: db.InvestRateType }]
  //       //   }],
  //       //   order: [
  //       //     [db.LifeChapter, 'seq_no', 'asc']
  //       //   ]



  //       // }).then(data3 => {
  //       //   console.log(`RETURNING>>> ${data3}`);
  //       //   res.json(buildModel(data3));
  //       // })





  //     })
  //   })
  // });





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