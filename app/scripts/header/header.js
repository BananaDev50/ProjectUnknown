'use strict'
const remote = require('remote');

angular.module('app.header', [])

.directive('coreHeader', () => {
    return {
        restrict: 'E',
        templateUrl: _templateBase + '/common/panel.html',
        controller: 'coreHeaderCtrl as title'
    }
})
.controller('coreHeaderCtrl', ($scope, $rootScope, titleButtons, /*AdvSettings,*/ $location) => {
  let vm = this;

  vm.platform = process.platform;
  vm.buttons = titleButtons[process.platform];
  vm.name = "ProjectUnknown"; //AdvSettings.get('branding').name

  vm.max = () => {
    window = remote.getCurrentWindow()
    if (window.isFullScreen()) {
      vm.fullscreen();
    } else {
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    }
  }

  vm.min = () => {
    window = remote.getCurrentWindow();
    window.minimize();
  }
  
  vm.close = () => {
    window = remote.getCurrentWindow();
    window.close();
  }

  vm.fullscreen = () => {
    window.setFullScreen(vm.state.fullscreen);
  }

  return;
});