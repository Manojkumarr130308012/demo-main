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
      type: Sequelize.TEXT, // Using TEXT type to store JSON string
      allowNull: true,
      get() {
          const value = this.getDataValue('locationArray');
          return value ? JSON.parse(value) : [];
      },
      set(value) {
          this.setDataValue('locationArray', JSON.stringify(value));
      }
  }
    });
    return Item;
  };