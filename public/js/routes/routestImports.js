import "../../pages/home_page/HomePageDirective";
import "../../pages/user/UserDirective";
import "../../pages/form_login/LoginDirective";
import "../../pages/form_registration/RegistrationDirective";
import "../../pages/bar_user_validation/BarUserDirective";

angular.module("routesImports", [ "ui.router",
  "HomePageDirective",
  "UserDirective",
  "LoginDirective", "RegistrationDirective",
  "BarUserDirective"
]);