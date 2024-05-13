module.exports = (sequelize, Sequelize) => {
    const Lorry = sequelize.define("lorry", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fc_expiry_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      insurance_expiry_date: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    return Lorry;
  };