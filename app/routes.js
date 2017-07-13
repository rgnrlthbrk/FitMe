var router   = require('express').Router(),
    mainCtrl = require('./controllers/main.controller'),
    userCtrl = require('./controllers/user.controller');

module.exports = router;

router.use((req, res, next) => {
  console.log('====================================================================================');
  console.log('Something is happening!');
  next();
});

router.route('/api/users')
  .post(userCtrl.addUser)
  .get(userCtrl.showUser);

router.get('*', mainCtrl.getAll);
