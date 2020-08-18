//Square//
//curl -H "Authorization: Bearer sq0atp-qm9JQ3l40AFjt-o8IjlcBg" https://connect.squareup.com/v2/locations
// angular.js main app initialization
var app = angular.module('myApp', []).
    config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
        when('/', { templateUrl: 'Pages/body.html', activetab: 'projects', controller: HomeCtrl }).
        when('/project/:projectId', {
          templateUrl: function (params) { return 'Pages/' + params.projectId + '.html'; },
          controller: ProjectCtrl,
          activetab: 'projects'
        }).
        when('/livingroom', {
          templateUrl: 'Rooms/livingroom.html',
          controller: LivingCtrl,
          activetab: 'livingroom'
        }).
        when('/diningroom', {
          templateUrl: 'Rooms/diningroom.html',
          controller: DiningCtrl,
          activetab: 'diningroom'
        }).
         when('/bedroom', {
          templateUrl: 'Rooms/bedroom.html',
          controller: BedroomCtrl,
          activetab: 'bedroom'
        }).
        when('/entertainment', {
          templateUrl: 'Rooms/entertainment.html',
          controller: EntertainmentCtrl,
          activetab: 'entertainment'
        }).
         when('/office', {
          templateUrl: 'Rooms/office.html',
          controller: OfficeCtrl,
          activetab: 'office'
        }).
        
        otherwise({ redirectTo: '/' });
    }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {

        $scope.$on("$routeChangeSuccess", function (scope, next, current) {
          $scope.part = $route.current.activetab;
        });

        // onclick event handlers
        $scope.showForm = function () {
          $('.contactRow').slideToggle();
        };
        $scope.closeForm = function () {
          $('.contactRow').slideUp();
        };

        // save the 'Contact Us' form
        //$scope.save = function () {
        //  $scope.loaded = true;
        //  $scope.process = true;
        //  $http.post('sendemail.php', $scope.message).success(function () {
        //      $scope.success = true;
        //      $scope.process = false;
        //  });
        //};
  }]);

app.config(['$locationProvider', function($location) {
    $location.hashPrefix('!');
}]);

//SLIDESOW//

app.controller('HomePageSliderController', function($scope) {
    $scope.images=[{src:'BedroomSS.jpg',title:'Pic 1'},
                   {src:'DiningroomSS.jpg',title:'Pic 2'},
                   {src:'LivingroomSS.jpg',title:'Pic 3'},
                  ]; 
});

app.controller('LivingroomSliderController', function($scope) {
    $scope.images=[{src:'LivingroomS.jpg',title:'Pic 1'},
                   {src:'LivingroomSS.jpg',title:'Pic 2'},
                  ]; 
});

app.controller('DiningroomSliderController', function($scope) {
    $scope.images=[{src:'DiningroomSS.jpg',title:'Pic 1'},
                   {src:'DiningroomSS2.jpg',title:'Pic 2'},
                  ]; 
});

app.controller('BedroomSliderController', function($scope) {
    $scope.images=[{src:'BedroomSS.jpg',title:'Pic 1'},
                   {src:'BedroomSS2.jpg',title:'Pic 2'},
                  ]; 
});

app.controller('EntertainmentSliderController', function($scope) {
    $scope.images=[{src:'BedroomSS.jpg',title:'Pic 1'},
                   {src:'BedroomSS2.jpg',title:'Pic 2'},
                  ]; 
});

app.controller('HomeOfficeSliderController', function($scope) {
    $scope.images=[{src:'BedroomSS.jpg',title:'Pic 1'},
                   {src:'BedroomSS2.jpg',title:'Pic 2'},
                  ]; 
});

 
app.directive('slider', function ($timeout) {
  return {
  restrict: 'AE',
  replace: true,
  scope:{
    images: '='
  },
    link: function (scope, elem, attrs) {
  
    scope.currentIndex=0;

    scope.next=function(){
      scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
    };
    
    scope.prev=function(){
      scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
    };
    
    scope.$watch('currentIndex',function(){
      scope.images.forEach(function(image){
        image.visible=false;
      });
      scope.images[scope.currentIndex].visible=true;
    });
    
    /* Start: For Automatic slideshow*/
    
    var timer;
    
    var sliderFunc=function(){
      timer=$timeout(function(){
        scope.next();
        timer=$timeout(sliderFunc,5000);
      },1000);
    };
    
    sliderFunc();
    
    scope.$on('$destroy',function(){
      $timeout.cancel(timer);
    });
    
    /* End : For Automatic slideshow*/
    
    },
  templateUrl:'Pages/HomePageSlideShow.html'
  };
});

//Hide Logo//

app.directive('scrollPosition', function($window) {
  return {
    scope: {
      scroll: '=scrollPosition'
    },
    link: function(scope, element, attrs) {
      var windowEl = angular.element($window);
      var handler = function() {
        scope.scroll = windowEl.scrollTop();
      };
      windowEl.on('scroll', scope.$apply.bind(scope, handler));
      handler();
    }
  };
});

