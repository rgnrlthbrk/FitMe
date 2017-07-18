angular.module('BarUserController', [])
  .controller('BarUserController', [ '$scope', '$state', function ($scope, $state) {
      $state.transitionTo('user.login');
  } ]);