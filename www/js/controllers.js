angular.module('starter.controllers', [])


.controller('ListCtrl', function ($scope, localStorageService, $stateParams, $cordovaVibration, $filter, $cordovaLocalNotification) {


    if (localStorageService.isSupported) {

        var currentKey = $stateParams.listID;
       
        var storageInfoList1 = localStorageService.get(currentKey) || [];
        $scope.taskList = storageInfoList1;
        $scope.localList = {};

// ADD ITEMS
        $scope.addTask = function () {
           
            if ($scope.taskName) {
              

                $scope.taskList.push({
                    "name": $scope.taskName,
                    "completed": false
                });
                $scope.taskName = "";
                localStorageService.set(currentKey, $scope.taskList);
             

            }

        }
// DELETE ITEMS
        $scope.deleteTask = function (index) {
            //  $scope.tasklist.splice(index, 1);
            $scope.taskList.splice(index, 1);
            localStorageService.set(currentKey, $scope.taskList);
        }

// TOGGLING COMPLETION ON/OFF 
        $scope.updateCompletion = function () {

            localStorageService.set(currentKey, $scope.taskList);
                // check to see if ALL boxes are checked
                var numChecked = $filter('filter')($scope.taskList, function (task) {
                    return task.completed
                }).length;
            
                // notify that the list is complete
                if ($scope.taskList.length == numChecked) {
                    doneList();
                }


                //vibrate device whenever completion status changes
                $cordovaVibration.vibrate(100);
             


            }
            //function for notification
        var doneList = function () {
            $cordovaLocalNotification.schedule({
                id: 1,
                title: "List Complete!",
                text: "You have completed all items on this list!"
            })
        };



    }

    if (!localStorageService.isSupported) {
        console.log('local storage not supported')
    }
});







