module.exports = function(sequelize, DataTypes) {
  var PlanUser = sequelize.define("PlanUser", {
    user_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false});

  PlanUser.associate = function(models) {
    models.PlanUser.hasMany(models.Plan, {
      onDelete: "cascade"
    });
  };  

  return PlanUser;
};