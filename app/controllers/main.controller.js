let path = require('path');

module.exports = {
  getAll   : (req, res) => {
    console.log('');
    console.log(__dirname);
    res.sendFile(path.resolve(__dirname + './../../public/index.html'));
  }
};