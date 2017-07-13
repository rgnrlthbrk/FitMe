import "ngDraggable";
import "bootstrap";
import "angular-route";

import "js/routes/appRoutes";

import "js/controllers/_main_ctrl/MainCtrl";
import "js/controllers/user_ctrl/UserCtrl";

import "js/services/UserService";

angular.module("sampleApp", [
  "MainCtrl", "UserCtrl",
  "UserService",
  "appRoutes"
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ "sampleApp" ]);
});