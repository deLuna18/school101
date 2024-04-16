var app = angular.module("myapp", ["ngRoute"]);


app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when("/main", {
            templateUrl: 'main.html',
            controller: 'mainController',
            resolve: {
                check: function($rootScope, $location) {
                    if (!$rootScope.logged) {
                        $location.path("/");
                    }
                }
            }
        })
        .otherwise({ redirectTo: '/' });
});

app.controller("loginController", function($scope, $location, $rootScope, $http) {
    if ($rootScope.logged) {
        $location.path("/main");
    }

    $scope.login = function() {
        var email = $scope.email; 
        var password = $scope.password; 
        $http.post("/login", { username: email, password: password })
            .then(function(response) {
                $rootScope.logged = true;
                $rootScope.message = "Login successful!";
                $location.path("/main"); 
            })
            .catch(function(error) {
                console.log("Error:", error);   
                if (error.status === 400) {
                    $rootScope.logged = false;
                    $rootScope.message = "Invalid Credentials. Please try again!";
                } else {
                    $rootScope.logged = false;
                    $rootScope.message = "An error occurred during login";
                    console.error("Login failed:", error);
                }
            });
    };
});

