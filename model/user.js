module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue : "0123456789",
        allowNull: false
       },
       userType:{
        type:Sequelize.ENUM('Staff', 'Admin'),
        allowNull: false,
        defaultValue:"Admin"
       },
    userFilter: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default : false
    },
    billEdit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default : false
    },
    userLocation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    godown: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    billSeries: {
        type: Sequelize.STRING,
        allowNull: false,
    }
    });
    return User;
  };