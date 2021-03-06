module.exports = function(sequelize, DataTypes) {
  var LifeChapter = sequelize.define("LifeChapter", {
    seq_no: { type: DataTypes.SMALLINT,
      allowNull: false },   
    chapter_name: { type: DataTypes.STRING,
            allowNull: false },
    start_age: { type: DataTypes.SMALLINT,
            allowNull: false },   
    end_age: { type: DataTypes.SMALLINT,
            allowNull: false },
    invest_amount: { type: DataTypes.DECIMAL(7,2),
            allowNull: false},
    return_pct: { type: DataTypes.DECIMAL(3,1),
            allowNull: false},
    inflation_pct: { type: DataTypes.DECIMAL(3,1),
            allowNull: false}
  },{timestamps: false});

  LifeChapter.associate = function(models) {
    LifeChapter.belongsTo(models.Plan, {
        foreignKey: {
             allowNull: false
           }
        }),
    LifeChapter.belongsTo(models.InvestRateType, {
        foreignKey: {
              allowNull: false
            }
        });
  };  

  return LifeChapter;
};