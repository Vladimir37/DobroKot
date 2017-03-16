var Core = {
    // State
    active: 'main',
    board: null,
    thread: null,
    loading: false,
    list: {
        boards: [],
        thread: []
    },

    // Actions
    openBoard: function (name) {
        var self = this;
        self.showPage('load');
        $.ajax({
            type: 'GET',
            url: 'http://dobrochan.com/' + name + '/index.json',
            success: function (res) {
                console.log(res);
                // this.board = name;
            },
            error: function (err) {
                console.log(err);
                self.createError('Error!');
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