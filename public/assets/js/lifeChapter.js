// class for a financial model year segments (aka life chapters)
class LifeChapter {
  constructor(id,seqNo, name, startYear, endYear, investAmount, investRateTypeId, frequency,returnPct,inflationPct) {
    this.id = id;
    this.seqNo = seqNo;
    this.name = name;
    this.startYear = startYear;
    this.endYear = endYear;
    this.investAmount = investAmount;
    this.investRateTypeId = investRateTypeId // this is ID for the "frequency" column
    this.frequency = frequency;
    this.returnPct = returnPct;
    this.inflationPct = inflationPct;
  }

  // methods  
  // resequence

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
  LifeChapter: LifeChapter
};
