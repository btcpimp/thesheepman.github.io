var app = angular.module("testTask", []);

app.controller('productsCtrl', ['$scope', function($scope) {

    $scope.data = {
        "items": [{
            "type": "Child",
            "img": "tshirt.png",
            "price": "3.20",
            "name": "T-SHIRT",
            "options": ["Size", "S", "M", "L", "XL"]
        }, {
            "type": "Child",
            "img": "pants.png",
            "price": "13.30",
            "name": "Pants FORCLAZ",
            "options": ["Size", "M", "XL"]
        }, {
            "type": "Men",
            "img": "tshirt.png",
            "price": "5.00",
            "name": "T-SHIRT",
            "options": ["Size", "XL"]
        }, {
            "type": "Women",
            "img": "tshirt.png",
            "price": "3.21",
            "name": "T-SHIRT",
            "options": ["Size", "S", "M", "L", "XL"]
        }, {
            "type": "Women",
            "img": "backpack.png",
            "price": "31",
            "name": "backpack",
            "options": ["color", "red", "blue", "black"]
        }, {
            "type": "Other",
            "img": "item3",
            "price": "0",
            "name": "car",
            "options": ["color", "red", "blue", "black"]
        }]
    };

    $scope.showCategory = {
        "Men": true,
        "Women": true,
        "Child": false
    };

    $scope.changeFilter = function(obj) {
        return !$scope.showCategory[obj];
    }
    $scope.showChosen = function(a) {
        for (var category in $scope.showCategory) {
            var show = $scope.showCategory;
            if (show[category] && a.type.indexOf(category) > -1) {
                return true;
            }
        }

    };
    $scope.noFilter = function() {
        for (var category in $scope.showCategory) {
            $scope.showCategory[category] = true
            console.log(category)
        }
    }

    $scope.runScroll = function() {
        scrollTo(document.body, 0, 600);
    }

    $scope.scrollTo = function(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }
}])


app.controller('menuCtrl', ['$scope', function($scope) {

    $scope.data = {
        "footerMenu": [{
            "name": "Credits",
            "link": "https://softswiss.com/",
            "title": "credits"
        }, {
            "name": "Privacy",
            "link": "https://softswiss.com/",
            "title": "privacy"
        }, {
            "name": "About",
            "link": "https://www.softswiss.com/about-us/",
            "title": "about us"
        }, {
            "name": "Contact",
            "link": "https://www.softswiss.com/contact-us/",
            "title": "contact us"
        }]
    };

}]);
