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

};

// module.exports for use in other .js files
module.exports = {
  LifeChapter: LifeChapter
};
