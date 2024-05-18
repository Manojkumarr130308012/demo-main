const express = require('express');
const app = express();

const config=require('./config/config.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const {verifyTokenAndAuthorization} =  require('./middleware/verifyToken.js');


const db = require("./middleware/middleware.js");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


  const userRouter = require('./router/user.js');
  const authRouter = require('./router/auth.js');
  const lorryRouter = require('./router/lorry.js');
  const driverRouter = require('./router/driver.js');
  const locationRouter = require('./router/location.js');
  const receiverLocationRouter = require('./router/receiver_location.js');
  const senderLocationRouter = require('./router/sender_location.js');
  const itemRouter = require('./router/item.js');
  const billRouter = require('./router/billing.js');
  const billingHistoryRouter = require('./router/billing_history.js');



  app.use("/auth", authRouter);
  app.use("/user",verifyTokenAndAuthorization, userRouter);
  app.use("/lorry",verifyTokenAndAuthorization, lorryRouter);
  app.use("/driver",verifyTokenAndAuthorization, driverRouter);
  app.use("/location",verifyTokenAndAuthorization, locationRouter);
  app.use("/receiverLocation",verifyTokenAndAuthorization, receiverLocationRouter);
  app.use("/senderLocation",verifyTokenAndAuthorization, senderLocationRouter);
  app.use("/item",verifyTokenAndAuthorization, itemRouter);
  app.use("/billing",verifyTokenAndAuthorization, billRouter);
  app.use("/billingHistory",verifyTokenAndAuthorization, billingHistoryRouter);



app.listen(config.PORT, () => console.log(`url-shortener listening on port ${config.PORT}!`));