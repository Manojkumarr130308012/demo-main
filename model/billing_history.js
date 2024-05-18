module.exports = (sequelize, Sequelize) => {
    const BillingHistory = sequelize.define("billing_history", {
    bill: {
        type: Sequelize.STRING,
        allowNull: true,  
    },
    billSeries: {
        type: Sequelize.STRING,
        allowNull: true,  
    },
    date : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    time : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    godown : {
        type: Sequelize.STRING,
        allowNull: true,
      },
    hint : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    is_dlivery : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lc_charge : {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    locationShort : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    locationAddress : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    receiverName : {
      type: Sequelize.STRING,
      allowNull: true,
    },
    receiverPhone : {
        type: Sequelize.STRING,
        defaultValue : "0123456789",
        allowNull: true,
    },
    receiverAddress : {
        type: Sequelize.STRING,
        allowNull: true,
     },
    senderName : {
        type: Sequelize.STRING,
        allowNull: true,
      },
    senderPhone : {
          type: Sequelize.STRING,
          defaultValue : "0123456789",
          allowNull: true,
      },
    status : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userName : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      action : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    totalQty : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    total : {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    itemsArray: {
      type: Sequelize.TEXT, // Using TEXT type to store JSON string
      allowNull: true,
      get() {
          const value = this.getDataValue('itemsArray');
          return value ? JSON.parse(value) : [];
      },
      set(value) {
          this.setDataValue('itemsArray', JSON.stringify(value));
      }
  }
    });
    return BillingHistory;
  };