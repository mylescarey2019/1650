module.exports = function(sequelize, DataTypes) {
  var LifeChapter = sequelize.define("life_chapter", {
    life_chapter_id: { type: DataTypes.INTEGER,
                   autoIncrement: true,
                   primaryKey: true },
    chapter_name: { type: DataTypes.STRING,
            allowNull: false },
    start_age: { type: DataTypes.SMALLINT,
            allowNull: false },   
    end_age: { type: DataTypes.SMALLINT,
            allowNull: false },
    invest_amount: { type: DataTypes.DECIMAL(7,2),
            allowNull: false},
    invest_rate: { type: DataTypes.SMALLINT,
            allowNull: false},
    return_pct: { type: DataTypes.DECIMAL(3,1),
            allowNull: false},
    inflation_pct: { type: DataTypes.DECIMAL(3,1),
            allowNull: false},


  },{timestamps: false, freezeTableName: true});

  LifeChapter.associate = function(models) {
    LifeChapter.belongsTo(models.plan, {
        foreignKey: {
             allowNull: false
           }
        })

  };  

  return LifeChapter;
};