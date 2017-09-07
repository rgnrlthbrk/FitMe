let router = require('express').Router(),
  routeUtil = require('./utils/route.util'),
  mainCtrl = require('./controllers/main.controller'),
  userCtrl = require('./controllers/userdata.controller'),
  foodCtrl = require('./controllers/foods.controller'),
  authCtrl = require('./controllers/authenticate.controller');

module.exports = router;

let unauthorizedPathsArr = [
  ''
  , '/home'
  , '/login'
  , '/logout'
  , '/registration'
  , '/fitme'
  , '/notfound'
  , '/food'
  //,'/user'
  //,'/user/:username'
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
router.route('/food')
  .post(foodCtrl.addFood);

// mainCtrl
router.route('/fitme')
  .get(mainCtrl.getFitme);

router.route('*')
  .get(mainCtrl.getAll);