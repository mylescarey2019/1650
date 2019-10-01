module.exports = function(sequelize, DataTypes) {
  var PlanUser = sequelize.define("plan_user", {
    plan_user_id: { type: DataTypes.INTEGER,
                   autoIncrement: true,
                   primaryKey: true },
    user_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false, freezeTableName: true});

  PlanUser.associate = function(models) {
    PlanUser.hasMany(models.plan, {
      onDelete: "cascade"
    });
  };  

  return PlanUser;
};