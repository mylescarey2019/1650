module.exports = function(sequelize, DataTypes) {
  var InvestRateType = sequelize.define("InvestRateType", {
    invest_type: { type: DataTypes.STRING,
            allowNull: false }
    },{timestamps: false});

  InvestRateType.associate = function(models) {
    InvestRateType.hasMany(models.LifeChapter)
  };  

  return InvestRateType;
};