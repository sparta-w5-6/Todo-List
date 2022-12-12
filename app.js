const express = require('express');
const app = express();
const { sequelize } = require('./models');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-handler.middleware');

require('dotenv').config();
const port = process.env.PORT || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

const router = require('./routes');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

app.use('/api', router);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

app.listen(port, () => {
  console.log(port, ' server is opened');
});

module.exports = app;
