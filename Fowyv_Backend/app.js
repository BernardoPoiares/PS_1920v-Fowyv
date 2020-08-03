import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);


// set port, listen for requests
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

io.on("connection", (socket) => {
  console.log("a user connected :D");
});