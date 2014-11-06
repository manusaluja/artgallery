angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('Home', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope,cfpLoadingBar) {
    
    console.log("Initialized");
    
    $scope.start = function(){
        cfpLoadingBar.start();
    }
    
    $scope.stop = function(){
        cfpLoadingBar.complete();
    }
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
