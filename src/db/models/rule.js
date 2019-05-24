'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicId: {
     type: DataTypes.INTEGER,
     references: {
       model: "Topics",
       key: "id",
       as: "topicId",
     }
   }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicId"
    });
  };
  return Rule;
};
