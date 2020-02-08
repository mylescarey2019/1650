// home page  

//on document load
$(document).ready(function(){

  // hide the new model button and your models buttonuntil user signed in
  $('#new-model-btn').hide();
  $('#your-charts-btn').hide();

  // hide starting demo content
  $(".slide-1-1").hide();
  $("#slide-1-2").hide();
  $("#slide-1-3").hide();
  $("#slide-1-4").hide();
  $("#slide-1-5").hide();

  // // start with the lower section hidden
  // $("#lower-section").hide();


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


  // set chart height
  var chartHeight = 0;
  if ($(window).height() > 850) {
    chartHeight = 400;
  } else {
    chartHeight = 280;
  }

    // set chart scroll
    var chartScroll = 0;
    // console.log(`window height: ${$(window).height()}`);
    if ($(window).height() > 800) {
      chartScroll = 730;
    } else {
      chartScroll = 760;
    }

  // ----------------------------------------------------------
  // object for local storage:
  // ----------------------------------------------------------
  var manageLocalStorage = {
    // local variables:

    // methods:

    // method to clear property from local storage
    clearLocalStorage: function(property) {
      // console.log("in manageLocalStorage.clearLocalStorage");
      localStorage.removeItem(property);
    },

    // method to get property from local storage
    getLocalStorage: function(property) {
      // console.log("in manageLocalStorage.getLocalStorage");
      var propVal = localStorage.getItem(property);
      return propVal;
    },

    // method to set property in local storage
    setLocalStorage: function(property,propVal) {
      // console.log("in manageLocalStorage.setLocalStorage");
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
        break;
      case 'none': {chartGraphColor = '#1F9376',
                       chartAxisColor = '#191919'}
       break;
      // default:  {chartGraphColor = '#1F9376'
      //              chartAxisColor = '#191919'}
        // break;
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
    name: '\u2022\u2022\u2022 Age 36',


    data: [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,125,261,408
      ,567,739,926,1128,1347,1584,1841,2119,2421,2747,3100,3483,3897,4346,4832,5359,5929
      ,6546,7215,7939,8724,9573,10493,11489,12568,13737,15002],
      dashStyle: 'dot', 
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

  // var dataSeries26 =  [
  //   null,null,null,null,null,null,null,null,null,null,125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359
  //   ,5929,6547,7216,7940,8724,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143
  // ];

  // var dataSeries16 = [
  //   125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359,5929,6547,7216,7940,8724
  //   ,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143,38185,41480,45048
  //   ,48912,53097,57629,62538,67854,73611,79846
  // ];

  var data26 = 
  {
    name: '\u2013\u2013\u2013 Age 26',

    data: [
      null,null,null,null,null,null,null,null,null,null,125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359
      ,5929,6547,7216,7940,8724,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143
    ],
    dashStyle: 'dash',
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
    name: ' \u2500\u2500 Age 16',

    data: [
      125,261,408,567,740,926,1129,1348,1585,1842,2120,2421,2747,3101,3483,3898,4347,4833,5359,5929,6547,7216,7940,8724
      ,9574,10494,11490,12569,13737,15003,16374,17858,19465,21206,23092,25134,27345,29740,32334,35143,38185,41480,45048
      ,48912,53097,57629,62538,67854,73611,79846
    ],  
    dashStyle: 'solid',
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
  var demoPreStepDelay = 1500;
  var demoFirstStepDelay = 2000;
  var demoSecondStepDelay = 2000;
  var demoThirdStepDelay = 1000;

  // interval for timers
  var demoStartIntervalId;
  var demoNextStepIntervalId;
  // var demoChart = $('slide-chart').highcharts();

  // start the demo slide delay
  function demoStartDelay() {
    // console.log("in global.demoStartDelay");
    // update timer on page
    demoStartIntervalId = setInterval(preDemoStep, demoStartTimerDelay);
  }

    // pre demo step
    function preDemoStep() {
      // console.log("in global.preDemoStep");
      // alert(" demo start delay of 3 seconds finished");
      clearInterval(demoStartIntervalId);
      $(".slide-1-1").show();
      //  need to reveil 2nd line of content
      demoNextStepIntervalId = setInterval(firstDemoStep, demoPreStepDelay);
    };

  // first demo step
  function firstDemoStep() {
    // console.log("in global.firstDemoStep");
    // alert(" demo start delay of 3 seconds finished");
    clearInterval(demoNextStepIntervalId);
    // demoXaxisData.push(data36);
    $("#slide-1-2").show();
    demoChart.addSeries(data36)
    // demoChart.redraw();

    // renderDemo();
    demoNextStepIntervalId = setInterval(secondDemoStep, demoFirstStepDelay);
  };

  // second demo step
  function secondDemoStep() {
    // console.log("in global.secondtDemoStep");
    // alert(" demo step 1 delay of 5 seconds finished");
    clearInterval(demoNextStepIntervalId);
    // demoXaxisData.push(data26);
    // renderDemo();

    // demoChart.series[0].update(data26);
    // demoChart.redraw();
    $("#slide-1-3").show();
    demoChart.addSeries(data26);
    // demoChart.redraw();
  
    demoNextStepIntervalId = setInterval(thirdDemoStep, demoSecondStepDelay);
  };

  // third demo step
  function thirdDemoStep() {
    // console.log("in global.thirdDemoStep");
    // alert(" demo step 2 delay of 5 seconds finished");
    clearInterval(demoNextStepIntervalId);
    // demoXaxisData.push(data16);
    // renderDemo();

    // demoChart.redraw();
    // demoChart.series[0].update(data16);
    $("#slide-1-4").show();
    demoChart.addSeries(data16);
    // demoChart.redraw();

    demoNextStepIntervalId = setInterval(forthDemoStep, demoThirdStepDelay);

  };

  // forth demo step
  function forthDemoStep() {
    // console.log("in global.thirdDemoStep");
    // alert(" demo step 2 delay of 5 seconds finished");
    clearInterval(demoNextStepIntervalId);
    $("#slide-1-5").show();
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
      text: 'The Power of Compound Interest',
      style: {
        fontWeight: 'bold',
        fontSize: '32px',
      }
      // 'Historic and Estimated Worldwide Population Growth by Region'
    },
    subtitle: {
      text: '$10 per month at 8% historic stock market return - starting at age 36, 26 and 16',
      style: {
        // fontWeight: 'bold',
        fontSize: '14px',
      }
    },
    tooltip: {
      valuePrefix: '$'
    },

    // subtitle: {
    //   text: 'Source: Wikipedia.org'
    // },
    // legend: {
    //   enabled: true,
    //   symbolWidth: 100
      // enabled: true,
      // layout: 'vertical',
      // align: 'right',
      // verticalAlign: 'top',
      // x: 10,
      // y: 100,
      // borderWidth: 0
    // },
    legend: {
      enabled: true,
      itemStyle: {
        fontWeight: 'bold',
        fontSize: '16px',
      },
      symbolHeight: 16,
      symbolWidth: 16,
      symbolRadius: 0
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
  


  // output the chartResult object into x, y arrays
  function resultPlotsToArray(resultPlots) {
    // console.log("in home.js.resultPlotsToArray");
    var xArray = [];
    var yArray = [];
    // console.log(resultPlots);
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
        backgroundColor:  null, 
        height: chartHeight,
        // 'rgba(197, 209, 217, .2'
      },
      credits: {
        enabled: false
      },
      // colors: ['#026873'],
      tooltip: {
        valuePrefix: '$'
      },
      title: {
        text: ' ',
        // text: chartName,
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

  // function to get clone and return a plan to render for the guest signon
  function getClonePlan(plan) {
    // console.log(`CLONE CLIENT-SIDE2 ${JSON.stringify(plan)}`);
    $.ajax(`/api/clone-plan/${plan.id}/${plan.planName}/${plan.userId}/${plan.planTypeId}`, {       // cloning system demo plan 1
      // $.ajax("/api/plan-user-life-chapter/1", {  
        type: "GET"
      }).then(function(res) {
          var { yearAxis, dollarAxis } = resultPlotsToArray(res.chartResult.resultPlots);
          // var financialModelChapters = [];
          // console.log(yearAxis);
          // console.log(dollarAxis);
          // console.log(res);
          // console.log(`plan type id: ${res.planTypeId}`);
          $("#grid-caption").text(res.name);
          $("#grid-caption").attr('data-id',`${res.id}`);
          $("#grid-caption").attr('data-user-id',`${res.userId}`);
          $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`);
    
          // update current logged in user information for display on page
          // console.log(`user ${JSON.stringify(res)}`) 
          $("#logged-id").text(res.userId);
          $("#logged-user").text(res.userName);
          $("#footer-model-id").text(res.id);
    
          $("tr.model-row").remove();
          $("#test-btn").removeAttr('disabled');



          // need to render select box for invest type on each row
          // need to this in here getClonePlan and  renderReturnedPlan
          // <form>
          // <div class="form-group">
          //   <label class="question-label" id="survey-question-1" for="survey-question"></label>
          //   <select class="form-control question" id="question1">
          //     <option value="" selected="selected" hidden="hidden"  >Select answer</option>
          //     <option value="1">monthly</option>
          //     <option value="2">yearly</option>
          //   </select>
          // </div>
          // </form>  

          res.lifeChapters.map(chapter => {
            // console.log(`seq: ${chapter.seqNo} name ${chapter.name} start ${chapter.startYear} end ${chapter.endYear} 
            //              invest-amt ${chapter.investAmount} invest-rate-type-id: ${chapter.investRateTypeId} frequency: ${chapter.frequency} 
            //              return-rate ${chapter.returnPct} inflation-rate ${chapter.inflationPct}`);
            var modelRow = $('<tr>').addClass("model-row").attr('data-id',`${chapter.id}`);

            // build select input for invest frequency
            var freqCell = $(`<select class="form-control invest-type"></select`);
            //console.log(`seq: ${chapter.seqNo} rate: ${chapter.investRateTypeId}`);
            freqCell.append($(`<option value="1" ${(chapter.investRateTypeId === 1 ? 'selected' : '')}>monthly</option>`));
            freqCell.append($(`<option value="2" ${(chapter.investRateTypeId === 2 ? 'selected' : '')}>yearly</option>`));
            freqCell.append($(`<option value="3" ${(chapter.investRateTypeId === 3 ? 'selected' : '')}>semi-annual</option>`));
            freqCell.append($(`<option value="4" ${(chapter.investRateTypeId === 4 ? 'selected' : '')}>quarterly</option>`));

            modelRow.attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
            modelRow.attr('data-seq-no',`${chapter.seqNo}`);

            modelRow.append($(`<td>${chapter.name}</td>`).attr('data-key','chapter_name').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.startYear}</td>`).attr('data-key','start_age').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.endYear}</td>`).attr('data-key','end_age').attr('contenteditable','true'));
            modelRow.append($(`<td>${chapter.investAmount}</td>`).attr('data-key','invest_amount').attr('contenteditable','true'));
            modelRow.append(freqCell);
            //modelRow.append($(`<td>${chapter.frequency}</td>`).attr('data-key','invest_frequency').attr('contenteditable','true'));
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
  var clonePlan = {
    id: 1,   // clone from base model
    planName: 'Your Guest Financial IRA Model',
    userId: 2,  // user is 'guest'
    planTypeId: 2, // type is 'guest'
  };
  // console.log(`CLONE CLIENT-SIDE ${JSON.stringify(clonePlan)}`);
  getClonePlan(clonePlan);

  // call to render return result of plan
  function renderReturnedPlan(res) {
    var { yearAxis, dollarAxis } = resultPlotsToArray(res.chartResult.resultPlots);
    // var financialModelChapters = [];
    // console.log(yearAxis);
    // console.log(dollarAxis);
    // console.log(`UPDATED:: ${JSON.stringify(res)}`);

    $("#grid-caption").text(res.name);
    $("#grid-caption").attr('data-id',`${res.id}`);
    $("#footer-model-id").text(res.id);
    $("#grid-caption").attr('data-user-id',`${res.userId}`);
    $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`);


    $("tr.model-row").remove();
    $("#test-btn").removeAttr('disabled');
    res.lifeChapters.map(chapter => {
      // console.log(`seq: ${chapter.seqNo} name ${chapter.name} start ${chapter.startYear} end ${chapter.endYear} 
      //             invest-amt ${chapter.investAmount} invest-rate-type-id: ${chapter.investRateTypeId} frequency: ${chapter.frequency} 
      //             return-rate ${chapter.returnPct} inflation-rate ${chapter.inflationPct}`);
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
      // build select input for invest frequency
      var freqCell = $(`<select class="form-control invest-type"></select`);
      //console.log(`seq: ${chapter.seqNo} rate: ${chapter.investRateTypeId}`);
      freqCell.append($(`<option value="1" ${(chapter.investRateTypeId === 1 ? 'selected' : '')}>monthly</option>`));
      freqCell.append($(`<option value="2" ${(chapter.investRateTypeId === 2 ? 'selected' : '')}>yearly</option>`));
      freqCell.append($(`<option value="3" ${(chapter.investRateTypeId === 3 ? 'selected' : '')}>semi-annual</option>`));
      freqCell.append($(`<option value="4" ${(chapter.investRateTypeId === 4 ? 'selected' : '')}>quarterly</option>`));

      modelRow.attr('data-invest-rate-type-id',`${chapter.investRateTypeId}`);
      modelRow.attr('data-seq-no',`${chapter.seqNo}`);
      modelRow.append($(`<td>${chapter.name}</td>`).attr('data-key','chapter_name').attr('contenteditable','true'));
      modelRow.append($(`<td>${chapter.startYear}</td>`).attr('data-key','start_age').attr('contenteditable','true'));
      modelRow.append($(`<td>${chapter.endYear}</td>`).attr('data-key','end_age').attr('contenteditable','true'));
      modelRow.append($(`<td>${chapter.investAmount}</td>`).attr('data-key','invest_amount').attr('contenteditable','true'));
      modelRow.append(freqCell);
//      modelRow.append($(`<td>${chapter.frequency}</td>`).attr('data-key','invest_frequency').attr('contenteditable','true'));
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
  };
 
  // call to update plan and then render the return result
  function updateChartPut() {
    // console.log('THIS IS updateChartPut');
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
          // console.log(`the key is:  ${$(this).data("key")}`);
          // console.log(`CHAPTER-TD element: ${$(this).text()}`);
          thing = $(this).data("key");
          Object.assign(chapter,{[thing]: $(this).text()});
        };
      });

      // MRC- trying to ge the selected rate set
      var setInvestRateTypeId = $(this).find("select").val();
      //var selectedRate = rowSelect.val();
      //console.log(`rate id:  ${setInvestRateTypeId}`);
      $(this).attr('data-invest-rate-type-id',setInvestRateTypeId);
      // console.log(`data-invest-rate-type-id: ${$(this).attr('data-invest-rate-type-id')}`)

      // $(".invest-type").each(function() {  
      //   console.log(`Was Selected: ${$(this).val()}`)
      //   var theParentInvestRateId = $(this).parent().data("invest-rate-type-id")
      //   console.log(`theParent invest ${theParentInvestRateId}`)
      // $(".invest-type").each(function() {  
      //   console.log(`Was Selected: ${$(this).val()}`)
      //   var theParentInvestRateId = $(this).parent().data("invest-rate-type-id")
      //   console.log(`theParent invest ${theParentInvestRateId}`)
      // });  
      // MRC- trying to ge the selected rate set

      investRateTypeId = $(this).attr('data-invest-rate-type-id');
      // console.log(`NEW RATE ID: ${investRateTypeId}`)
      Object.assign(chapter,{InvestRateTypeId: investRateTypeId});
      Object.assign(chapter,{PlanId: $("#grid-caption").attr('data-id')});
      // console.log(`This is the chapter object: ${JSON.stringify(chapter)}`);
      updatedChapters.push(chapter);
    }); 

    // console.log(JSON.stringify(updatedChapters));

    // add the array of chapters to the request plan arugument
    Object.assign(plan,{updatedChapters: updatedChapters});

    // console.log(JSON.stringify(plan));

    
  

    // now call API to update and then take the results for rendering
    $.ajax("/api/plan-life-chapters", {       
        type: "PUT",
        data: plan
      }).then(function(res) {

          // now render the chart by calling helper function
          renderReturnedPlan(res);
        }
      );
  };


//   // MRC- update chapter invest rate type id attribute
//   $(document).on("change", ".invest-type", function() {
//     console.log("in global.invest-type change event");
// //    $(".invest-type option:selected").each(function() {
//     $(".invest-type").each(function() {  
//       console.log(`Was Selected: ${$(this).val()}`)
//       var theParentInvestRateId = $(this).parent().data("invest-rate-type-id")
//       console.log(`theParent invest ${theParentInvestRateId}`)
//     });

//   });
  // $(document).on("change", ".invest-type", function(event) {
  //   console.log("in global.invest-type change event");
  //   console.log(`event: ${JSON.stringify(event)}`);
  //  // console.log("you selected: " + $(this).data("value"));
  // });


  // save & refresh model event
  $("#test-btn").on("click",function() {
    // console.log("in global.test-btn click event")
    // ajax put call for refreshing the guest model 
    // update financial model (plan and chapters)
    
    // check the location of the graph so
    // it can be scrolled up or down to be centered
    var chartOffset = $("#lower-section").offset();
    var scrollAmt = $(window).scrollTop();
    // console.log(`chart top offset is: ${chartOffset.top} scroll is ${scrollAmt}`);

    updateChartPut();
  });


  // create new user model event
  $("#new-model-btn").on("click",function() {
    // console.log("in global.new-model-btn click event")
    // ajax put call for creating new user model
    var clonePlan = {
      id: 1, // clone from the base model
      planName: 'Your New Model',
      userId: $("#grid-caption").attr('data-user-id'),    // user is the current user
      planTypeId: 3,  // type is 'user'
    };
    getClonePlan(clonePlan);
  });


  // wall paper drop down change click event
  $(document).on("click", ".dropdown-item.wallpaper", function() {
    // console.log("in global.dropdown-item.wallpaper click event");
    event.preventDefault();  
    // console.log("you pressed: " + $(this).data("value"));
    var clickedValue = $(this).data("value");
    // console.log("value is: ",clickedValue); 
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
  $(document).on("click", ".dropdown-item.signin", function(event) {
    event.preventDefault();  
    // console.log("in global.dropdown-item.signin click event");
    // console.log("you pressed: " + $(this).data("value"));
    var clickedValue = $(this).data("value");
    // console.log("value is: ",clickedValue); 
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
      // console.log("this is where we logout"); 
      $('#logout-modal').modal('show');

    };
  });

  // jump from login to signup
  $(document).on("click", "#jump-to-signup", function() {
    // console.log("in global.jump-to-signup click event");
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
    // console.log("in global.form.login click event");
    // console.log("login route goes here");
    // console.log(`user is: ${$('#user-name').val()}`);
    // console.log(`pswd is: ${$('#password').val()}`);
    var userData = {
      user_name: $('#user-name').val().trim(),
      password: $('#password').val().trim()
    };
    // console.log(`userData: ${JSON.stringify(userData)}`);
    if (!userData.user_name || !userData.password) {
      $('#login-msg').text('Please enter both username and password.');
      return
    };

    $.post("/api/login", {
      user_name: userData.user_name,
      password: userData.password
    })
      .then(function(data) {
        // console.log(`Login Retured Data is: ${JSON.stringify(data)}`);
        // set the logged in user on the HTML
        $('#logged-user').text(data.user_name);
        $('#logged-user').attr('data-id',data.id)
        $('#logged-id').text(data.id);
        
        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',data.id);  // change to the logged in user id
        $("#grid-caption").attr('data-plan-type-id',3); // change to plan type 3 (user)
        $("#footer-user-label").addClass('non-guest-user');
        $("#logged-user").addClass('non-guest-user');
        $('#new-model-btn').show();
        $('#your-charts-btn').show();
        // $("#your-charts").removeClass('disabled');
 
        // clear form fields
        $('#user-name').val("");
        $('#password').val("");
        $('#login-msg').text("");
        // change the refresh button to save & refresh since a user has signed in
        // changed from Save & Refresh to just Save to see if UX is better
        // changed to Refresh Graph
        $('#test-btn').text('Refresh Graph');
        // // turn on the save model button since there is a user now
        // $('#save-btn').show();
        // switch login menu title
        $('#signinDropdown').text('Logout');
        // set the login dropdown menu options
        $('#login-dropdown-menu').empty();
        $('#login-dropdown-menu').append('<a class="dropdown-item signin" data-value="logout" href="#">Logout</a>');
        // hide model
        $('#login-modal').modal('hide');

        // user logged in so clear the guest model and show modal for need to create or load model
        // console.log('logged in so clear the guest model');
        $('#no-current-model-modal').modal('show');
        $("#test-btn").prop("disabled",true);
        $("tr.model-row").remove();  // clear grid
        $("#grid-caption").text(''); // clear model name
        // $("#grid-caption").attr('data-id',`${res.id}`);  // clear model id
        $("#footer-model-id").text(''); // clear footer model id
        // $("#grid-caption").attr('data-user-id',`${res.userId}`);  //clear grid user id
        // $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`); //clear grid plan type

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
    // console.log("in global.form.signup click event");
    // console.log("signup route goes here");
    // console.log(`user is: ${$('#user-name').val().trim()}`);
    // console.log(`pswd is: ${$('#password').val().trim()}`);
    var userData = {
      user_name: $('#user-name').val().trim(),
      password: $('#password').val().trim()
    };
    // console.log(`userData: ${JSON.stringify(userData)}`);
    if (!userData.user_name || !userData.password) {
      $('#login-msg').text('Please enter both username and password.');
      return
    };

    $.post("/api/signup", {
      user_name: userData.user_name,
      password: userData.password
    })
      .then(function(data) {
        // console.log(`Signup Retured Data is: ${JSON.stringify(data)}`);
        // set the logged in user on the HTML
        $('#logged-user').text(data.user_name);
        $('#logged-user').attr('data-id',data.id)
        $('#logged-id').text(data.id);
        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',data.id);  // change to the logged in user id
        $("#grid-caption").attr('data-plan-type-id',3); // change to plan type 3 (user)
        $("#footer-user-label").addClass('non-guest-user');
        $("#logged-user").addClass('non-guest-user');
        $('#new-model-btn').show();
        $('#your-charts-btn').show();
        // $("#your-charts").removeClass('disabled');
        // clear form fields
        $('#user-name').val("");
        $('#password').val("");
        $('#login-msg').text("");
        // change the refresh button to save & refresh since a user has signed in
        // changed from Save & Refresh to just Save to see if UX is better
        $('#test-btn').text('Refresh Graph');
        // // turn on the save model button since there is a user now
        // $('#save-btn').show();
        // switch login menu title
        $('#signinDropdown').text('Logout');
        // set the login dropdown menu options
        $('#login-dropdown-menu').empty();
        $('#login-dropdown-menu').append('<a class="dropdown-item signin" data-value="logout" href="#">Logout</a>');
        // hide model
        $('#login-modal').modal('hide');

        // user logged in so clear the guest model and show modal for need to create or load model
        // console.log('logged in so clear the guest model');
        $('#no-current-model-modal').modal('show');
        $("#test-btn").prop("disabled",true);
        $("tr.model-row").remove();  // clear grid
        $("#grid-caption").text(''); // clear model name
        // $("#grid-caption").attr('data-id',`${res.id}`);  // clear model id
        $("#footer-model-id").text(''); // clear footer model id
        // $("#grid-caption").attr('data-user-id',`${res.userId}`);  //clear grid user id
        // $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`); //clear grid plan type
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
  $(document).on("submit", "form.logout", function(event) {
    event.preventDefault();  
    // console.log("in global.logout click event");
    // console.log("logout route goes here");
    $.get("/logout")
      .then(function(data) {
        // console.log(`Logout Retured Data is: ${JSON.stringify(data)}`);
        // switch the logged in user to the guest user the HTML
        $('#logged-user').text('guest');
        $('#logged-user').attr('data-id','2')
        $('#logged-id').text('2');
        $('#new-model-btn').hide();
        $('#your-charts-btn').hide();
        // $("#your-charts").addClass('disabled');

        // MRC** - this is a problem - if you logout the user's model is still
        // in the grid - will need to do a CLONE API call here to get free
        // of the user's past model
        // MRC**

        // set the logged in user on the grid attributes for the next refresh
        $("#grid-caption").attr('data-user-id',2);  // change to the logged in guest user id
        $("#grid-caption").attr('data-plan-type-id',2); // change to plan type 2 (guest)
        $("#footer-user-label").removeClass('non-guest-user');
        $("#logged-user").removeClass('non-guest-user');
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
        var clonePlan = {
          id: 1,  // clone from base model
          planName: 'Your Guest Financial IRA Model',
          userId: 2, // user is 'guest'
          planTypeId: 2,  // type is 'guest'
        };
        getClonePlan(clonePlan);

        return;
      })
      .fail(function(err) {
        console.log(err);
        return
      });

    // return;
  });


  // load models button event
  $(document).on("click", "#your-charts-btn", function(event) {
    // console.log("in global.your-charts click event");
    event.preventDefault();  

    $.ajax(`/api/plan-user-plans/${$("#grid-caption").attr('data-user-id')}`, {     
        type: "GET"
      }).then(function(res) {
          // console.log(`MODELS RETURNED: ${JSON.stringify(res)}`);
          // console.log(res[0].user_name);
          // console.log(res[0].Plans);

        // remove any modal model rows from previous opens - test
        $("tr.modal-model-row").remove();

        if (res[0].Plans.length === 0) {
          $("#load-models-msg").text('You currently have no models to load');
          $("#delete-models").prop("disabled",true);
        } else {
          $("#delete-models").removeAttr('disabled');
          $("#load-models-msg").text('Click on a model name to load it');
          res[0].Plans.map(plan => {
            // console.log(`user name: ${res[0].user_name}  plan_name ${plan.plan_name} plan id: ${plan.id}`);
            var modelRow = $('<tr>').addClass("modal-model-row");
            modelRow.append($(`<td><input class="model-list-checkbox" type="checkbox" name="delete" value="${plan.id}"></td>`));
            modelRow.append($(`<td>${res[0].user_name}</td>`));
            modelRow.append($(`<td class="model-plan-item">${plan.plan_name}</td>`).attr('data-id',`${plan.id}`));
            modelRow.append($(`<td>${plan.id}</td>`));
            $("#model-table").append(modelRow);
          });
        };
      });

    $('#load-models-modal').modal('show'); 
  });



  //  model modal plan name click event for loading a users plan
  $(document).on("click", ".model-plan-item", function() {
    // console.log("in global.model-plan-item click event");
    // console.log("you pressed " + $(this).attr("data-id"));

    // get model that was clicked and render 
    $.ajax(`/api/plan-user-life-chapter/${$(this).attr("data-id")}`, {     
      type: "GET"
    }).then(function(res) {
        // console.log(`MODEL RETURNED: ${JSON.stringify(res)}`);

      // render the returned result
      renderReturnedPlan(res);
    });

    // close load modal
    $('#load-models-modal').modal('hide');
    // // scroll to model
    // window.scroll({
    //   top: 720,
    //   left: 0,
    //   behavior: "smooth"
    // });
  });

  //  model modal plan name click event for deleting a users plan
  $(document).on("click", "#delete-models", function() {
    var planIds = [];
    $('.model-list-checkbox:checked').each(function () {
      // console.log("this item was checked: ", this.value);
      planIds.push(this.value);
    });
    // console.log(`ID Array: ${planIds} `);

    var plan = {
      planIds: planIds
    };

    // console.log(plan);

    // now call API to update and then take the results for rendering
    $.ajax("/api/multi-plan", {       
      type: "DELETE",
      data: plan
    }).then(function(res) {
        // console.log(res);
        // // now render the chart by calling helper function
        // renderReturnedPlan(res);
      }
    );
  
    // close load modal
    $('#load-models-modal').modal('hide');
    
    if (planIds.indexOf($("#grid-caption").attr('data-id')) !== -1) {
      // console.log('Deleted the current model');
      $('#no-current-model-modal').modal('show');
      $("#test-btn").prop("disabled",true);
      $("tr.model-row").remove();  // clear grid
      $("#grid-caption").text(''); // clear model name
      // $("#grid-caption").attr('data-id',`${res.id}`);  // clear model id
      $("#footer-model-id").text(''); // clear footer model id
      // $("#grid-caption").attr('data-user-id',`${res.userId}`);  //clear grid user id
      // $("#grid-caption").attr('data-plan-type-id',`${res.planTypeId}`); //clear grid plan type

    } else {
      // console.log('Current model not deleted');
    }
    // NEXT STEPS - SPRINT
    // X. if current model was deleted then throw up a modal telling user
    //    that they need to create a new model or load an existing model to keep modeling
    // 2. if current model was deleted then
    //        A)  disable the Save-Refresh-Model button
    //        B)  clear the rendered chart - not sure how to do that yet
    //        C)  clear the model table with JQuery
    //        D)  clear the diagnostic portions values hidden in the footer.
    //        E)  add an enable of Save-Refresh-Model button to whenever it is freshly rendered
    
  });

 //  nav-link - force scroll to top
 $(document).on("click", ".slide-nav, #top-btn", function() {
  //  $("#main-section").fadeIn();
   window.scroll({
     top: 0,
     left: 0,
     behavior: "smooth"
   });
 });
  

 //  model tool - force scroll to bottom
 $(document).on("click", "#model-tool, #down-btn", function() {
  //  $("#main-section").fadeIn();
   window.scroll({
     top: chartScroll,
     left: 0,
     behavior: "smooth"
   });
 });

  //  ask user to load model - modal close  force scroll to bottom
  $("#no-current-model-modal").on("hide.bs.modal", function() {
    //  $("#main-section").fadeIn();
     window.scroll({
       top: chartScroll,
       left: 0,
       behavior: "smooth"
     });
   });

 //  brand-link, help-btn  - force scroll to top
 $(document).on("click", "#brand-logo,#help-btn", function() {
  //  $("#main-section").fadeIn();
   window.scroll({
     top: 0,
     left: 0,
     behavior: "smooth"
   });
 }); 

 //  diagnostic model info - toggle visibilty
 $(document).on("click", "#footer-id-label", function() {
  //  console.log('DIAG: clicked');
   if ($("#footer-id-label").hasClass('diagnostic-show')) {
    //  console.log('DIAG: has SHOW');
    $(".diagnostic").removeClass('diagnostic-show');
    $(".diagnostic").addClass('diagnostic-hide');
   } else {
    // console.log('DIAG: has HIDE');
    $(".diagnostic").removeClass('diagnostic-hide');
    $(".diagnostic").addClass('diagnostic-show');
   }
 }); 


  // autofocus the bootstrap fade in model - first input field
  $("#login-modal").on('shown.bs.modal', function () {
    $(this).find("input:visible:first").focus();
  });

  // carousel slide event
  $('.carousel').on('slide.bs.carousel',function(e){
    var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
    // console.log(slideFrom+' => '+slideTo);
    $(`.nav-link[data-slide-to="${slideFrom}"]`).removeClass('active-nav-link');
    $(`.nav-link[data-slide-to="${slideTo}"]`).addClass('active-nav-link');
  });


  // toggle upper section on/off when users scrolls up/down
  window.onscroll = function() {hideDiv()};

  function hideDiv() {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 20) {
      $("#main-section, #down-btn").fadeOut();
      // $("#down-btn").fadeOut();
    } 
    else if (document.documentElement.scrollTop <= 20) {
      $("#main-section,#down-btn").fadeIn();
      // $("#down-btn").fadeIn();
    }
  };



  
});