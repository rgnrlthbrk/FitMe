let router    = require('express').Router(),
    routeUtil = require('./utils/route.util'),
    mainCtrl  = require('./controllers/main.controller'),
    userCtrl  = require('./controllers/user.controller'),
    authCtrl  = require('./controllers/authenticate.controller');

module.exports = router;

let unauthorizedPathsArr = [
  '/login',
  '/users'
];

router.use(routeUtil.unless(unauthorizedPathsArr, authCtrl.verifyToken));

router.route('/api/authenticate')
  .post(userCtrl.addUser);

router.route('/login')
  .post(authCtrl.userLogin);

router.route('/users')
  .get(userCtrl.showUser);

router.route('*')
  .get(mainCtrl.getAll);