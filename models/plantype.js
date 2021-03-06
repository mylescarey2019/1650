module.exports = function(sequelize, DataTypes) {
  var PlanType = sequelize.define("PlanType", {
    type_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false});

  PlanType.associate = function(models) {
    PlanType.hasMany(models.Plan, {
      onDelete: "cascade"
    });
  };  

  return PlanType;
};