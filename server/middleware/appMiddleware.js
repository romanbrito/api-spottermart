import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import override from 'method-override';

// setup global middleware here

const middleware = app => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(bodyParser.json());
  app.use(cors()); //enable cors to share resource a cross different origins
  // or manually cors:
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin", X-Requested-With, Content-Type, Accept, Authorization");
  //   next();
  app.use(override());
};

export default middleware;