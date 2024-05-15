module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
    name: {
        type: Sequelize.STRING,
        allowNull: true,  
    },
    shortSortOrder : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    size : {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    price : {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    unit : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tamil_item : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    locationArray: {
      type: Sequelize.ARRAY(Sequelize.STRING), // Assuming locationArray is an array of strings
      allowNull: true,
    }
    });
    return Item;
  };