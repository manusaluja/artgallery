angular.module('starter.controllers', [])

.controller('Home', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('DashCtrl', function($scope, $stateParams) {
  $scope.name = 'sorabhsaluja';
    $scope.testClick = function(){
        console.log("This is test click");
    }
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

.controller('AccountCtrl', function($scope,$http,cfpLoadingBar, artsObj, localStorageService) {
    console.log(artsObj.data.artsArray);
    $scope.artsArray = artsObj.data.artsArray;
     
    console.log("Initialized");
    
    $scope.start = function(){
        cfpLoadingBar.start();
    }
    
    $scope.stop = function(){
        cfpLoadingBar.complete();
    }
    
    $scope.edit = function(id){
        console.log("editing "+id); 
        $scope.art = id;
    }
    
    $scope.delete = function(id){
        console.log('deleting'+id);
        $http.post('/api/deleteArt', id).success(function(data, status, headers, config){
                console.log(data);
                location.reload();
            }).error(function(data, status, headers, config){
                console.error(data);
            });
    }
    $scope.saveart = function(){
            $scope.art.artistId = localStorageService.get("user")._id;
            console.log("Saving Art" + $scope.art);
            $http.post('/api/saveArt', $scope.art).success(function(data, status, headers, config){
                console.log(data);
                $('#editModal').modal('hide');
                location.reload();
            }).error(function(data, status, headers, config){
                console.error(data);
            });
        };
    
   
    
    $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
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
                    
            }).controller('ArtController',function( $scope, $fileUploader, $http, localStorageService) {
    $scope.art = {};   
    $scope.exhibition = {};
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Creates a uploader
        var uploader = $scope.uploader = $fileUploader.create({
            scope: $scope,
            url: 'uploadImage'
        });
        $scope.$on('modal-reset', function(){
        	uploader.clearQueue();
        });
    
        $scope.saveart = function(){
            $scope.art.artistId = localStorageService.get("user")._id;
            console.log("Saving Art" + $scope.art);
            $http.post('/api/saveArt', $scope.art).success(function(data, status, headers, config){
                console.log(data);
                $('#uploadModal').modal('hide');
                location.reload();
            }).error(function(data, status, headers, config){
                console.error(data);
            });
        }
         $scope.saveExhibition = function(){
             $scope.exhibition.artistId = localStorageService.get("user")._id;
             $scope.exhibition.imageUrl = $scope.art.imageUrl;
                console.log($scope.exhibition);
             $http.post('/api/saveExhibition', $scope.exhibition).success(function(data, status, headers, config){
                console.log(data);
                $('#exhibitionModal').modal('hide');
                //location.reload();
            }).error(function(data, status, headers, config){
                console.error(data);
            });

            };
        // ADDING FILTERS

        // Images only
        uploader.filters.push(function(item /*{File|HTMLInputElement}*/) {
            var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
            type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        });
    

        uploader.bind('success', function (event, xhr, item, response) {
            console.info('Success', xhr, item, response);
    		$scope.art.imageUrl=response.url;
            $scope.$apply();
        });
 
    }
);
