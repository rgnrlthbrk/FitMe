import "ngDraggable";
import "bootstrap";
import "angular-ui-router";

import "js/routes/appRoutes";
import "pages/bar_navigation/NavBarDirective"

angular.module("sampleApp", [
  "NavBarDirective",
  "appRoutes"
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, [ "sampleApp" ]);
});