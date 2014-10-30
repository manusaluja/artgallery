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
.controller('NavBarController',function($scope)
            {
                    $scope.tabSwitch= function(tab){
                        $scope.highlight = tab;    
                        console.log(tab);
                        if($scope.highlight == 'login'){$("#loginbox").show();$("#signupbox").hide()}
                        else {$("#loginbox").hide();$("#signupbox").show()}
                        
                    }
            });
