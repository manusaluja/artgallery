angular.module('starter.controllers', [])

.controller('ExhibitionCtrl', function($scope, $stateParams, $http) {
  console.log($stateParams);
    $http.post('/api/exhibitions', $stateParams).success(function(data, status, headers, config){
                        console.log(data);
                        $scope.exhibitions = data.exhibitions;
            
                        }).error(function(data, status, headers, config){
                            console.error(data);
                        });
})
.controller('CartCtrl', function($scope, $http, localStorageService) {
    $scope.cartObj = localStorageService.get("cart");
    console.log($scope.cartObj);
    if($scope.cartObj == null){
       $scope.cartObj = {};
       $scope.cartObj.cart = [];
       }
/*    $http.post('/api/exhibitions', $stateParams).success(function(data, status, headers, config){
                        console.log(data);
                        $scope.exhibitions = data.exhibitions;
            
                        }).error(function(data, status, headers, config){
                            console.error(data);
                        });*/
    $scope.cartTotal = 0;
        angular.forEach($scope.cartObj.cart, function(value, key){
        //console.log(value);
       $scope.cartTotal += value.price;
          
    });
       $scope.checkout = function(){
                    
                var order = {};
                order.items = [];
                order.total = $scope.cartTotal;

           angular.forEach($scope.cartObj.cart, function(value, key){
                var obj = {};
                    obj._id = value._id;
                    obj.price = value.price;
                    obj.type = value.type;
                    obj.name = value.name;
                    obj.description = value.description;
                order.items.push(obj);

                });
           order.orderDate = moment().format('MMMM Do YYYY, h:mm a');    
           order.totalItems = $scope.cartObj.cart.length;
           order.userId = localStorageService.get("user")._id;
           console.log(order);
               $http.post('/api/saveOrder', order).success(function(data, status, headers, config){
                        console.log(data);
                        localStorage.removeItem("cart");
                        }).error(function(data, status, headers, config){
                            console.error(data);
                        });
            } 
    
})
.controller('DashCtrl', function($scope, $http, homeData, localStorageService) {
    console.log(homeData.data);
    $scope.photoartists = [];
    $scope.homePageData = []; 
    
    $scope.like = function(){ //when user clicks on like
    var like = {};
        
        like.user = localStorageService.get("user");
        like.art = $scope.selectedImage.arts[0]._id;
        $http.post('/api/like', like).success(function(data, status, headers, config){
                console.log(data.status);
                if(data.status == 'liked'){ 
                    $scope.selectedImage.isLiked = true;
                    if($scope.selectedImage.totalLikes == 1 && $scope.selectedImage.noLikes){
                    
                    } else{
                    $scope.selectedImage.totalLikes++;
                    }
                
                }
                if(data.status == 'unliked'){ 
                    $scope.selectedImage.isLiked = false;
                
                    if($scope.selectedImage.totalLikes == 1){
                    
                    } else{
                    $scope.selectedImage.totalLikes--;
                    }
                
                }
            
            }).error(function(data, status, headers, config){
                console.error(data);
            });
    }
    
    $scope.addToCart = function(){ //when user clicks on add to cart
        console.log($scope.selectedImage.arts[0]);
        
        var cartObj = localStorageService.get("cart");
        if(cartObj == null){
            cartObj = {};
            cartObj.cart = [];
        }
        
        var artfound = cartObj.cart.filter(function(art){
            return art._id == $scope.selectedImage.arts[0]._id;
        })
        if(artfound.length>0){
            console.log('Already Added to Cart');
            return;
        }
        cartObj.cart.push($scope.selectedImage.arts[0]);
        localStorageService.set("cart", cartObj);
        
    }
    
    $scope.postComment = function(){ //when user clicks on add comment
       
        $scope.comment.artId = $scope.selectedImage.arts[0]._id;
        $scope.comment.commenter = localStorageService.get("user");
        $scope.comment.date = moment().format('MMMM Do YYYY, h:mm a');
         console.log($scope.comment);
        $http.post('/api/postComment', $scope.comment).success(function(data, status, headers, config){
                console.log(data);
                $scope.comment = {};
            $scope.selectedImage.comments = data.comments;
            }).error(function(data, status, headers, config){
                console.error(data);
            });
    };
    
    angular.forEach(homeData.data.artistsArray, function(value, key){
        //console.log(value);
        var artObj = {};
        artObj.fname = value.fname;
        artObj.lname = value.lname;
        
        var artfound = homeData.data.arts.filter(function(art){
            return art.artistId == value._id;
        })
        
        console.log(artfound.length +" for "+value.fname);
        if(artfound.length > 0){
            artObj.arts = artfound;
            $scope.homePageData.push(artObj);
        }
            
    });
    console.log($scope.homePageData);
    
    $scope.collections = [];
    angular.forEach(homeData.data.arts, function(value, key){
        //console.log(value);
        var photoObj = value;
        
        var artist = homeData.data.artistsArray.filter(function(artist){
            return artist._id == value.artistId;
        })
        if(artist.length>0){
        value.artistId = artist[0]._id;
        value.fname = artist[0].fname;
        value.lname = artist[0].lname;
        $scope.collections.push(value);
        
        }
        
            
    });
    console.log($scope.collections);
    $scope.name = 'sorabhsaluja';
    $scope.testClick = function(){
        console.log("This is test click");
    }
    $scope.collections = shuffle($scope.collections);
    
    
         function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

              // While there remain elements to shuffle...
              while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
              }

              return array;
            }
    
    
        /**
        Selects the card clicked upon and adds it to scope as selected image.
        Selected image is then displayed as popup.
        */
            $scope.popup = function(card){
                console.log(card);
                $scope.selectedImage = card;
                if(card.arts[0].likes){
                    
                if(card.arts[0].likes.length == 0){
                $scope.selectedImage.totalLikes = 1;
                $scope.selectedImage.noLikes = true;    
                } else{
                $scope.selectedImage.totalLikes = card.arts[0].likes.length;
                }
                    
                
                    if(card.arts[0].likes.indexOf(localStorageService.get("user")._id) != -1){
                        $scope.selectedImage.isLiked = true;
                    }
                } else{
                        $scope.selectedImage.totalLikes = 1;
                        $scope.selectedImage.noLikes = true;    


                }
                $http.post('/api/getComments', {artId : card.arts[0]._id}).success(function(data, status, headers, config){
                $scope.selectedImage.comments = data.comments;
                console.log(data);
            }).error(function(data, status, headers, config){
                console.error(data);
            });
            }
    
})

.controller('AccountCtrl', function($scope,$http,cfpLoadingBar, artsObj,orders, localStorageService) {
    console.log(artsObj.data.artsArray);
    console.log('orders');
    console.log(orders);
    $scope.artsArray = artsObj.data.artsArray;
    $scope.user = localStorageService.get("user"); 
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
    $scope.vieworder = orders.data.orders;
   
    
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
.controller('NavBarController',function($scope, $http, localStorageService, $state)
            {    
                    console.log(localStorageService.get("user"));
                    $http.get('/api/locations').success(function(data, status, headers, config){
                        console.log(data);
                        $scope.locations = data.locations;
            
                        }).error(function(data, status, headers, config){
                            console.error(data);
                        });
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
                        $state.go('home');
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
             $scope.exhibition.StartDate = moment($scope.exhibition.StartDate).format('MMMM Do YYYY');
             $scope.exhibition.EndDate = moment($scope.exhibition.EndDate).format('MMMM Do YYYY');
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
