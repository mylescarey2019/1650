// class for a chart result plots
class ChartResult {
  constructor(startYear, endYear,resultPlots) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.resultPlots = resultPlots; // an array of objects with x and y plot values { year:, amount:}
  }

  // methods  
  // get the x values in the plot objects as an array
  xPlotToArray() {
    var xArray = [];
    this.resultPlots.map(plot => {
      xArray.push(plot.year);
    });
    return xArray
  };

  // get the y values in the plot objects as an array
  yPlotToArray() {
    var yArray = [];
    this.resultPlots.map(plot => {
      yArray.push(plot.amount);
    });
    return yArray
  };

};

// module.exports for use in other .js files
module.exports = {
  ChartResult: ChartResult
};
