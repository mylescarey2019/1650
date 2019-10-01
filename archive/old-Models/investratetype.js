module.exports = function(sequelize, DataTypes) {
  var InvestRateType = sequelize.define("invest_rate_type", {
    invest_type: { type: DataTypes.STRING,
            allowNull: false }
    },{timestamps: false, freezeTableName: true,  underscored: true});

  InvestRateType.associate = function(models) {
    InvestRateType.hasMany(models.life_chapter)
  };  

  return InvestRateType;
};