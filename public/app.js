import "ngDraggable";
import "bootstrap";
import "angular-ui-router";

import "js/routes/appRoutes";

angular.module("sampleApp", [
  //"MainController", "UserController", "LogicController",
  //"UserService",
  "appRoutes"
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ "sampleApp" ]);
});