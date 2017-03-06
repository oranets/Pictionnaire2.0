var app = angular.module('pictionnaire', ['ngFileUpload']);

app.controller('tabController', function() {
    var tab = 1;
    this.selectTab = function(tab_value) {
        tab = tab_value;
    }
    this.tabSelected = function(tab_value) {
        return tab === tab_value;
    }
});

app.controller('listController', ['$http', function($http) {
    var ctrl = this;
    this.selected = 0;
    this.selectForm = function(id) {
        if (this.selected == id) {
            this.selected = -1;
        } else {
            this.selected = id;
        };
    }
    this.pictos = [];
    $http.get('data/data.json').success(function(result) {
        ctrl.pictos = result;
    });
    this.filter = "";
    this.scdFilter = "1";
    this.word = "";
    this.categories = [{
        name: "Actions",
        id: "1",
        couleur: "#FF0000"
    }, {
        name: "Adjectifs",
        id: "2",
        couleur: "#FF3399"
    }, {
        name: "Aliments",
        id: "3",
        couleur: "#0000FF"
    }, {
        name: "Animaux",
        id: "4",
        couleur: "#FFFF00"
    }, {
        name: "Autres",
        id: "5",
        couleur: "#000000"
    }, {
        name: "Emotions",
        id: "6",
        couleur: "#FF9900"
    }, {
        name: "Lieux",
        id: "7",
        couleur: "#66FF00"
    }, {
        name: "Mots outils",
        id: "8",
        couleur: "#808080"
    }, {
        name: "Nature",
        id: "9",
        couleur: "#009900"
    }, {
        name: "Parties du corps",
        id: "10",
        couleur: "#663300"
    }, {
        name: "Personnes",
        id: "11",
        couleur: "#6633FF"
    }];

}]);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadPic = function(file) {
      console.log(file);
    file.upload = Upload.upload({
      url: 'data/Actions',
      data: {username: $scope.username, file: file},
    });
    console.log(file);
    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
}]);
