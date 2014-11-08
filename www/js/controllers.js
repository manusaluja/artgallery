angular.module('starter.controllers', [])

.controller('Home', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('DashCtrl', function($scope, $stateParams) {
  $scope.name = 'sorabhsaluja';
 $scope.photos = [
            {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
            {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
            {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
            {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
            {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
            {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
            {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
            {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
            {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
            {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
            {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
            {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
            {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
            {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
            {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
        ];
    
    
})

.controller('AccountCtrl', function($scope,$http,cfpLoadingBar) {
    
    console.log("Initialized");
    
    $scope.start = function(){
        cfpLoadingBar.start();
    }
    
    $scope.stop = function(){
        cfpLoadingBar.complete();
    }
    
    $scope.uploadFile = function() {
        console.log($scope.files);
        $http.post('/api/uploadImage',{files: $scope.files}).
          success(function(data, status, headers, config) {
            console.log(data);
        });
    };
})
.controller('NavBarController',function($scope, $http, localStorageService)
            {    
                    console.log(localStorageService.get("user"));
                    
                    $scope.highlight='login';
                    $scope.loggedIn = 'no';
                    $scope.reset = function(){
                        $scope.highlight='login';
                        $("#success").hide();
                        $("#loginbox").show();
                        $("#signupbox").hide();
                        $("#navTabs").show();
                        $scope.register = {};

                    }
                    if(localStorageService.get("user")!=null){
                        $scope.loggedInUser = localStorageService.get("user");
                        $scope.loggedIn = 'yes';

                    }
                    $scope.register = {};
                    $scope.login = {};
                    $scope.register.role = 'Artist';
                    $scope.tabSwitch= function(tab){
                        $scope.highlight = tab;    
                        console.log(tab);
                        if($scope.highlight == 'login'){$("#loginbox").show();$("#signupbox").hide()}
                        else {$("#loginbox").hide();$("#signupbox").show()}
                        
                    };
                    
                    $scope.registerUser = function(){
                        console.log($scope.register);
                        $http.post('/api/register',$scope.register).
                          success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available.
                            if(data.isCompleted == 1){
                            
                                localStorageService.set("user", data.user);
                                $scope.loggedInUser = localStorageService.get("user");
                                $scope.loggedIn = 'yes';
                                $("#success").show();
                                $("#signupbox").hide();
                                $("#navTabs").hide();
                            } else{
                            
                            }
                          }).
                          error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                          });
                    }
                    
                    $scope.logout = function(){
                        localStorage.clear();
                        $scope.loggedIn = 'no';
                        $scope.loggedInUser = null;
                    }
                    
                    $scope.validateUser = function(){
                    console.log($scope.login);
                        $http.post('/api/login',$scope.login).
                         success(function(data, status, headers, config) {
                            // this callback will be called asynchronously
                            // when the response is available
                            if(data.isCompleted == 1){
                                localStorageService.set("user", data.user);
                                $scope.loggedInUser = localStorageService.get("user");

                            $scope.loggedIn = 'yes';
                            $("#success").show();
                            $("#signupbox").hide();
                            $("#navTabs").hide();
                            $("#loginbox").hide();
                            } else{
                            alert("Incorrect Login, Please Try Again");
                            }
                          }).
                          error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                          });
                    }
                    
            });
