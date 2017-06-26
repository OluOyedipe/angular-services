/**
 * Created by olu on 6/25/17.
 */
(function(){
    angular.module('app')
        .controller('EditBookController', ['$routeParams', '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'BooksResource', 'currentUser', EditBookController]);

    function EditBookController($routeParams, $cookies, $cookieStore, dataService, $log, $location, BooksResource, currentUser) {
        var vm = this;

        console.log($routeParams.bookID);

        // dataService.getBookByID($routeParams.bookID)
        //     .then(getCurrentBook)
        //     .catch(logError);

        vm.currentBook = BooksResource.get({book_id: $routeParams.bookID });
        $log.info(vm.currentBook);
        currentUser.lastBookEdited = vm.currentBook;

        function getCurrentBook(data) {

            vm.currentBook = data;
            $cookieStore.put('lastEdited', vm.currentBook);
        }

        function logError(reason) {
            console.log('Error message: ' + reason);
        }

        vm.saveBook = function () {
            // dataService.updateBook(vm.currentBook)
            //     .then(updateBookSuccess)
            //     .catch(updateBookError);
            vm.currentBook.$update();
            $location.path('/');
        };

        function updateBookSuccess(message) {
            $log.info(message);
            $location.path('/');
        }

        function updateBookError(errorMessage) {
            $log.error(errorMessage);
        }

        vm.setAsFavorite = function () {
            $cookies.favoriteBook = vm.currentBook.title;
        };

    }
}());