const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const counterRouter = require('./routes/counter');
const { initSocket } = require('./socket');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:8080",  // Allows requests from the Vue frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());              


app.use((req, res, next) => { 
  req.io = io;              
  next();
});

app.use('/counter', counterRouter);

initSocket(io);              

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
