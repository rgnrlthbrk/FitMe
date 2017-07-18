import HomePageTpl from "./HomePageTpl.htm!text";
import "./HomePageController";

angular.module('HomePageDirective', [ 'HomePageController' ])
  .directive('homePageDirective', function () {
    let directive = {};

    directive.restrict = 'E';
    directive.template = HomePageTpl;
    directive.controller = 'HomePageController';

    return directive;
  });