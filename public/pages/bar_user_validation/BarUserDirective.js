import BarUserTpl from "./BarUserTpl.htm!text";
import "./BarUserController";

angular.module('BarUserDirective', [ 'BarUserController' ])
  .directive('barUserDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = BarUserTpl;
    directive.controller = 'BarUserController';

    return directive;
  });