module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("plan", {
    plan_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false, freezeTableName: true,  underscored: true});


    // We're saying that a Plan should belong to an PlanUser
    // A Plan can't be created without an PlanUser due to the foreign key constraint
    Plan.associate = function(models) {
      Plan.belongsTo(models.plan_user, {
          foreignKey: {
               allowNull: false
             }
          }),
      Plan.belongsTo(models.plan_type, {
        foreignKey: {
              allowNull: false
            }
      }),
      Plan.hasMany(models.life_chapter, {
        onDelete: "cascade"
      });
    };      

  


  return Plan;
};