'use strict';
angular.module('myApp.view2', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        $scope.buttonName = 'Next';
        $scope.currentQuestionIndex = -1;
        $scope.currentQuestion = undefined;
        $scope.myvalue = false;
        $scope.score = 0;
        $scope.percentage = 0;
        // 1. load json file
        $http.get('quiz_data.json').then(function (quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
            // 2. get first question object (i.e. question and answers) from the data
            $scope.currentQuestionIndex = 0;
            // 3. assign it to a variable bound in html view => its now visible in ui
            $scope.currentQuestion = $scope.myQuestions[$scope.currentQuestionIndex];
        });
        $scope.nextQuestion = function () {
            $scope.currentQuestionIndex += 1;
            if ($scope.currentQuestionIndex < $scope.myQuestions.length) {
                $scope.currentQuestion = $scope.myQuestions[$scope.currentQuestionIndex];
                if ($scope.currentQuestionIndex === $scope.myQuestions.length - 1) {
                    $scope.buttonName = 'Finish';
                }
            } else {

                // Calculating Percentage
                $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(2);
                // Passing Percentage in query String by using $location.search() function
                $location.path('/view3').search({param: $scope.percentage});
            }
            $scope.myvalue = false;
        };
        $scope.showNextButton = function (id) {
            //fetch id of selected answer and checks with correct answer
            $scope.correctAnswer = $scope.myQuestions[$scope.currentQuestionIndex].correct;
            if (id === $scope.correctAnswer) {
                $scope.score += 1;
            }
            $scope.myvalue = true;
        };
    }]);




