
const dotenv = require("dotenv");
dotenv.config({ path: `.env` });
require("./configs/db.connection");
const http         = require("http");
const express      = require("express");
const path         = require("path");
const logger       = require("morgan");
const cors             = require("cors");
const helmet       = require("helmet");
const moment       = require("moment");
const flash        = require("connect-flash");
// const session      = require("express-session");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi    = require("swagger-ui-express");
// const basicAuth    = require('express-basic-auth');

const app          = express();
const port         = process.env.PORT || 3000;
const secret       = process.env.SECRET;
const url          = process.env.URL || "http://localhost";
const swgbaseURL   = process.env.SWIGGERBASEURL || "localhost";
const apiRoutes    = require("./routers/api.router");
// const adminRoutes  = require("./routers/admin.router");
// const socket       = require("./helpers/socket");

// app.use(
//   session({
//     secret: secret,
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.set("port", port);

// const privateKey  = fs.readFileSync('/etc/letsencrypt/live/second-innings.tezcommerce.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/second-innings.tezcommerce.com/fullchain.pem', 'utf8'); //cert.pem
// const ca = fs.readFileSync('/etc/letsencrypt/live/second-innings.tezcommerce.com/cert.pem', 'utf8'); //cert.pem
// const credentials = {key: privateKey,cert:certificate,ca:ca};
// const httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(flash());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.locals.moment = moment;
app.locals.baseurl = `${url}:${port}`;

app.use(logger("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/api', apiRoutes)

const server = http.createServer(app);
// socket(server);

/*-----------------------------------Swagger Start-----------------------------------*/
// const swaggerDefinition = {
//   swagger: "2.0",
//   info: {
//     version: "1.0.0",
//     title: "Second Innings Swagger UI",
//     description: "Second Innings Swagger UI",
//     contact: {
//       email: "susanta.das@bluehorse.com"
//     },
//     license: {
//       name: "Apache 2.0",
//       url: "http://www.apache.org/licenses/LICENSE-2.0.html"
//     },
//   },
//   host: swgbaseURL + ':' + port,
//   basePath: '/api',
//   securityDefinitions: {
//     bearerAuth: {
//       type: 'apiKey',
//       name: 'access_token',
//       scheme: 'bearer',
//       in: 'header',
//     },
//   },
//   security: [{ bearerAuth: [] }],
//   tags: [{
//     name: "CMS",
//     description: "API for CMS in the system"
//   },{
//     name: "Group",
//     description: "API for group in the system"
//   }],
//   schemes: ["http","https"],
// };
// const options = {
//   swaggerDefinition,
//   apis: ["./routers/api/group.router.js","./routers/api/cms.router.js"],
// };
// const specs = swaggerJsdoc(options);
// app.use("/api-docs", basicAuth({users: { 'admin':'admin#321123' }, challenge: true }), swaggerUi.serve, swaggerUi.setup(specs));
/*-----------------------------------Swagger End-----------------------------------*/
server.listen(port, () => {
  console.log(`Server is running on ${app.locals.baseurl}`);
});

/*httpsServer.listen(port, function() {
  console.log('Express server listening on ' + app.locals.baseurl);
});*/