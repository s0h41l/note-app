const models = require(".");
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: models.User,
          key: "id",
        },
      },
    },
    {
      tableName: "notes",
    }
  );

  return Note;
};
