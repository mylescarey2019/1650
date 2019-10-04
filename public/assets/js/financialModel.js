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
  // computeResult

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
