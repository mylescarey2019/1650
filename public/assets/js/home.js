// home page  

//on document load
$(document).ready(function(){

  // hide the save model button until user signed in
  $('#save-btn').hide();

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
  $('.dropdown-item.wallpaper.active').removeClass("active");
  $('.dropdown-item.wallpaper[data-value="' + activeWallpaper +'"]').addClass("active");
  setStyleSheet(`assets/css/${activeWallpaper}-theme.css`);
  var chartGraphColor = '';
  var chartAxisColor = '';
  setChartColor(activeWallpaper);

  // set chart color based on wallpaper color
  function setChartColor(wallPaperColor) {
    switch (wallPaperColor) {
      case 'money': {chartGraphColor = '#1F9376',
                     chartAxisColor = '#191919'}
        break;
      case 'desert':  {chartGraphColor = '#026873'
                        chartAxisColor = '#191919'}
        break;
      case 'ocean':  {chartGraphColor = '#027373'
                       chartAxisColor = '#191919'}
        break;
      case 'mountain':  {chartGraphColor = '#7C92A6'
                         chartAxisColor = '#e5e5e5'}
        break;
      case 'road':  {chartGraphColor = '#594031'
                      chartAxisColor = '#D5E5F2'}
        break;
      case 'tunnel':  {chartGraphColor = '#BDBEBF'
                        chartAxisColor = '#F0F0F2'}
        break;
      case 'chess':  {chartGraphColor = '#244673'
                       chartAxisColor = '#e5e5e5'}
        break;
      case 'glass':  {chartGraphColor = '#F2D479'
                       chartAxisColor = '#191919'}
      // default:  {chartGraphColor = '#1F9376'
      //              chartAxisColor = '#191919'}
        break;
    }
  };

  



  Highcharts.setOptions({
    // colors: ['#026873','#FF0000','#FFFF00','#008000'],
    colors: [chartGraphColor,'#FF0000','#FFFF00','#008000'],
    lang: {
      thousandsSep: ',' }
  });
  

  var data36 =
  {
    name: 'Age-36',
    // data: yAxisData,
    // data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,300,400,600,700,
    //   900,1100,1250,1400,1600,1800,2800,3800,5000,7900,9000,12000,16000,20000,27000,32000,40000,46000,56000,72000,90000,100000,120000,140000,190000],

    data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,125,261,408
      ,567,739,926,1128,1347,1584,1841,2119,2421,2747,3100,3483,3897,4346,4832,5359,5929
      ,6546,7215,7939,8724,9573,10493,11489,12568,13737,15002],

    type: 'areaspline',
    color: '#FF0000',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[1]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0).get('rgba')]
      ]
    }
  };

  var dataSeries26 =  [
    null,null,null,null,null,null,null,null,null,null,125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359
    ,5929,6547,7216,7940,8724,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143
  ];

  var dataSeries16 = [
    125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359,5929,6547,7216,7940,8724
    ,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143,38185,41480,45048
    ,48912,53097,57629,62538,67854,73611,79846
  ];

  var data26 = 
  {
    name: 'Age-26',
    // data: yAxisData,
    // data: [0,0,0,0,0,0,0,0,0,0,20,30,40,60,80,100,130,160,200,300,360,440,600,800,990,
    //   1100,1200,1400,1650,2000,2500,3500,4600,7000,9000,12000,16000,20000,26000,33000,40000,50000,62000,76000,93000,110000,135000,160000,200000,270000],
    data: [
      null,null,null,null,null,null,null,null,null,null,125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359
      ,5929,6547,7216,7940,8724,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143
    ],
    type: 'areaspline',
    // color: '#69728C',
    color: '#FFFF00',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[2]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0).get('rgba')]
      ]
    }
  };

  var data16 =
  {
    name: 'Age-16',
    // data: yAxisData,
    // data: [100,150,200,260,330,400,480,600,700,900,1000,1200,1400,1700,2100,2600,3100,3700,4400,5000,5900,6600,7500,9000,10500,
    //   12000,14000,15000,17000,19000,20000,22000,24000,29000,31000,34000,39000,44000,50000,55000,60000,72000,80000,93000,105000,120000,140000,190000,240000,410000],
    data: [
      125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359,5929,6547,7216,7940,8724
      ,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143,38185,41480,45048
      ,48912,53097,57629,62538,67854,73611,79846
    ],  
    type: 'areaspline',
    // color: '#026873',
    color: '#008000',
    // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
    fillColor: {
      linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
      },
      stops: [
          [0, Highcharts.getOptions().colors[3]],
          [1, Highcharts.Color(Highcharts.getOptions().colors[3]).setOpacity(0).get('rgba')]
      ]
    }
  };


  // global game variables
  var demoXaxisData = [];
  var demoStartTimerDelay = 1000;
  var demoNextStepDelay = 3000;
  // interval for timers
  var demoStartIntervalId;
  var demoNextStepIntervalId;
  // var demoChart = $('slide-chart').highcharts();

  // start the demo slide delay
  function demoStartDelay() {
    console.log("in global.demoStartDelay");
    // update timer on page
    demoStartIntervalId = setInterval(firstDemoStep, demoStartTimerDelay);
  }

  // first demo step
  function firstDemoStep() {
    console.log("in global.firstDemoStep");
    // alert(" demo start delay of 3 seconds finished");
    clearInterval(demoStartIntervalId);
    // demoXaxisData.push(data36);
    demoChart.addSeries(data36)
    // demoChart.redraw();

    // renderDemo();
    demoNextStepIntervalId = setInterval(secondDemoStep, demoNextStepDelay);
  };

  // second demo step
  function secondDemoStep() {
    console.log("in global.secondtDemoStep");
    // alert(" demo step 1 delay of 5 seconds finished");
    clearInterval(demoNextStepIntervalId);
    // demoXaxisData.push(data26);
    // renderDemo();

    // demoChart.series[0].update(data26);
    // demoChart.redraw();

    demoChart.addSeries(data26);
    // demoChart.redraw();
  
    demoNextStepIntervalId = setInterval(thirdDemoStep, demoNextStepDelay);
  };

  // third demo step
  function thirdDemoStep() {
    console.log("in global.thirdDemoStep");
    // alert(" demo step 2 delay of 5 seconds finished");
    clearInterval(demoNextStepIntervalId);
    // demoXaxisData.push(data16);
    // renderDemo();

    // demoChart.redraw();
    // demoChart.series[0].update(data16);

    demoChart.addSeries(data16);
    // demoChart.redraw();

  };

  demoChartOptions = 
  {
    chart: {
      type: 'area',
      backgroundColor:  null 
      // 'rgba(197, 209, 217, .2'
    },
    // colors: ['#FFFF00'],
    title: {
      text: 'Power of Compound Interest',
      style: {
        fontWeight: 'bold',
        fontSize: '24px',
      }
      // 'Historic and Estimated Worldwide Population Growth by Region'
    },
    subtitle: {
      text: '$10 per month at 8% historic stock market return - starting at age 36, 26 and 16',
      style: {
        // fontWeight: 'bold',
        fontSize: '13px',
      }
    },
    tooltip: {
      valuePrefix: '$'
    },

    // subtitle: {
    //   text: 'Source: Wikipedia.org'
    // },
    legend: {
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '18px',
      }
    },
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
      opposite: true,
      min: 0,
      max: 80000,
      // floor: 0,
      // ceiling: 80000,
      tickInterval: 20000,
      title: {
        text: '$ Dollars',
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
        }
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
};




  // create demo chart
  var demoChart = Highcharts.chart('slide-chart', demoChartOptions);
  






//   // create 
//   demoChart = {};
//  // render slide demo
//  function renderDemo() {
//   // console.log("in home.js.renderChart");
//   demoChart = 
//   Highcharts.chart('slide-chart', {
//     chart: {
//       type: 'area',
//       backgroundColor:  null 
//       // 'rgba(197, 209, 217, .2'
//     },
//     // colors: ['#FFFF00'],
//     title: {
//       text: 'Power of Compound Interest',
//       style: {
//         fontWeight: 'bold',
//         fontSize: '24px',
//       }
//       // 'Historic and Estimated Worldwide Population Growth by Region'
//     },
//     subtitle: {
//       text: '$10 per month at 8% historic stock market return - starting at age 36, 26 and 16',
//       style: {
//         // fontWeight: 'bold',
//         fontSize: '14px',
//       }
//     },
//     tooltip: {
//       valuePrefix: '$'
//     },

//     // subtitle: {
//     //   text: 'Source: Wikipedia.org'
//     // },
//     legend: {
//       itemStyle: {
//         fontWeight: 'bold',
//         fontSize: '18px',
//       }
//     },
//     xAxis: {
//       // min: 16,
//       // max: 28,
//       categories: ['16', '17', '18', '19', '20', '21', '22', '23', '24',  
//                     '25','26','27','28','29','30','31','32','33','34','35',
//                   '36','37','38','39','40','41','42','43','44','45','46','47',
//                   '48','49','50','51','52','53','54','55','56','57','58','59',
//                   '60','61','62','63','64','65'],
//       // categories: xAxisData,
//       // [15,16,17,18,19,20,21,22],
//       tickmarkPlacement: 'on',
//       title: {
//         enabled: false
//       }
//     },
//     yAxis: {
//       opposite: true,
//       min: 0,
//       max: 80000,
//       title: {
//         text: '$ Dollars',
//         style: {
//           fontWeight: 'bold',
//           fontSize: '18px',
//         }
//       }
//       // ,
//       // labels: {
//       //   formatter: function () {
//       //     return this.value / 1;
//       //   }
//       // }
//     },
//     tooltip: {
//       split: true,
//       valueSuffix: ' dollars'
//     },
//     plotOptions: {
//       series: {
//         marker: {
//           enabled: false
//         }
//       },
//       area: {
//         stacking: 'normal',
//         lineColor: '#666666',
//         lineWidth: 1,
//         marker: {
//           enabled: false
//           // lineWidth: 1,
//           // lineColor: '#666666'
//         }
//       }
//     },
//     line: {
//       marker: {
//           enabled: false
//       }
//     },
//     series: demoXaxisData
//     // [ 
//     //   {
//     //     name: 'Age-36',
//     //     // data: yAxisData,
//     //     data: [0,0,0,0,2200, 3800, 4000,5000,7500],

//     //     type: 'areaspline',
//     //     color: '#026873',
//     //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
//     //     fillColor: {
//     //       linearGradient: {
//     //           x1: 0,
//     //           y1: 0,
//     //           x2: 0,
//     //           y2: 1
//     //       },
//     //       stops: [
//     //           [0, Highcharts.getOptions().colors[0]],
//     //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//     //       ]
//     //     }
//     //   },
//     //   {
//     //     name: 'Age-26',
//     //     // data: yAxisData,
//     //     data: [0,0,2200, 3800, 4000,5000,7500,9000,12000],

//     //     type: 'areaspline',
//     //     color: '#026873',
//     //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
//     //     fillColor: {
//     //       linearGradient: {
//     //           x1: 0,
//     //           y1: 0,
//     //           x2: 0,
//     //           y2: 1
//     //       },
//     //       stops: [
//     //           [0, Highcharts.getOptions().colors[0]],
//     //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//     //       ]
//     //     }
//     //   },  
//     //   {
//     //     name: 'Age-16',
//     //     // data: yAxisData,
//     //     data: [2200, 3800, 4000,5000,7500,9000,12000,16000,30000],

//     //     type: 'areaspline',
//     //     color: '#026873',
//     //     // [850, 900, 1100, 1400, 2200, 3800, 13000,25000]
//     //     fillColor: {
//     //       linearGradient: {
//     //           x1: 0,
//     //           y1: 0,
//     //           x2: 0,
//     //           y2: 1
//     //       },
//     //       stops: [
//     //           [0, Highcharts.getOptions().colors[0]],
//     //           [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
//     //       ]
//     //     }
//     //   }

//     // ]
//   });
// };



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

  // render the financial chart using model data
  function renderChart(chartName, xAxisData, yAxisData) {
    // console.log("in home.js.renderChart");
    // Highcharts.setOptions({
    //   // colors: ['#026873']
    //   lang: {
    //     thousandsSep: ',' }
    // });
    Highcharts.chart('chart-container', {
      chart: {
        type: 'area',
        backgroundColor:  null 
        // 'rgba(197, 209, 217, .2'
      },
      // colors: ['#026873'],
      tooltip: {
        valuePrefix: '$'
      },
      title: {
        text: chartName,
        style: { color: chartAxisColor,
            fontWeight: 'bold',
            fontSize: '24px'
          }
        // 'Historic and Estimated Worldwide Population Growth by Region'
      },
      // subtitle: {
      //   text: 'Source: Wikipedia.org'
      // },
      legend: {
        itemStyle: {
          fontWeight: 'bold',
          fontSize: '18px',
        }
      },
      xAxis: {
        // categories: ['15', '16', '17', '18', '19', '20', '21'],
        categories: xAxisData,
        // [15,16,17,18,19,20,21,22],
        tickmarkPlacement: 'on',
        title: {
          enabled: false
          },
        labels: {
          style: {
            color: chartAxisColor
          }
        }
      },
      yAxis: {
        opposite: true,
        title: {
          text: '$ Dollars',
          style: {
            color: chartAxisColor,
            fontWeight: 'bold',
            fontSize: '18px',
          }
        }
        ,
        labels: {
          style: {
            color: chartAxisColor
          }
        }
      },
      tooltip: {
        // formatter: function () {
        //   // The first returned item is the header, subsequent items are the
        //   // points
        // //   return ['<b>' + this.x + '</b>'].concat(
        //       this.points ?
        //           this.points.map(function (point) {
        //               return '$ ' + '<b>{point.y:,}</b>'
        //           }) : []
        //   );
        // },
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
        color: chartGraphColor,
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



    // start demo slide sequence
    demoStartDelay();


  // // render the demo-intro slide 1

 
  // demoXaxisData.push(data36);
  // renderDemo([],[]);

  // demoXaxisData.push(data26);
  // renderDemo([],[]);
  
  // demoXaxisData.push(data16);
  // renderDemo([],[]);

  // // $('#slide-chart').highcharts().redraw();

 
  // function to get clone and return a plan to render for the guest signon
  function getClonePlan() {
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
    
          // update current logged in user information for display on page
          console.log(`user ${JSON.stringify(res)}`) 
          $("#logged-id").text(res.userId);
          $("#logged-user").text(res.userName);
    
          $("tr.model-row").remove();
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
  };

  // initial page load clone plan
  getClonePlan();
 
  function updateChartPut() {
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
  };

  // test button event
  $("#test-btn").on("click",function() {
    console.log("in global.test-btn click event")
    // ajax put call for testing update of model 
    // update financial model (plan and chapters)
    updateChartPut();

    // // plan to update
    // var plan = {
    //   id: $("#grid-caption").attr('data-id'),
    //   plan_name: $("#grid-caption").text(),
    //   PlanUserId: $("#grid-caption").attr('data-user-id'),
    //   PlanTypeId: $("#grid-caption").attr('data-plan-type-id'),
    // };

    // // chapters to update
    // var updatedChapters = [];
    // $("tr.model-row").each(function() {
    //   var chapter = {};
    //   chapterId = $(this).attr('data-id');
    //   Object.assign(chapter,{id: chapterId});
    //   seqNo = $(this).attr('data-seq-no');
    //   Object.assign(chapter,{seq_no: seqNo});
    //   $(this).find("td").each(function() {
    //     if ($(this).data("key")) {
    //       console.log(`the key is:  ${$(this).data("key")}`);
    //       console.log(`CHAPTER-TD element: ${$(this).text()}`);
    //       thing = $(this).data("key");
    //       Object.assign(chapter,{[thing]: $(this).text()});
    //     };
    //   });
    //   investRateTypeId = $(this).attr('data-invest-rate-type-id');
    //   Object.assign(chapter,{InvestRateTypeId: investRateTypeId});
    //   Object.assign(chapter,{PlanId: $("#grid-caption").attr('data-id')});
    //   console.log(`This is the chapter object: ${JSON.stringify(chapter)}`);
    //   updatedChapters.push(chapter);
    // }); 

    // // some changes in lieu of front end data entry being ready
    // // plan.plan_name = "TESTING CHANGE ROUTE 2";
    // // updatedChapters[0].chapter_name = "FUBAR";
    // // updatedChapters[0].start_age = 15;
    // // updatedChapters[0].end_age = 17;
    // // updatedChapters[0].invest_amount = 13.13;
    // // updatedChapters[0].return_pct = 9.9;
    // // updatedChapters[0].inflation_pct = 2.2;
    // // updatedChapters[1].chapter_name = "FOO";
    // // updatedChapters[1].start_age = 18;
    // // updatedChapters[1].end_age = 22;
    // // updatedChapters[1].invest_amount = 21.21;
    // // updatedChapters[1].return_pct = 7.7;
    // // updatedChapters[1].inflation_pct = 1.1;

    // console.log(JSON.stringify(updatedChapters));

    // // add the array of chapters to the request plan arugument
    // Object.assign(plan,{updatedChapters: updatedChapters});

    // console.log(JSON.stringify(plan));

    
 

    // // turn off call while I try to code for the update object content
    // $.ajax("/api/plan-life-chapters", {       
    //     type: "PUT",
    //     data: plan
    //   }).then(function(res) {
    //       var { yearAxis, dollarAxis } = resultPlotsToArray(res.chartResult.resultPlots);
    //       // var financialModelChapters = [];
    //       // console.log(yearAxis);
    //       // console.log(dollarAxis);
    //       console.log(res);

    //       $("#grid-caption").text(res.name);
    //       $("#grid-caption").attr('data-id',`${res.id}`);
    //       $("#grid-caption").attr('data-user-id',`${res.userId}`);
    //       $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`);


    //       $("tr.model-row").remove();
    //       res.lifeChapters.map(chapter => {
    //         console.log(`seq: ${chapter.seqNo} name ${chapter.name} start ${chapter.startYear} end ${chapter.endYear} 
    //                     invest-amt ${chapter.investAmount} invest-rate-type-id: ${chapter.investRateTypeId} frequency: ${chapter.frequency} 
    //                     return-rate ${chapter.returnPct} inflation-rate ${chapter.inflationPct}`);
    //         // var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`).attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
    //         // modelRow.append($(`<td>${chapter.name}</td>`));
    //         // modelRow.append($(`<td>${chapter.startYear}</td>`));
    //         // modelRow.append($(`<td>${chapter.endYear}</td>`));
    //         // modelRow.append($(`<td>${chapter.investAmount}</td>`));
    //         // modelRow.append($(`<td>${chapter.frequency}</td>`));
    //         // modelRow.append($(`<td>${chapter.returnPct}</td>`));
    //         // modelRow.append($(`<td>${chapter.inflationPct}</td>`));
    //         // $("#grid-table").append(modelRow);

    //         var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`);
    //         modelRow.attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
    //         modelRow.attr('data-seq-no',`${chapter.seqNo}`);
    //         modelRow.append($(`<td>${chapter.name}</td>`).attr('data-key','chapter_name').attr('contenteditable','true'));
    //         modelRow.append($(`<td>${chapter.startYear}</td>`).attr('data-key','start_age').attr('contenteditable','true'));
    //         modelRow.append($(`<td>${chapter.endYear}</td>`).attr('data-key','end_age').attr('contenteditable','true'));
    //         modelRow.append($(`<td>${chapter.investAmount}</td>`).attr('data-key','invest_amount').attr('contenteditable','true'));
    //         modelRow.append($(`<td>${chapter.frequency}</td>`));
    //         modelRow.append($(`<td>${chapter.returnPct}</td>`).attr('data-key','return_pct').attr('contenteditable','true'));
    //         modelRow.append($(`<td>${chapter.inflationPct}</td>`).attr('data-key','inflation_pct').attr('contenteditable','true'));
    //         $("#grid-table").append(modelRow);
    //         // // create a chapter for use in financial model object
    //         // financialModelChapters.push(new RenderChapter(chapter.seqNo,chapter.name,chapter.startYear,chapter.endYear,
    //         //   chapter.investAmount,chapter.returnPct,chapter.inflationPct,chapter.investRateTypeId,res.id));
    //       });
    //       // // create financial model object for use client side
    //       // var financialModel = new RenderModel(res.name,res.id,res.userId,financialModelChapters);
    //       // console.log(`renderModel: ${JSON.stringify(financialModel)}`);
    //       renderChart(res.name, yearAxis, dollarAxis);
    //     }
    //   );
  
  });


  // wall paper drop down event
  $(document).on("click", ".dropdown-item.wallpaper", function() {
    console.log("in global.dropdown-item.wallpaper click event");
    console.log("you pressed: " + $(this).data("value"));
    var clickedValue = $(this).data("value");
    console.log("value is: ",clickedValue); 
    $('.dropdown-item.wallpaper.active').removeClass("active");
    $('.dropdown-item.wallpaper[data-value="' + clickedValue +'"]').addClass("active");
    setStyleSheet(`assets/css/${clickedValue}-theme.css`);
    manageLocalStorage.setLocalStorage('wallpaper',clickedValue);
    activeWallpaper = clickedValue;
    setChartColor(activeWallpaper);

    Highcharts.setOptions({
      colors: [chartGraphColor]  //,'#FF0000','#FFFF00','#008000'],
    });
    
    // have to re-render chart to pick up new colors
    updateChartPut();
  
  });

  // login drop down event
  $(document).on("click", ".dropdown-item.signin", function() {

    console.log("in global.dropdown-item.signin click event");
    console.log("you pressed: " + $(this).data("value"));
    var clickedValue = $(this).data("value");
    console.log("value is: ",clickedValue); 
    if (clickedValue === 'login') {
      $('#login-submit').val('Login');
      $('#signup-msg').show();
      $('#login-msg').text("");
      $('#login-form').removeClass('signup');
      $('#login-form').addClass('login');
      $('#user-name').val("");
      $('#password').val("");
      $('#login-modal').modal('show');
    } else if (clickedValue === 'signup') {
      $('#login-submit').val('Signup');
      $('#signup-msg').hide();
      $('#login-msg').text("");
      $('#login-form').removeClass('login');
      $('#login-form').addClass('signup');
      $('#user-name').val("");
      $('#password').val("");
      $('#login-modal').modal('show');
    } else {
      console.log("this is where we logout"); 
      $('#logout-modal').modal('show');

    };
  });

  // jump from login to signup
  $(document).on("click", "#jump-to-signup", function() {
    console.log("in global.jump-to-signup click event");
    $('#login-submit').val('Signup');
    $('#login-form').removeClass('login');
    $('#login-form').addClass('signup');
    $('#login-msg').text("");
    $('#signup-msg').hide();
     // autofocus the bootstrap fade in model - first input field
    $('#user-name').focus();
  });




  // login form submit event
  $(document).on("submit", "form.login", function(event) {
    event.preventDefault();
    console.log("in global.form.login click event");
    console.log("login route goes here");
    console.log(`user is: ${$('#user-name').val()}`);
    console.log(`pswd is: ${$('#password').val()}`);
    var userData = {
      user_name: $('#user-name').val().trim(),
      password: $('#password').val().trim()
    };
    console.log(`userData: ${JSON.stringify(userData)}`);
    if (!userData.user_name || !userData.password) {
      $('#login-msg').text('Please enter both username and password.');
      return
    };

    $.post("/api/login", {
      user_name: userData.user_name,
      password: userData.password
    })
      .then(function(data) {
        console.log(`Login Retured Data is: ${JSON.stringify(data)}`);
        // set the logged in user on the HTML
        $('#logged-user').text(data.user_name);
        $('#logged-user').attr('data-id',data.id)
        $('#logged-id').text(data.id);
        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',data.id);  // change to the logged in user id
        $("#grid-caption").attr('data-plan-type-id',3); // change to plan type 3 (user)
        $("#your-charts").removeClass('disabled');
        // clear form fields
        $('#user-name').val("");
        $('#password').val("");
        $('#login-msg').text("");
        // change the refresh button to save & refresh since a user has signed in
        $('#test-btn').text('Save & Refresh Graph');
        // // turn on the save model button since there is a user now
        // $('#save-btn').show();
        // switch login menu title
        $('#signinDropdown').text('Logout');
        // set the login dropdown menu options
        $('#login-dropdown-menu').empty();
        $('#login-dropdown-menu').append('<a class="dropdown-item signin" data-value="logout" href="#">Logout</a>');
        // hide model
        $('#login-modal').modal('hide');
        return;
      })
      .fail(function(err) {
        console.log(err);
        $('#login-msg').text('Username or Password incorrect.');
        return
      });

    // return;
  });

  // signup from submit event
  $(document).on("submit", "form.signup", function(event) {
    event.preventDefault();
    console.log("in global.form.signup click event");
    console.log("signup route goes here");
    console.log(`user is: ${$('#user-name').val().trim()}`);
    console.log(`pswd is: ${$('#password').val().trim()}`);
    var userData = {
      user_name: $('#user-name').val().trim(),
      password: $('#password').val().trim()
    };
    console.log(`userData: ${JSON.stringify(userData)}`);
    if (!userData.user_name || !userData.password) {
      $('#login-msg').text('Please enter both username and password.');
      return
    };

    $.post("/api/signup", {
      user_name: userData.user_name,
      password: userData.password
    })
      .then(function(data) {
        console.log(`Signup Retured Data is: ${JSON.stringify(data)}`);
        // set the logged in user on the HTML
        $('#logged-user').text(data.user_name);
        $('#logged-user').attr('data-id',data.id)
        $('#logged-id').text(data.id);
        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',data.id);  // change to the logged in user id
        $("#grid-caption").attr('data-plan-type-id',3); // change to plan type 3 (user)
        $("#your-charts").removeClass('disabled');
        // clear form fields
        $('#user-name').val("");
        $('#password').val("");
        $('#login-msg').text("");
        // change the refresh button to save & refresh since a user has signed in
        $('#test-btn').text('Save & Refresh Graph');
        // // turn on the save model button since there is a user now
        // $('#save-btn').show();
        // switch login menu title
        $('#signinDropdown').text('Logout');
        // set the login dropdown menu options
        $('#login-dropdown-menu').empty();
        $('#login-dropdown-menu').append('<a class="dropdown-item signin" data-value="logout" href="#">Logout</a>');
        // hide model
        $('#login-modal').modal('hide');
        return;
      })
      .fail(function(err) {
        console.log(err);
        $('#login-msg').text('Signup error. This Username already exists');
        return
      });

    // return;
  });

  // logout form submit event
  $(document).on("submit", "form.logout", function() {
    console.log("in global.logout click event");
    console.log("logout route goes here");
    $.get("/logout")
      .then(function(data) {
        console.log(`Logout Retured Data is: ${JSON.stringify(data)}`);
        // switch the logged in user to the guest user the HTML
        $('#logged-user').text('guest');
        $('#logged-user').attr('data-id','2')
        $('#logged-id').text('2');
        $("#your-charts").addClass('disabled');

        // MRC** - this is a problem - if you logout the user's model is still
        // in the grid - will need to do a CLONE API call here to get free
        // of the user's past model
        // MRC**

        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',2);  // change to the logged in guest user id
        $("#grid-caption").attr('data-plan-type-id',2); // change to plan type 2 (guest)
        // switch login menu title
        $('#signinDropdown').text('Login');
        // change the refresh button to save & refresh since a user has logged in
        $('#test-btn').text('Refresh Graph');
        // // turn off the save model button since user has logged out
        // $('#save-btn').hide();
        // set the login dropdown menu options
        $('#login-dropdown-menu').empty();
        $('#login-dropdown-menu').append('<a class="dropdown-item signin active" data-value="login" href="#">Login</a>');
        $('#login-dropdown-menu').append('<a class="dropdown-item signin" data-value="signup" href="#">Signup</a>');
        // hide model
        $('#logout-modal').modal('hide');

        // need to clone the demo model since user has logged out and
        // now the user is the guest user
        getClonePlan();

        return;
      })
      .fail(function(err) {
        console.log(err);
        return
      });

    // return;
  });


  // load models button event
  $(document).on("click", "#your-charts", function() {
    // console.log("in global.your-charts click event");
    $('#load-models-modal').modal('show');

    // console.log("you pressed: " + $(this).data("value"));
    // var clickedValue = $(this).data("value");
    // console.log("value is: ",clickedValue); 
    // if (clickedValue === 'login') {
    //   $('#login-submit').val('Login');
    //   $('#signup-msg').show();
    //   $('#login-msg').text("");
    //   $('#login-form').removeClass('signup');
    //   $('#login-form').addClass('login');
    //   $('#user-name').val("");
    //   $('#password').val("");
    //   $('#login-modal').modal('show');
    // } else if (clickedValue === 'signup') {
    //   $('#login-submit').val('Signup');
    //   $('#signup-msg').hide();
    //   $('#login-msg').text("");
    //   $('#login-form').removeClass('login');
    //   $('#login-form').addClass('signup');
    //   $('#user-name').val("");
    //   $('#password').val("");
    //   $('#login-modal').modal('show');
    // } else {
    //   console.log("this is where we logout"); 
    //   $('#logout-modal').modal('show');

    // };
  });

  // autofocus the bootstrap fade in model - first input field
  $("#login-modal").on('shown.bs.modal', function () {
    $(this).find("input:visible:first").focus();
  });

  // carousel slide event
  $('.carousel').on('slide.bs.carousel',function(e){
    var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
    console.log(slideFrom+' => '+slideTo);
    $(`.nav-link[data-slide-to="${slideFrom}"]`).removeClass('active-nav-link');
    $(`.nav-link[data-slide-to="${slideTo}"]`).addClass('active-nav-link');
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

  
});