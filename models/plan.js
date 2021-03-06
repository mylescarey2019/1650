module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    plan_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false});


    // We're saying that a Plan should belong to an PlanUser
    // A Plan can't be created without an PlanUser due to the foreign key constraint
    Plan.associate = function(models) {
      models.Plan.belongsTo(models.PlanUser, {
          foreignKey: {
               allowNull: false
             }
          }),
      models.Plan.belongsTo(models.PlanType, {
        foreignKey: {
              allowNull: false
            }
      }),
      models.Plan.hasMany(models.LifeChapter, {
        onDelete: "cascade"
      });
    };      

  


  return Plan;
};