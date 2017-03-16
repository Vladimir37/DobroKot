var MainPage = {
    boardList: ['b', 'a', 'rf', 'vg', 'cr', 's'],

    generateBlock: function (name) {
        var block = '<div class="board-block js-board-block" data-name="' + name + '">/' + name + '/</div>';
        return block;
    },

    generatePage: function () {
        var self = this;
        var pageHTML = this.boardList.map(function (addr) {
            return self.generateBlock(addr);
        });
        return pageHTML.join('');
    },

    // Actions

    openBoard: function() {
        Core.openBoard($(this).data('name'));
    },

    Start: function () {
        $('#main-page-content').html(this.generatePage());
        $('.js-board-block').click(this.openBoard);
    }
};

$(document).ready(function () {
    MainPage.Start();
});

