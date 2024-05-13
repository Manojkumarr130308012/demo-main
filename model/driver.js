module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define("driver", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    licence_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    batch_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lorry_id: {
      type: Sequelize.INTEGER,
      allowNull: false
     }
  });
  return Driver;
};