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

    // compute life chapter balance
    const updateBalance = (chapter) => {
            let periods = 0;
            switch (chapter.frequency) {
              case 'yearly': periods = 1;
                break;
              case 'semi-annually': periods = 2;
                break;
              case 'quarterly': periods = 4;
                break;
              case 'monthly': periods = 12;
                break;    
              default: periods = 1;
                break;
            };
            // compute new balance
            for (let i = 1 ; i <= periods ; i++ ) {
              // add period investment amount and multiply by 100% plus return rate % divided numbers of periods
              balance = (balance + chapter.investAmount) * Math.pow(1 + ((chapter.returnPct / 100) / periods), 1);
            }
          }

    // console.log(`======================================`);
    this.lifeChapters.map(chapter => {
      for (let year = chapter.startYear; year <= chapter.endYear; year++) {
        // console.log(`COMPUTE-Frequency: ${chapter.frequency}`);
        // console.log(`COMPUTE-Years: ${chapter.startYear}   ${chapter.endYear}  ${year} `);
        // console.log(`COMPUTE-Invest-Amt-Pct: ${chapter.investAmount}   ${chapter.returnPct} `);

        updateBalance(chapter);

        // function updateBalance replaced old method below 
        // old method only supported yearly and monthly
        // new method supports monthly, quarterly, semi-annual, yearly
        //
        // if (chapter.frequency === 'yearly') { // peform one yearly calculations
        //   // console.log(`YEAR = ${year}`);
        //   // console.log(`BALANCE: ${balance} INVEST-AMT ${chapter.investAmount} RETURN-RATE ${chapter.returnPct}`);
        //   // console.log(`BAL + INV-AMT: ${balance + chapter.investAmount}`);
        //   // console.log(`POWER: ${Math.pow(1 + (chapter.returnPct / 100), 1)}`);
        //   balance = (balance + chapter.investAmount) * Math.pow(1 + (chapter.returnPct / 100), 1);
        //   // console.log(`NEW BALANCE: ${balance}`);
        // } else { // perform 12 monthly calculations
        //   for (var i = 1 ; i <= 12 ; i++ ) {
        //     // console.log(`YEAR = ${year}  MONTH: ${i}`);
        //     // console.log(`BALANCE: ${balance} INVEST-AMT ${chapter.investAmount} RETURN-RATE ${chapter.returnPct}`);
        //     // console.log(`BAL + INV-AMT: ${balance + chapter.investAmount}`);
        //     // console.log(`POWER: ${Math.pow(1 + ((chapter.returnPct / 100) / 12), 1)}`);
        //     balance = (balance + chapter.investAmount) * Math.pow(1 + ((chapter.returnPct / 100) / 12), 1);
        //     // console.log(`${balance.toFixed(2)}`);
        //   }
        // };
        // // console.log(`${Math.round(balance)}`);

        resultPlots.push({year: year, amount: Math.round(balance) });

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
    // console.log( 5000 * Math.pow( 1 + .05/12, 12 * 10));
    // console.log( p * Math.pow( 1 + ( r / n ), (n * t)   ));

    // will need to add in new investment each compounding period (monthly or annually)
    // result rolls into next compounding period

    // update chartResult
    this.chartResult.startYear = this.lifeChapters[0].startYear;
    this.chartResult.lastYear = this.lifeChapters[this.lifeChapters.length - 1].endYear;
    this.chartResult.resultPlots = resultPlots;
  };

};

// module.exports for use in other .js files
module.exports = {
  FinancialModel: FinancialModel
};
