import NavBarTpl from "./NavBarTpl.htm!text";

angular.module('NavBarDirective', [])
  .directive('navBarDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = NavBarTpl;

    return directive;
  });