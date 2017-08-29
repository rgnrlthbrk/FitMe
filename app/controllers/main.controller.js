let path = require('path');

module.exports = {
  getAll   : (req, res) => {
    // TODO: Think something clever
    console.log('main.controller');
    res.sendFile(path.resolve(__dirname + './../../dist/index.html'));
  },
  getFitme : (req, res) => {
    res.sendFile(path.resolve(__dirname + './../files/fitme.png'));
  }
};