// class for a chart result plots
class ChartResult {
  constructor(startYear, endYear,resultPlots) {
    this.startYear = startYear;
    this.endYear = endYear;
    this.resultPlots = resultPlots; // an array of objects with x and y plot values
  }

  // methods  
  // xPlotToArray

  // yPlotToArray

//   computeCompatibility(candidateAnswers) {
//     // compare this.answers to candidateAnswers to compute compatiblity rating
//     // candidateAnswers is in the form of Student.answers - an array of 10 valus 1 to 5
//     // compute absolute difference of each and sum
//     this.answers.map((answer,i) => {
//       this.compatibility += Math.abs(answer - candidateAnswers[i]);
//     })
//   };

};

// module.exports for use in other .js files
module.exports = {
  ChartResult: ChartResult
};
