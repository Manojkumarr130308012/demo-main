const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.js")(sequelize, Sequelize);
db.lorry = require("../model/lorry.js")(sequelize, Sequelize);
db.driver = require("../model/driver.js")(sequelize, Sequelize);
db.location = require("../model/location.js")(sequelize, Sequelize);
db.receiver_location = require("../model/receiver_location.js")(sequelize, Sequelize);
db.sender_location = require("../model/sender_location.js")(sequelize, Sequelize);
db.item = require("../model/item.js")(sequelize, Sequelize);
db.billing = require("../model/billing.js")(sequelize, Sequelize);
db.billingHistory = require("../model/billing_history.js")(sequelize, Sequelize);


module.exports = db;
