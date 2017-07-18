import LoginTpl from "./LoginTpl.htm!text";
import "./LoginController";

angular.module('LoginDirective', [ 'LoginController' ])
  .directive('loginDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = LoginTpl;
    directive.controller = 'LoginController';

    return directive;
  });