angular.module('UserService', [])
  .factory('User', [ '$http', ($http) => {
    return {
      get    : getAllUsers,
      create : createSingleUser,
      remove : removeSingleUser
    };

    function getAllUsers() {

      return $http.get('/api/users');
    }

    function createSingleUser() {

      return $http.post('/api/users', {});
    }

    function removeSingleUser(id) {

      return $http.delete('/api/users/' + id);
    }
  } ]);
