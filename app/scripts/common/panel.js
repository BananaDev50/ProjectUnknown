'use strict';
angular.module('app.common')

.directive('corePanel', function($compile, $timeout, $templateCache, $controller, $rootScope) {
  return {
    restrict: 'E',
    transclude: true,
    //template: '',
    templateUrl: _templateBase + '/common/panel.html',
    controllerAs: 'ctrl',
    controller: function($element, $scope, $timeout) {
      var timeout, vm;
      vm = this;
      vm.panes = {};
      vm.templates = {};
      vm.currentPane = null;
      vm.lastPane = null;
      vm.select = function(pane) {
        var element;
        if (vm.currentPane) {
          element = vm.currentPane.element;
          element.css('display', 'none');
          vm.currentPane.selected = false;
          vm.lastPane = vm.currentPane;
        }
        pane.selected = true;
        vm.currentPane = pane;
        element = pane.element;
        element.css('display', 'block');
      };
      timeout = null;
      vm.addPane = function(pane) {
        var paneElement, templateCtrl, templateScope;
        if (pane.selected === 'true') {
          vm.currentPane = pane;
        }
        if (timeout) {
          $timeout.cancel;
        }
        timeout = $timeout(function() {
          return $scope.loaded = true;
        }, 2000);
        vm.panes[pane.title] = pane;
        if (!vm.templates[pane.title]) {
          paneElement = angular.element('<pt-content pt-lazy-container="' + pane.title + '" pt-lazy-scroll style="overflow: auto; display: none;"></pt-content>');
          paneElement.append($templateCache.get(pane.src));
          vm.templates[pane.src] = $compile(paneElement);
        }
        templateScope = $rootScope.$new();
        templateScope.type = pane.title;
        templateCtrl = $controller(pane.ctrl + 'Controller as ' + pane.ctrl, {
          $scope: templateScope
        });
        vm.templates[pane.src](templateScope, function(clone) {
          clone.data('$ngControllerController', templateCtrl);
          vm.panes[pane.title].element = clone;
          $element.append(clone);
          if (pane.selected === 'true') {
            return clone.css('display', 'block');
          } else {
            return clone.css('display', 'none');
          }
        });
      };
    }
  };
})
.directive('corePane', function($parse) {
  return {
    require: '^corePanel',
    restrict: 'E',
    scope: {},
    link: function(scope, element, attrs, panelCtrl) {
      return panelCtrl.addPane(attrs);
    }
  };
});