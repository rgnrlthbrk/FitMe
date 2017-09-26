let router = require('express').Router(),
  routeUtil = require('./utils/route.util'),
  mainCtrl = require('./controllers/main.controller'),
  userCtrl = require('./controllers/userdata.controller'),
  foodCtrl = require('./controllers/fooddata.controller'),
  authCtrl = require('./controllers/authentication.controller');

module.exports = router;

// paths, which need no authorisation
let unauthorizedPathsArr = [
  ''
  , '/home'
  , '/login'
  , '/logout'
  , '/registration'
  , '/fitme'
  , '/img/cutting_board'
  , '/notfound'
  // The routes bellow need token authentication
  //,'/user'
  //,'/user/:username/today'
  //,'/tomorrowMenu'
];

router.use(routeUtil.unless(unauthorizedPathsArr, authCtrl.verifyToken));

// authCtrl
router.route('/login')
  .post(authCtrl.userLogin);

// userCtrl
router.route('/registration')
  .post(userCtrl.addUser);

router.route('/user')
  .get(userCtrl.showUserData);

router.route('/user')
  .post(userCtrl.submitUserData);

router.route('/user')
  .put(userCtrl.editUserData);

// foodCtrl
router.route('/user/:username')
  .get(foodCtrl.getUserDailyMenu);

router.route('/user/:username/today')
  .get(foodCtrl.getUserMenuToday);

router.route('/tomorrowMenu')
  .get(foodCtrl.getUserMenuTomorrow);

router.route('/tomorrowMenu')
  .put(foodCtrl.updateUserMenuTomorrow);

// mainCtrl
router.route('/fitme')
  .get(mainCtrl.getFitme);

router.route('/img/cutting_board')
  .get(mainCtrl.getCuttingBoard);

router.route('*')
  .get(mainCtrl.getAll);