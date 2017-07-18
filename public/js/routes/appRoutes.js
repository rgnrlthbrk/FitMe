import "./routestImports"

angular.module("appRoutes", [ "routesImports" ])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider
      .otherwise('/user');

    $stateProvider
      .state('home', {
        url        : '/',
        template : '<home-page-directive></home-page-directive>'
      })
      .state('user', {
        url : '/user',
        template : '<bar-user-directive></bar-user-directive>'
      })
      .state('user.login', {
        url      : '/login',
        template : '<login-directive></login-directive>'
      })
      .state('user.registration', {
        url      : '/registration',
        template : '<registration-directive></registration-directive>'
      })
      .state('users', {
        url      : '/users',
        template : '<user-directive></user-directive>'
      });

    $locationProvider
      .html5Mode({
        enabled     : true,
        requireBase : false
      });
  });