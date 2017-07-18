import UserTpl from "./UserTpl.htm!text";
import "./UserController";

angular.module('UserDirective', [ 'UserController' ])
  .directive('userDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = UserTpl;
    directive.controller = 'UserController';

    return directive;
  });