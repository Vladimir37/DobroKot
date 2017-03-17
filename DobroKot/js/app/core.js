var Core = {
    // State
    active: 'main',
    board: null,
    thread: null,
    list: {
        threads: [],
        posts: []
    },

    // Actions
    openBoardIndex: function (name) {
        var self = this;
        self.showPage('load');
        $.ajax({
            type: 'GET',
            url: 'http://dobrochan.com/' + name + '/index.json',
            success: function (response) {
                self.board = name;
                self.list.threads = response.boards[name].threads;
                BoardPage.currentPage = 0;
                BoardPage.renderPage();
                self.showPage('board');
            },
            error: function (err) {
                console.log(err);
                self.createError('Error loading threads!');
                self.showPage('main');
            }
        });
    },

    openBoardPage: function (name, num) {
        var self = this;
        self.showPage('load');
        $.ajax({
            type: 'GET',
            url: 'http://dobrochan.com/' + name + '/' + num + '.json',
            success: function (response) {
                self.board = name;
                self.list.threads = response.boards[name].threads;
                BoardPage.renderPage();
                self.showPage('board');
            },
            error: function (err) {
                console.log(err);
                self.createError('При загрузке тредов произошла ошибка');
                self.showPage('main');
            }
        });
    },

    openThread: function (num) {
        var self = this;
        self.showPage('load');
        $.ajax({
            type: 'GET',
            url: 'http://dobrochan.com/' + self.board + '/res/' + num + '.json',
            dataType: 'json',
            success: function (response) {
                self.thread = num;
                self.list.posts = response.boards[Core.board].threads[0].posts;
                ThreadPage.renderPage();
                self.showPage('thread');
            },
            error: function (err) {
                console.log('http://dobrochan.com/' + self.board + '/res/' + num + '.json');
                console.log(err);
                self.createError('Ошибка: тред не существует или заблокирован для вашего местоположения');
                self.showPage('board');
            }
        });
    },

    // Utility

    createError: function (err) {
        var msgBox = new Windows.UI.Popups.MessageDialog(err);
        msgBox.showAsync();
    },

    showPage: function (pagename) {
        $('.page-show').removeClass('page-show');
        $('#' + pagename + '-page').addClass('page-show');
    }
};