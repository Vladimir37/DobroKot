﻿var Core = {
    // State
    active: 'main',
    board: null,
    thread: null,
    loading: false,
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
            success: function (res) {
                self.board = name;
                self.list.threads = response.boards[name].threads;
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
            success: function (res) {
                self.board = name;
                self.list.threads = response.boards[name].threads;
            },
            error: function (err) {
                console.log(err);
                self.createError('Error loading threads!');
                self.showPage('main');
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