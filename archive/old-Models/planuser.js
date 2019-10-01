module.exports = function(sequelize, DataTypes) {
  var PlanUser = sequelize.define("plan_user", {
    user_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false, freezeTableName: true, underscored: true});

  PlanUser.associate = function(models) {
    PlanUser.hasMany(models.plan, {
      onDelete: "cascade"
    });
  };  

  return PlanUser;
};