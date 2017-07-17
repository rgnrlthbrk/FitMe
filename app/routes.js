var router   = require('express').Router(),
    mainCtrl = require('./controllers/main.controller'),
    userCtrl = require('./controllers/user.controller'),
    authCtrl = require('./controllers/authenticate.controller');

module.exports = router;

router.use((req, res, next) => {
  next();
});

router.use(authCtrl.verifyToken);

router.route('/api/authenticate')
  .post(authCtrl.userAthenticate);

router.route('/login')
  .post(userCtrl.addUser);

router.route('/api/users')
  .get(userCtrl.showUser);

router.get('*', mainCtrl.getAll);
