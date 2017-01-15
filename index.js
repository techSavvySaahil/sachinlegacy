var app = angular.module("Main", []);
function MainController($scope,apiGetImages){
	function initVariables(){
		$scope.activeIndex = 0;
		$scope.teamsInfo = [];
		$scope.mainPage = false;
	}
	function initController(){
		function userChoice(){
			var temp = prompt("Which is your favourite team out of Australia, England, Bangladesh, New Zealand, Pakistan, South Africa, Sri Lanka, West Indies and Zimbabwe? Please enter the number corresponding to the team. eg. 1 for Australia and 9 for Zimbabwe");	
			if(!isNaN(temp) && temp>=1 && temp<=9){
				$scope.activeIndex = temp-1;
			}
			else{
				userChoice();
			}
		}
		userChoice();
		apiGetImages({}, function(response){
			if(response && response.data && response.data.data && Array.isArray(response.data.data)){
				$scope.teamsInfo = response.data.data;
			}
		})
	}
	function controllerFunctions(){
		$scope.changeTeam = function(index){
			$scope.mainPage = false;
			$scope.activeIndex = index;
		}
		$scope.showMainPage = function(a){
			$scope.mainPage = a;
		}
	}
	initVariables();
	initController();
	controllerFunctions();
}
MainController.$inject = ['$scope','apiGetImages'];
app.controller('MainController', MainController);
app.factory('apiGetImages', function($http){
	return function(reqObj, callBack){
		var url = "teams.json"
		$http.get(url)
		.then(function(response){
			console.log(response);
			callBack(response);
		}, 
		function(errorData){
			console.log("Error in getting data "+ response);
		});
	}
})