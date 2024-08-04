let counter = 0;
const history = [];

const getCounter = (req, res) => {
  res.json({ counter });
};

const incrementCounter = (req, res) => {
  counter++;
  history.push(Date.now());
  history.splice(0, history.length - 5);        // keep only last 5 timestamps

 
  req.io.emit('counterUpdated', { counter });   // Emit the event to all clients

  res.json({ counter });
};

// For testing
const resetCounter = () => {
  counter = 0;
  history.length = 0;
};

module.exports = {
  getCounter,
  incrementCounter,
  resetCounter,
};
