let path = require('path');

module.exports = {
  getAll   : (req, res) => {
    res.sendFile(path.resolve(__dirname + './../../public/index.html'));
  }
};