(function() {

    angular.module('app')
        .controller('BooksController', ['$q','books', 'dataService', '$log', 'badgeService', '$cookies', '$cookieStore', '$route', 'BooksResource', 'currentUser', BooksController])


    function BooksController($q, books, dataService, $log, badgeService, $cookies, $cookieStore, $route, BooksResource, currentUser) {

        var vm = this;
        vm.appName = books.appName;
        vm.favoriteBook = $cookies.favoriteBook;
        console.log('From Book controller');
        $log.debug($cookieStore);
        // vm.lastEditedBook = $cookieStore.get('lastEdited');
        vm.currentUser = currentUser;

        $log.debug(vm.favoriteBook);
        $log.debug(vm.lastEditedBook);

        vm.allBooks = BooksResource.query();


        dataService.getUserSummary()
            .then(getUserSummarySuccess);

        function getUserSummarySuccess(summaryData) {
            $log.info(summaryData);
            vm.summaryData = summaryData;
        }
        // var booksPromise = dataService.getAllBooks();
        var readersPromise = dataService.getAllReaders();

        $q.all([readersPromise])
            .then(getAllDataSuccess)
            .catch(getAllDataError);

        function getAllDataSuccess(dataArray) {
            // vm.allBooks = dataArray[0];
            vm.allReaders = dataArray[0];
            $log.log('All readers retrieved');
        }

        function getAllDataError(reason) {
            console.log('Error message: ' + reason);
        }

        vm.deleteBook = function (bookID) {
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        };

        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }

        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }

        // dataService.getAllBooks()
        //     .then(getBooksSuccess, null, getNotification)
        //     .catch(errorFunction)
        //     .finally(getAllBooksCompleted);
        //
        // function errorFunction(errorMsg) {
        //     $log.error('Error message: ' + errorMsg);
        // }
        //
        // function getBooksSuccess(books) {
        //     vm.allBooks = books;
        // }
        //
        // function getNotification(notification) {
        //     $log.info('Promise Notification: ' + notification);
        // }
        //
        // function getAllBooksCompleted() {
        //     console.log('Get all books completed!');
        // }
        //
        // dataService.getAllReaders()
        //     .then(getReadersSuccess, null, getNotification)
        //     .catch(errorFunction)
        //     .finally(getAllReadersCompleted);
        //
        // function getReadersSuccess(readers) {
        //     vm.allReaders = readers;
        // }
        //
        // function getAllReadersCompleted() {
        //     console.log('Getting all readers completed!');
        // }


        vm.getBadge = badgeService.retrieveBadge;

        $log.info('BooksController has been created.');



    }


}());