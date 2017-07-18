angular.module('UserService', [])
  .factory('User', [ '$http', ($http) => {
    return {
      get    : getAllUsers,
      create : createSingleUser,
      remove : removeSingleUser
    };

    function getAllUsers() {

      return $http.get('/users');
    }

    function createSingleUser() {

      return $http.post('/users', {});
    }

    function removeSingleUser(id) {

      return $http.delete('/users/' + id);
    }
  } ]);