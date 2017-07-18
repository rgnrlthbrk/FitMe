import "./UserService";

angular.module('UserController', [ 'UserService' ])
  .controller('UserController', [ '$scope', '$http', 'User', function ($scope, $http, User) {
    $scope.tagline = 'Nothing beats a pocket protector!';

    User.get()
      .then(function (response) {
        $scope.lolo = response.data;
      }, function (response) {
        console.log('NOK!!!');
        return response;
      });
  } ]);