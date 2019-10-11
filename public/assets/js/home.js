// home page  

//on document load
$(document).ready(function(){






  // $('body').hide();
  // $(window).on('load', function() {
  //   var activeWallpaper = manageLocalStorage.getLocalStorage('wallpaper');
  //   if (!activeWallpaper) {
  //     activeWallpaper ='money'
  //   };
  
  //   setStyleSheet(`assets/css/${activeWallpaper}-theme.css`);
  //     $('body').show();
  // });


// prototyping phase  
// make get routes call to retrieve a default model data 
// and render it as table grid on page

// // change page theme css style sheet
//   function setStyleSheet(url) {
//     var stylesheet = document.getElementById("css-theme");
//     stylesheet.setAttribute('href',url);
//   };



  // helper functions

  // set style sheet for a wallpaper change
  function setStyleSheet(url) {
    var stylesheet = document.getElementById("css-theme");
    stylesheet.setAttribute('href',url);
  };

  // helper model objects and classes
  class RenderModel {
    constructor(name, id, userId, planTypeId, lifeChapters) {
      this.name = name;
      this.id   = id;
      this.userId = userId;
      this.planTypeId = planTypeId;
      this.lifeChapters = lifeChapters; // array of RenderChapter(s)
    }

    // methods
  };

  class RenderChapter {
    constructor(seq_no, chapterName, startAge, endAge, investAmount, returnPct, inflationPct,investRateTypeId,planId) {
      this.seq_no = seq_no;
      this.chapterName   = chapterName;
      this.startAge = startAge;
      this.endAge = endAge
      this.investAmount = investAmount;
      this.returnPct = returnPct;
      this.inflationPct = inflationPct;
      this.investRateTypeId = investRateTypeId;
      this.planId = planId;
    }

    // methods
  };


  // ----------------------------------------------------------
  // object for local storage:
  // ----------------------------------------------------------
  var manageLocalStorage = {
    // local variables:

    // methods:

    // method to clear property from local storage
    clearLocalStorage: function(property) {
      console.log("in manageLocalStorage.clearLocalStorage");
      localStorage.removeItem(property);
    },

    // method to get property from local storage
    getLocalStorage: function(property) {
      console.log("in manageLocalStorage.getLocalStorage");
      var propVal = localStorage.getItem(property);
      return propVal;
    },

    // method to set property in local storage
    setLocalStorage: function(property,propVal) {
      console.log("in manageLocalStorage.setLocalStorage");
      localStorage.setItem(property,propVal);
    }
  };

  // get the saved wallpaper and apply style
  var activeWallpaper = manageLocalStorage.getLocalStorage('wallpaper');
  if (!activeWallpaper) {
    activeWallpaper ='money'
  };
  $('.dropdown-item.active').removeClass("active");
  $('.dropdown-item[data-value="' + activeWallpaper +'"]').addClass("active");
  setStyleSheet(`assets/css/${activeWallpaper}-theme.css`);


  var data36 =
  {
    name: 'Age-36',
    // data: yAxisData,
    data: [0,0,0,0,2200, 3800, 4000,5000,7500],

    type: 'areaspline',
    color: '#026873',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      ]
    }
  };

  var data26 = 
  {
    name: 'Age-26',
    // data: yAxisData,
    data: [0,0,2200, 3800, 4000,5000,7500,9000,12000],

    type: 'areaspline',
    color: '#026873',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      ]
    }
  };

  var data16 =
  {
    name: 'Age-16',
    // data: yAxisData,
    data: [2200, 3800, 4000,5000,7500,9000,12000,16000,30000],

    type: 'areaspline',
    color: '#026873',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[0]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
      ]
    }
  };



  // output the chartResult object into x, y arrays
  function resultPlotsToArray(resultPlots) {
    // console.log("in home.js.resultPlotsToArray");
    var xArray = [];
    var yArray = [];
    console.log(resultPlots);
    resultPlots.map(plot => {
      xArray.push(plot.year);
      yArray.push(plot.amount);
    });
    return { yearAxis : xArray, dollarAxis : yArray };
  };

 // render slide demo
 function renderDemo(xAxisData, yAxisData) {
  // console.log("in home.js.renderChart");
  Highcharts.setOptions({
    colors: ['#026873'],
    lang: {
      thousandsSep: ',' }
  
  });
  Highcharts.chart('slide-chart', {
    chart: {
      type: 'area',
      backgroundColor:  null 
      // 'rgba(197, 209, 217, .2'
    },
    tooltip: {
      valuePrefix: '$'
    },
    title: {
      text: 'Demo Slide Chart' 
      // 'Historic and Estimated Worldwide Population Growth by Region'
    },
    // subtitle: {
    //   text: 'Source: Wikipedia.org'
    // },
    xAxis: {
      // min: 16,
      // max: 28,
      categories: ['16', '17', '18', '19', '20', '21', '22', '23', '24',  
                    '25','26','27','28','29','30','31','32','33','34','35',
                  '36','37','38','39','40','41','42','43','44','45','46','47',
                  '48','49','50','51','52','53','54','55','56','57','58','59',
                  '60','61','62','63','64','65'],
      // categories: xAxisData,
      // [15,16,17,18,19,20,21,22],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: '$ Dollars'
      }
      // ,
      // labels: {
      //   formatter: function () {
      //     return this.value / 1;
      //   }
      // }
    },
    tooltip: {
      split: true,
      valueSuffix: ' dollars'
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false
        }
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          enabled: false
          // lineWidth: 1,
          // lineColor: '#666666'
        }
      }
    },
    line: {
      marker: {
          enabled: false
      }
    },
    series: demoXaxisData
    // [ 
    //   {
    //     name: 'Age-36',
    //     // data: yAxisData,
    //     data: [0,0,0,0,2200, 3800, 4000,5000,7500],

    //     type: 'areaspline',
    //     color: '#026873',
    //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    //     fillColor: {
    //       linearGradient: {
    //           x1: 0,
    //           y1: 0,
    //           x2: 0,
    //           y2: 1
    //       },
    //       stops: [
    //           [0, Highcharts.getOptions().colors[0]],
    //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //       ]
    //     }
    //   },
    //   {
    //     name: 'Age-26',
    //     // data: yAxisData,
    //     data: [0,0,2200, 3800, 4000,5000,7500,9000,12000],

    //     type: 'areaspline',
    //     color: '#026873',
    //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    //     fillColor: {
    //       linearGradient: {
    //           x1: 0,
    //           y1: 0,
    //           x2: 0,
    //           y2: 1
    //       },
    //       stops: [
    //           [0, Highcharts.getOptions().colors[0]],
    //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //       ]
    //     }
    //   },  
    //   {
    //     name: 'Age-16',
    //     // data: yAxisData,
    //     data: [2200, 3800, 4000,5000,7500,9000,12000,16000,30000],

    //     type: 'areaspline',
    //     color: '#026873',
    //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    //     fillColor: {
    //       linearGradient: {
    //           x1: 0,
    //           y1: 0,
    //           x2: 0,
    //           y2: 1
    //       },
    //       stops: [
    //           [0, Highcharts.getOptions().colors[0]],
    //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
    //       ]
    //     }
    //   }

    // ]
  });
};


  // render the financial chart using model data
  function renderChart(chartName, xAxisData, yAxisData) {
    // console.log("in home.js.renderChart");
    Highcharts.setOptions({colors: ['#026873']});
    Highcharts.chart('chart-container', {
      chart: {
        type: 'area',
        backgroundColor:  null 
        // 'rgba(197, 209, 217, .2'
      },
      tooltip: {
        valuePrefix: '$'
      },
      title: {
        text: chartName 
        // 'Historic and Estimated Worldwide Population Growth by Region'
      },
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      xAxis: {
        // categories: ['15', '16', '17', '18', '19', '20', '21'],
        categories: xAxisData,
        // [15,16,17,18,19,20,21,22],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: '$ Dollars'
        }
        // ,
        // labels: {
        //   formatter: function () {
        //     return this.value / 1;
        //   }
        // }
      },
      tooltip: {
        split: true,
        valueSuffix: ' dollars'
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        },
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            enabled: false
            // lineWidth: 1,
            // lineColor: '#666666'
          }
        }
      },
      line: {
        marker: {
            enabled: false
        }
      },
      series: [{
        name: 'Age',
        data: yAxisData,
        type: 'areaspline',
        color: '#026873',
        // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
        fillColor: {
          linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
          },
          stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        }
      }
      ]
    });
  };


  // render the demo-intro slide 1
  var demoXaxisData = [];
  demoXaxisData.push(data36);

  renderDemo([],[]);

  demoXaxisData.push(data26);
  renderDemo([],[]);
  // $('#slide-chart').highcharts().redraw();

  // retreive financial plan and render in model grid, ToDo : and model chart
  $.ajax("/api/clone-plan/1", {       // cloning system demo plan 1
  // $.ajax("/api/plan-user-life-chapter/1", {  
    type: "GET"
  }).then(function(res) {
      var { yearAxis, dollarAxis } = resultPlotsToArray(res.chartResult.resultPlots);
      // var financialModelChapters = [];
      // console.log(yearAxis);
      // console.log(dollarAxis);
      console.log(res);
      console.log(`plan type id: ${res.planTypeId}`);
      $("#grid-caption").text(res.name);
      $("#grid-caption").attr('data-id',`${res.id}`);
      $("#grid-caption").attr('data-user-id',`${res.userId}`);
      $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`);

      res.lifeChapters.map(chapter => {
        console.log(`seq: ${chapter.seqNo} name ${chapter.name} start ${chapter.startYear} end ${chapter.endYear} 
                     invest-amt ${chapter.investAmount} invest-rate-type-id: ${chapter.investRateTypeId} frequency: ${chapter.frequency} 
                     return-rate ${chapter.returnPct} inflation-rate ${chapter.inflationPct}`);
        var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`);
        modelRow.attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
        modelRow.attr('data-seq-no',`${chapter.seqNo}`);
        modelRow.append($(`<td>${chapter.name}</td>`).attr('data-key','chapter_name').attr('contenteditable','true'));
        modelRow.append($(`<td>${chapter.startYear}</td>`).attr('data-key','start_age').attr('contenteditable','true'));
        modelRow.append($(`<td>${chapter.endYear}</td>`).attr('data-key','end_age').attr('contenteditable','true'));
        modelRow.append($(`<td>${chapter.investAmount}</td>`).attr('data-key','invest_amount').attr('contenteditable','true'));
        modelRow.append($(`<td>${chapter.frequency}</td>`));
        modelRow.append($(`<td>${chapter.returnPct}</td>`).attr('data-key','return_pct').attr('contenteditable','true'));
        modelRow.append($(`<td>${chapter.inflationPct}</td>`).attr('data-key','inflation_pct'));
        $("#grid-table").append(modelRow);
        // // create a chapter for use in financial model object
        // financialModelChapters.push(new RenderChapter(chapter.seqNo,chapter.name,chapter.startYear,chapter.endYear,
        //   chapter.investAmount,chapter.returnPct,chapter.inflationPct,chapter.investRateTypeId,res.id));
      });
      // // create financial model object for use client side
      // var financialModel = new RenderModel(res.name,res.id,res.userId,financialModelChapters);
      // console.log(`renderModel: ${JSON.stringify(financialModel)}`);
      renderChart(res.name, yearAxis, dollarAxis);
    }
  );

 

  // test button event
  $("#test-btn").on("click",function() {
    console.log("in global.test-btn click event")
    // ajax put call for testing update of model 
    // update financial model (plan and chapters)

    // plan to update
    var plan = {
      id: $("#grid-caption").attr('data-id'),
      plan_name: $("#grid-caption").text(),
      PlanUserId: $("#grid-caption").attr('data-user-id'),
      PlanTypeId: $("#grid-caption").attr('data-plan-type-id'),
    };

    // chapters to update
    var updatedChapters = [];
    $("tr.model-row").each(function() {
      var chapter = {};
      chapterId = $(this).attr('data-id');
      Object.assign(chapter,{id: chapterId});
      seqNo = $(this).attr('data-seq-no');
      Object.assign(chapter,{seq_no: seqNo});
      $(this).find("td").each(function() {
        if ($(this).data("key")) {
          console.log(`the key is:  ${$(this).data("key")}`);
          console.log(`CHAPTER-TD element: ${$(this).text()}`);
          thing = $(this).data("key");
          Object.assign(chapter,{[thing]: $(this).text()});
        };
      });
      investRateTypeId = $(this).attr('data-invest-rate-type-id');
      Object.assign(chapter,{InvestRateTypeId: investRateTypeId});
      Object.assign(chapter,{PlanId: $("#grid-caption").attr('data-id')});
      console.log(`This is the chapter object: ${JSON.stringify(chapter)}`);
      updatedChapters.push(chapter);
    }); 

    // some changes in lieu of front end data entry being ready
    // plan.plan_name = "TESTING CHANGE ROUTE 2";
    // updatedChapters[0].chapter_name = "FUBAR";
    // updatedChapters[0].start_age = 15;
    // updatedChapters[0].end_age = 17;
    // updatedChapters[0].invest_amount = 13.13;
    // updatedChapters[0].return_pct = 9.9;
    // updatedChapters[0].inflation_pct = 2.2;
    // updatedChapters[1].chapter_name = "FOO";
    // updatedChapters[1].start_age = 18;
    // updatedChapters[1].end_age = 22;
    // updatedChapters[1].invest_amount = 21.21;
    // updatedChapters[1].return_pct = 7.7;
    // updatedChapters[1].inflation_pct = 1.1;

    console.log(JSON.stringify(updatedChapters));

    // add the array of chapters to the request plan arugument
    Object.assign(plan,{updatedChapters: updatedChapters});

    console.log(JSON.stringify(plan));

    
    // turn off call while I try to code for the update object content
    $.ajax("/api/plan-life-chapters", {       
        type: "PUT",
        data: plan
      }).then(function(res) {
          var { yearAxis, dollarAxis } = resultPlotsToArray(res.chartResult.resultPlots);
          // var financialModelChapters = [];
          // console.log(yearAxis);
          // console.log(dollarAxis);
          console.log(res);

          $("#grid-caption").text(res.name);
          $("#grid-caption").attr('data-id',`${res.id}`);
          $("#grid-caption").attr('data-user-id',`${res.userId}`);
          $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`);


          $("tr.model-row").remove();
          res.lifeChapters.map(chapter => {
            console.log(`seq: ${chapter.seqNo} name ${chapter.name} start ${chapter.startYear} end ${chapter.endYear} 
                        invest-amt ${chapter.investAmount} invest-rate-type-id: ${chapter.investRateTypeId} frequency: ${chapter.frequency} 
                        return-rate ${chapter.returnPct} inflation-rate ${chapter.inflationPct}`);
            // var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`).attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
            // modelRow.append($(`<td>${chapter.name}</td>`));
            // modelRow.append($(`<td>${chapter.startYear}</td>`));
            // modelRow.append($(`<td>${chapter.endYear}</td>`));
            // modelRow.append($(`<td>${chapter.investAmount}</td>`));
            // modelRow.append($(`<td>${chapter.frequency}</td>`));
            // modelRow.append($(`<td>${chapter.returnPct}</td>`));
            // modelRow.append($(`<td>${chapter.inflationPct}</td>`));
            // $("#grid-table").append(modelRow);

            var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`);
            modelRow.attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
            modelRow.attr('data-seq-no',`${chapter.seqNo}`);
            modelRow.append($(`<td>${chapter.name}</td>`).attr('data-key','chapter_name').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.startYear}</td>`).attr('data-key','start_age').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.endYear}</td>`).attr('data-key','end_age').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.investAmount}</td>`).attr('data-key','invest_amount').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.frequency}</td>`));
            modelRow.append($(`<td>${chapter.returnPct}</td>`).attr('data-key','return_pct').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.inflationPct}</td>`).attr('data-key','inflation_pct').attr('contenteditable','true'));
            $("#grid-table").append(modelRow);
            // // create a chapter for use in financial model object
            // financialModelChapters.push(new RenderChapter(chapter.seqNo,chapter.name,chapter.startYear,chapter.endYear,
            //   chapter.investAmount,chapter.returnPct,chapter.inflationPct,chapter.investRateTypeId,res.id));
          });
          // // create financial model object for use client side
          // var financialModel = new RenderModel(res.name,res.id,res.userId,financialModelChapters);
          // console.log(`renderModel: ${JSON.stringify(financialModel)}`);
          renderChart(res.name, yearAxis, dollarAxis);
        }
      );
  
  });


  // wall paper drop down event
  $(document).on("click", ".dropdown-item", function() {
    console.log("in global.dropdown-item click event");
    console.log("you pressed: " + $(this).data("value"));
    var clickedValue = $(this).data("value");
    console.log("value is: ",clickedValue); 
    $('.dropdown-item.active').removeClass("active");
    $('.dropdown-item[data-value="' + clickedValue +'"]').addClass("active");
    setStyleSheet(`assets/css/${clickedValue}-theme.css`);
    manageLocalStorage.setLocalStorage('wallpaper',clickedValue);
  });

  // toggle upper section on/off when users scrolls down/up
  window.onscroll = function() {hideDiv()};

  function hideDiv() {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 150) {
      $("#main-section").fadeOut();
      
    } 
    else if (document.documentElement.scrollTop <= 150) {
      $("#main-section").fadeIn();
    }
  };

  // ----------------------------------------------------------
  // START OF PROGRAM FLOW:
  // ----------------------------------------------------------
  // console.log("In Home Page");
  // var activeWallpaper = manageLocalStorage.getLocalStorage('wallpaper');
  // if (!activeWallpaper) {
  //   activeWallpaper ='money'
  // };

  // setStyleSheet(`assets/css/${activeWallpaper}-theme.css`);
  

  // SAVING CODE that processed API results when they weren't converted to Class objects
  // $.ajax("/api/plan-user-life-chapter/4", {
  //   type: "GET"
  // }).then(function(res) {
  //     console.log(res);
  //     console.log(`plan name: ${res.plan_name}`);
  //     $("#grid-caption").text(res.plan_name);
  //     res.LifeChapters.map(chapter => {
  //       console.log(`seq: ${chapter.seq_no} name ${chapter.chapter_name} start ${chapter.start_age} end ${chapter.end_age} 
  //                    invest-amt ${chapter.invest_amount} frequency: ${chapter.InvestRateType.invest_type} 
  //                    return-rate ${chapter.return_pct} inflation-rate ${chapter.inflation_pct}`);
  //       var modelRow = $('<tr>');
  //       modelRow.append($(`<td>${chapter.chapter_name}</td>`));
  //       modelRow.append($(`<td>${chapter.start_age}</td>`));
  //       modelRow.append($(`<td>${chapter.end_age}</td>`));
  //       modelRow.append($(`<td>${chapter.invest_amount}</td>`));
  //       modelRow.append($(`<td>${chapter.InvestRateType.invest_type}</td>`));
  //       modelRow.append($(`<td>${chapter.return_pct}</td>`));
  //       modelRow.append($(`<td>${chapter.inflation_pct}</td>`));
  //       $("#grid-table").append(modelRow);
  //     });
  //   }
  // );

  // demo chart via chartist
  // var chartData = {
  //   labels:[15,20,25,30,35,40,45,50,55,60,65],
  //   series:[
  //     {
  //       name: 'model-1',
  //       data: [200,500,600,3000,5000,6700,8000,11000,13000,20000,
  //              22000],
  //     },

  //   ]
  // };





// // We are setting a few options for our chart and override the defaults
// var options = {
//   // Don't draw the line chart points
//   showPoint: true,
//   // Disable line smoothing
//   lineSmooth: true,
//   // X-Axis specific configuration
//   axisX: {
//     // We can disable the grid for this axis
//     showGrid: true,
//     // and also don't show the label
//     showLabel: true
//   },
//   // Y-Axis specific configuration
//   axisY: {
//     // Lets offset the chart a bit from the labels
//     offset: 60,
//     // The label interpolation function enables you to modify the values
//     // used for the labels on each axis. Here we are converting the
//     // values into million pound.
//     labelInterpolationFnc: function(value) {
//       return '$' + value;
//     }
//   }
// };

  // var myChart = new Chartist.Line('#demo-chart',chartData,options);

  // var nums = [];
  // var amount = 0;
  // var modelData = [];
  // for (let i = 15; i <= 66; i++) {
  //   nums.push(i);
  //   if (i % 5) {
  //     modelData.push(amount += 200 + i * 50)
  //   } else if (i % 3) {
  //     modelData.push(amount += 400 + i * 100)
  //   } else if (i % 6) {
  //     modelData.push(amount += 1000 + i * 200)
  //   } else if (i % 7) {
  //     modelData.push(amount += 800 + i * 300)
  //   } else {
  //     modelData.push(amount += 600 + i * 20)
  //   };
  // };
  // console.log(nums);
  // console.log(modelData);

  

  // Highcharts.setOptions({colors: ['#026873']});
  // Highcharts.chart('container', {
  //   chart: {
  //     type: 'area',
  //     backgroundColor:  null 
  //     // 'rgba(197, 209, 217, .2'
  //   },
  //   title: {
  //     text: title 
  //     // 'Historic and Estimated Worldwide Population Growth by Region'
  //   },
  //   // subtitle: {
  //   //   text: 'Source: Wikipedia.org'
  //   // },
  //   xAxis: {
  //     // categories: ['15', '16', '17', '18', '19', '20', '21'],
  //     categories: nums,
  //     // [15,16,17,18,19,20,21,22],
  //     tickmarkPlacement: 'on',
  //     title: {
  //       enabled: false
  //     }
  //   },
  //   yAxis: {
  //     title: {
  //       text: '$ Dollars'
  //     }
  //     // ,
  //     // labels: {
  //     //   formatter: function () {
  //     //     return this.value / 1;
  //     //   }
  //     // }
  //   },
  //   tooltip: {
  //     split: true,
  //     valueSuffix: ' dollars'
  //   },
  //   plotOptions: {
  //     series: {
  //       marker: {
  //         enabled: false
  //       }
  //     },
  //     area: {
  //       stacking: 'normal',
  //       lineColor: '#666666',
  //       lineWidth: 1,
  //       marker: {
  //         enabled: false
  //         // lineWidth: 1,
  //         // lineColor: '#666666'
  //       }
  //     }
  //   },
  //   line: {
  //     marker: {
  //         enabled: false
  //     }
  //   },
  //   series: [{
  //     name: 'Age',
  //     data: modelData,
  //     type: 'areaspline',
  //     color: '#026873',
  //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
  //     fillColor: {
  //       linearGradient: {
  //           x1: 0,
  //           y1: 0,
  //           x2: 0,
  //           y2: 1
  //       },
  //       stops: [
  //           [0, Highcharts.getOptions().colors[0]],
  //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
  //       ]
  //   }
  //   }
  //   ]
  // });


  // Highcharts.chart('container', {
  //   chart: {
  //     type: 'area'
  //   },
  //   title: {
  //     text: 'Historic and Estimated Worldwide Population Growth by Region'
  //   },
  //   subtitle: {
  //     text: 'Source: Wikipedia.org'
  //   },
  //   xAxis: {
  //     categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
  //     tickmarkPlacement: 'on',
  //     title: {
  //       enabled: false
  //     }
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Billions'
  //     },
  //     labels: {
  //       formatter: function () {
  //         return this.value / 1000;
  //       }
  //     }
  //   },
  //   tooltip: {
  //     split: true,
  //     valueSuffix: ' millions'
  //   },
  //   plotOptions: {
  //     area: {
  //       stacking: 'normal',
  //       lineColor: '#666666',
  //       lineWidth: 1,
  //       marker: {
  //         lineWidth: 1,
  //         lineColor: '#666666'
  //       }
  //     }
  //   },
  //   series: [{
  //     name: 'Asia',
  //     data: [502, 635, 809, 947, 1402, 3634, 5268]
  //   }, {
  //     name: 'Africa',
  //     data: [106, 107, 111, 133, 221, 767, 1766]
  //   }, {
  //     name: 'Europe',
  //     data: [163, 203, 276, 408, 547, 729, 628]
  //   }, {
  //     name: 'America',
  //     data: [18, 31, 54, 156, 339, 818, 1201]
  //   }, {
  //     name: 'Oceania',
  //     data: [2, 2, 2, 6, 13, 30, 46]
  //   }]
  // });


});