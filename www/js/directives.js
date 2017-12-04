angular.module('app.directives', [])
.directive('twoBtnHeaderBar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/two-btn-header-bar.html',
      scope: {
        leftbtnname: "@",
        leftbtnicon: "@",
        rightbtnname: "@",
        rightbtnicon: "@",
      }
    }
})
