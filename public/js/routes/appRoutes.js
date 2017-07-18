import homeTemplate from "../../views/home.htm!text";
import loginTemplate from "../../views/home.htm!text";
//import loginTemplate from "../../views/login.htm!text";
import userTemplate from "../../views/user.htm!text";

import "../controllers/_main/MainController";
import "../controllers/login/LoginController";
import "../controllers/user/UserController";

angular.module("appRoutes", [ "ui.router", "LoginController", "MainController", "UserController" ])
  .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
      .state('Home', {
        url        : '/',
        template   : homeTemplate,
        controller : 'MainController'
      })
      .state('Login', {
        url        : '/login',
        template   : loginTemplate,
        controller : 'LoginController'
      })
      .state('Users', {
        url        : '/users',
        template   : userTemplate,
        controller : 'UserController'
      });

    $urlRouterProvider
      .otherwise('/login');

    $locationProvider
      .html5Mode({
        enabled     : true,
        requireBase : false
      });
  });