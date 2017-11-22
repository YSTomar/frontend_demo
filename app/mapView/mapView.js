'use strict';

angular.module('myApp.mapView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mapView', {
    templateUrl: 'mapView/mapView.html',
    controller: 'mapViewCtrl'
  });
}])


.controller('mapViewCtrl', ['$scope', 'NgMap', 'NavigatorGeolocation', 'GeoCoder',
    function ($scope, NgMap, NavigatorGeolocation, GeoCoder) {
        var vm = this;
        NgMap.getMap("map").then(function (map) {
            GeoCoder.geocode({ address: 'Khandwa Road, Indore, India' })
                .then(function (result) {
                    vm.mapCenter = result[0].geometry.location;
                });
            $scope.createTour = function() {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
              draggable: true,
              map: map,
              panel: document.getElementById('directionsList')
            });
        directionsService.route({
          origin: 'Indore',
          destination: 'Bhopal',
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(document.getElementById('directionsList'));
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      })
        }
        });
        
}]);