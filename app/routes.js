let router    = require('express').Router(),
    routeUtil = require('./utils/route.util'),
    mainCtrl  = require('./controllers/main.controller'),
    userCtrl  = require('./controllers/user.controller'),
    authCtrl  = require('./controllers/authenticate.controller');

module.exports = router;

let unauthorizedPathsArr = [
  ''
  ,'/home'
  ,'/login'
  ,'/registration'
];

router.use(routeUtil.unless(unauthorizedPathsArr, authCtrl.verifyToken));

// authCtrl
router.route('/login')
  .post(authCtrl.userLogin);

// userCtrl
router.route('/registration')
  .post(userCtrl.addUser);

router.route('/user')
  .get(userCtrl.showUser);

// mainCtrl
router.route('*')
  .get(mainCtrl.getAll);