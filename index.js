const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);
const app = express();

require("dotenv").config();

const { MONGO_URL } = require('./src/configs')

mongoose
  .connect(
    MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new mongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 4,
        },
      })
    );

    require("./src/passport/index")(app);
    app.use("/graphql/admin", require("./src/routes/admin.route").router);
    app.use("/graphql/auth", require("./src/routes/auth.route").router);
    app.use("/graphql/user", require("./src/routes/user.route").router);
    app.listen(process.env.PORT, () => {
      console.log(`app started. http://localhost:${process.env.PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err, "something went wrongs");
  });
