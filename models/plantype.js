module.exports = function(sequelize, DataTypes) {
  var PlanType = sequelize.define("plan_type", {
    plan_type_id: { type: DataTypes.INTEGER,
                   autoIncrement: true,
                   primaryKey: true },
    type_name: { type: DataTypes.STRING,
          allowNull: false }

  },{timestamps: false, freezeTableName: true});



  PlanType.associate = function(models) {
    PlanType.hasMany(models.plan, {
      onDelete: "cascade"
    });
  };  

  return PlanType;
};