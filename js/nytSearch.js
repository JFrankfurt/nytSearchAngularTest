(function() {
    'use strict';
    var nytSearch = angular.module('nytSearch', ["firebase"]);

    //Constant values to be injected
    //(not sure how to address the apiKey being included in client code...)
    nytSearch.constant('apiKey', '76715ca45e8b1b86017bab3a9d59d276:18:68083505');
    nytSearch.constant('url', 'http://api.nytimes.com/svc/search/v2/articlesearch.json');

    nytSearch.factory('nytArticles', function($http, apiKey, url) {
        function _makeRequest(query) {

            query = query || {};

            var params = {'api-key': apiKey};

            angular.extend(query, params);

            return $http.get(url, {params: query
            }).then(function(result) {
                return result.data;
            });
        }
        return {
            makeRequest: _makeRequest
        };
    });
    nytSearch.controller('SearchController', function($scope, nytArticles) {
        $scope.query = {};

        $scope.search = function() {
            nytArticles.makeRequest($scope.query).then(
            function(results) {
                $scope.results = results;
            });
        };
    });
    nytSearch.controller('ToggleController', function($scope) {
        $scope.toggle = true;
        $scope.toggleMenu = function() {
            $scope.toggle = $scope.toggle === false ? true : false;
        }
    });
    nytSearch.controller('FilterController', function($scope) {
        $scope.orderByField = 'number';
        $scope.reverseSort = false;

        $scope.filter = function() {
            var string = JSON.stringify($scope.results.response.docs);

        }
    });
    //This might turn into something.
    nytSearch.controller('FireController', function($scope, $firebase) {
        var ref = new Firebase("https://neonytsearch.firebaseio.com/");
        var sync = $firebase(ref);
    });
})();
/*
nytSearch.controller('SearchController', ['$scope', '$timeout', 'nytService',
    function($scope, $timeout, nytService) {
    	$scope.$watch('query', function(newQuery) {
    		nytService.articles(newQuery)
    			.success(function(data, status, headers) {
    				$scope.articles = data.response.docs;
    			})
    	});
}]);*/