let path = require('path');

module.exports = {
  getAll   : (req, res) => {
    console.log('Directory: '+__dirname);
    console.log('Directory: '+__dirname + './../../public/index.html');
    res.sendFile(path.resolve(__dirname + './../../public/index.html'));
  }
};