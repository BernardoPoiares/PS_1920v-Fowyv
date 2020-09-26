import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {authUserWebSocket} from './webSockets/middlewares/authUserWebSocket'
import {initializeSocketConnection} from './webSockets/clientSocket'

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/search.routes')(app);
require('./routes/interactions.routes')(app);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

const server = require("http").createServer(app);
const io = require("socket.io").listen(server,{
  pingTimeout: 60000,
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//io.use(authUserWebSocket);
io.use(authUserWebSocket);


io.on("connection", (socket) => {
  initializeSocketConnection(socket);
});

