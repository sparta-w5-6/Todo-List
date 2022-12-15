import * as Express from 'express';
import { createServer } from 'http';
import * as dotEnv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { NotificationController } from './controllers/notification.controller';

dotEnv.config();

const router = require('./routes');
const { sequelize } = require('./models');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-handler.middleware');

export const app = Express();

const port = Number(process.env.PORT) || 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err: unknown) => {
    console.error(err);
  });

app.use(cookieParser());
app.use(Express.json());

app.use('/api', router);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

const appServer = createServer(app);

new NotificationController().init(appServer);

appServer.listen(port, () => {
  console.log(port, 'server is opened');
});