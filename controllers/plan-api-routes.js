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
  //console.log(`IN BUILD MODEL.plan_name>>> ${results.plan_name}`);
  //console.log(`IN BUILD MODEL.LifeChapters.length>>> ${results.LifeChapters.length}`);
  // build lifeChapters
  results.LifeChapters.map(chapter => {
    lifeChapters.push(new LifeChapter(chapter.id, chapter.seq_no, chapter.chapter_name,
      chapter.start_age, chapter.end_age, parseFloat(chapter.invest_amount), chapter.InvestRateType.id, chapter.InvestRateType.invest_type,
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

  // console.log(`FINANCIAL MODEL: ${JSON.stringify(financialModel)}`);

  return financialModel;
};


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


  // delete multiple plans
    // ALTER TABLE LifeChapters DROP FOREIGN KEY lifechapters_ibfk_2;
    // ALTER TABLE LifeChapters ADD CONSTRAINT lifechapters_ibfk_2 FOREIGN KEY (`PlanId`) REFERENCES `plans` (`id`) ON DELETE CASCADE;
  app.delete("/api/multi-plan", (req, res) => {
    // console.log(req.body.planIds);
    // const ids = req.body.planIds.split(',');
    // console.log(`isArray: ${Array.isArray(ids)} arrayIs: ${ids} ${ids[0]} ${ids[1]}`);
    Op = db.Sequelize.Op;
    // arrIds = [1686,1687];
    db.Plan.findAll({
      where: {id: { [Op.in]: req.body.planIds}}
      // where: {id: { [Op.in]: ids}}
      // where: {id: { [Op.in]: arrIds}}
      // where: {id: { [Op.in]: [1686,1687]}}
    })
    .then(plans => {
      console.log(`plans: ${JSON.stringify(plans)}`);
      const deletePromises = plans.map(plan => {
        return plan.destroy();
      });
      return db.Sequelize.Promise.all(deletePromises)
    })
    .then(deletedPlans => {
      res.json(deletedPlans)
    });
  });

 
  //  update plan & its life-chapters
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
      console.log(`BULK UPDATE TO CHAPTERS >>> ${JSON.stringify(req.body.updatedChapters)}`);
      db.LifeChapter.bulkCreate(req.body.updatedChapters,{updateOnDuplicate: ['chapter_name','start_age',
        'end_age','invest_amount','return_pct','inflation_pct','InvestRateTypeId']})
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


  // MRC ***  ATTEMPT AT CREATE/CLONE ROUTE

  // clone a plan 
  // initially this will be used to clone demo plan id 1
  // to allow guest vistors to receive a rendered model
  // and use it without being registered or logged in
  // This cloned model will not be recoverable after user
  // leaves page - (no database cleanup being setup at the moment)
  app.get("/api/clone-plan/:id/:planName/:userId/:planTypeId", function (req, res) {
    // retrieve the model being cloned from
    console.log(`CLONE SERVER-SIDE: ${JSON.stringify(req.params)}`);
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
        plan_name:  req.params.planName,
        PlanUserId: req.params.userId, // guest user id
        PlanTypeId: req.params.planTypeId  // guest plan type id
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


  // // MRC ***  WORKING VERSION

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
  //       PlanUserId: 2, // guest user id
  //       PlanTypeId: 2  // guest plan type id
  //     }).then(function (results) {

  //       // results.LifeChapters.map(chapter => {
  //       //   lifeChapters.push(new LifeChapter(chapter.seq_no, chapter.chapter_name,
  //       //     chapter.start_age, chapter.end_age, chapter.invest_amount, chapter.InvestRateType.invest_type,
  //       //     chapter.return_pct, chapter.inflation_pct));
  //       var newChapters = [];
  //       cloneFromPlan.LifeChapters.map(chapter => {
  //         newChapters.push({
  //           seq_no: chapter.seq_no,
  //           chapter_name: chapter.chapter_name,
  //           start_age: chapter.start_age,
  //           end_age: chapter.end_age,
  //           invest_amount: chapter.invest_amount,
  //           return_pct: chapter.return_pct,
  //           inflation_pct: chapter.inflation_pct,
  //           InvestRateTypeId: chapter.InvestRateType.id,
  //           PlanId: results.id
  //         })
  //       });
  //       console.log(`BULK DATA>>> ${JSON.stringify(newChapters)}`);
  //       // db.LifeChapter.create({
  //       //   seq_no: cloneFromPlan.LifeChapters[0].seq_no,
  //       //   chapter_name: cloneFromPlan.LifeChapters[0].chapter_name,
  //       //   start_age: cloneFromPlan.LifeChapters[0].start_age,
  //       //   end_age: cloneFromPlan.LifeChapters[0].end_age,
  //       //   invest_amount: cloneFromPlan.LifeChapters[0].invest_amount,
  //       //   return_pct: cloneFromPlan.LifeChapters[0].return_pct,
  //       //   inflation_pct: cloneFromPlan.LifeChapters[0].inflation_pct,
  //       //   InvestRateTypeId: cloneFromPlan.LifeChapters[0].InvestRateType.id,
  //       //   PlanId: results.id
  //       // })
  //       db.LifeChapter.bulkCreate(newChapters)
  //         .then(function (resul) {
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
  //     })
  //   })
  // });

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