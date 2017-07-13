angular.module('UserCtrl', [ 'UserService' ])
  .controller('UserController', [ '$scope', '$http', 'User', function ($scope, $http, User) {
    $scope.tagline = 'Nothing beats a pocket protector!';

    User.get()
      .then(function (response) {
        console.log('OK');
        $scope.lolo = Object.values(response.data);
      }, function (response) {
        console.log('NOT OK');
        return response;
      });

  } ]);

