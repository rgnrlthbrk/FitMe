import homeTemplate from "../../views/home.htm!text";
import userTemplate from "../../views/user.htm!text";

angular.module("appRoutes", [ "ngRoute" ])
  .config(($routeProvider, $locationProvider) => {
    $routeProvider
      .when('/', {
        template   : homeTemplate,
        controller : 'MainController'
      })
      .when('/users', {
        template   : userTemplate,
        controller : 'UserController'
      });

    $locationProvider.html5Mode({
      enabled     : true,
      requireBase : false
    });
  });