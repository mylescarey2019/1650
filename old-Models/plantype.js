module.exports = function(sequelize, DataTypes) {
  var PlanType = sequelize.define("plan_type", {
    type_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false, freezeTableName: true, underscored: true});

  PlanType.associate = function(models) {
    PlanType.hasMany(models.plan, {
      onDelete: "cascade"
    });
  };  

  return PlanType;
};