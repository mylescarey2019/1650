// class for a financial model year segments (aka life chapters)

class FinancialModel {
  constructor(name, userName, userId, lifeChapters, chartResult) {
    this.name = name;
    this.userName = userName;
    this.userId = userId;
    this.lifeChapters = lifeChapters;
    this.chartResult = chartResult;
  }

  // methods  
  // computeFinancialResult
  computeFinancialResult() {
    // temporary calculation to get the infrastructure tested then
    // will code with actual compound interest calculation
    var balance = 1000;
    var resultPlots = [];
    this.lifeChapters.map(chapter => {
      for (let year = chapter.startYear; year <= chapter.endYear; year++) {
        // Math.random() * (max - min) + min
        balance += Math.round(500 * Math.random() * (15 - 5) + 5);
        resultPlots.push({year: year, amount: balance });
      }
    });

    // update chartResult
    this.chartResult.startYear = this.lifeChapters[0].startYear;
    this.chartResult.lastYear = this.lifeChapters[this.lifeChapters.length - 1].endYear;
    this.chartResult.resultPlots = resultPlots;
  };


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
  FinancialModel: FinancialModel
};
