// class for a financial model year segments (aka life chapters)

class FinancialModel {
  constructor(name, id, userName, userId, planTypeId, lifeChapters, chartResult) {
    this.name = name;
    this.id   = id;
    this.userName = userName;
    this.userId = userId;
    this.planTypeId = planTypeId
    this.lifeChapters = lifeChapters;
    this.chartResult = chartResult;
  }

  // methods  
  // computeFinancialResult
  computeFinancialResult() {
    // temporary calculation to get the infrastructure tested then
    // will code with actual compound interest calculation
    var balance = 0;  // sample = 5000
    var resultPlots = [];
    console.log(`======================================`);
    this.lifeChapters.map(chapter => {
      for (let year = chapter.startYear; year <= chapter.endYear; year++) {
        // console.log(`COMPUTE: ${chapter.frequency}`);
        // console.log(`COMPUTE:   ${chapter.startYear}   ${chapter.endYear}  ${year} `);
        // console.log(`COMPUTE:   ${chapter.investAmount}   ${chapter.returnPct} `);

        if (chapter.frequency === 'yearly') { // peform one yearly calculations
          console.log(`YEAR = ${year}`);
          console.log(`BALANCE: ${balance} INVEST-AMT ${chapter.investAmount} RETURN-RATE ${chapter.returnPct}`);
          console.log(`BAL + INV-AMT: ${balance + chapter.investAmount}`);
          console.log(`POWER: ${Math.pow(1 + (chapter.returnPct / 100), 1)}`);
          balance = (balance + chapter.investAmount) * Math.pow(1 + (chapter.returnPct / 100), 1);
          console.log(`NEW BALANCE: ${balance}`);
        } else { // perform 12 monthly calculations
          for (var i = 1 ; i <= 12 ; i++ ) {
            console.log(`YEAR = ${year}  MONTH: ${i}`);
            console.log(`BALANCE: ${balance} INVEST-AMT ${chapter.investAmount} RETURN-RATE ${chapter.returnPct}`);
            console.log(`BAL + INV-AMT: ${balance + chapter.investAmount}`);
            console.log(`POWER: ${Math.pow(1 + ((chapter.returnPct / 100) / 12), 1)}`);
            balance = (balance + chapter.investAmount) * Math.pow(1 + ((chapter.returnPct / 100) / 12), 1);
            console.log(`NEW BALANCE: ${balance}`);
          }
        };
        // console.log(balance.toFixed(2));
        // var newBalance = balance.toFixed(2);
        // console.log(`balance= ${balance} newBalance= ${newBalance}`);
        resultPlots.push({year: year, amount: Math.round(balance) });

        // forced sample before writing above computation
        // balance += Math.pow(3 * year,2) + year;
        // resultPlots.push({year: year, amount: balance });
      }
    });

    // compound interest formula
    // a = ending value
    // p = starting principal
    // r = decimal interest rate
    // n = time compounded within unit t
    // t = duration of investment
    // A = P ( 1 + r/n ) ^ (12 *10)
    // a = p * ( 1 + r/n) ^ (n * t)
    // a = p * Math.pow(1 + r/n, n * t);

    var a = 0;
    var p = 5000; // principal
    var r = .05; // 5%
    var n = 12; // compound monthly
    var t = 1;  // one year
    console.log( 5000 * Math.pow( 1 + .05/12, 12 * 10));
    console.log( p * Math.pow( 1 + ( r / n ), (n * t)   ));

    // will need to add in new investment each compounding period (monthly or annually)
    // result rolls into next compounding period

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
