angular.module('MainCtrl', [ 'UserService' ])
  .controller('MainController', [ '$scope', function ($scope) {
    $scope.tagline = 'To the moon and back!';

  } ]);

