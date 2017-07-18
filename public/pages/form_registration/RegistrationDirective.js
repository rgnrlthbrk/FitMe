import LoginTpl from "./RegistrationTpl.htm!text";
import "./RegistrationController";

angular.module('RegistrationDirective', [ 'RegistrationController' ])
  .directive('registrationDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = LoginTpl;
    directive.controller = 'RegistrationController';

    return directive;
  });