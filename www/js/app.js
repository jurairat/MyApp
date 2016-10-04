// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state('map',{
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapController'
  });
$urlRouterProvider.otherwise("/"); 
});


/*app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
    var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
  var infoWindow = new google.maps.InfoWindow({
      content: "Here I am!"
  });
 
  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
});


  }, function(error){
    console.log("Could not get location");
  });
});*/

var cities = [
    {
        city : 'Location 1',
        desc : 'Test',
        lat : 7.5718801,
        long : 99.6194701 
    },
    {
        city : 'Location 2',
        desc : 'Test',
        lat : 7.56722518,
        long : 99.62179184
    },
    {
        city : 'Location 3',
        desc : 'Test',
        lat : 7.5508889,
        long : 99.61338043 
    },
    {
        city : 'Location 4',
        desc : 'Test',
        lat : 7.54986786,
        long : 99.63140488
    },
    {
        city : 'Location 5',
        desc : 'Test',
        lat : 7.58883577,
        long : 99.60428238
    }
];

app.controller('MapController', function($scope, $ionicLoading) {
    // Map Settings //
    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(7.4098835, 99.5101476);
        var mapOptions = {
            center: myLatlng,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // Geo Location /
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                title: "My Location"
            });
        });
        $scope.map = map;
        // Additional Markers //
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }  
        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }

    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

});
