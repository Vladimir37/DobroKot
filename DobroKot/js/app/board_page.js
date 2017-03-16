﻿var BoardPage = {
    currentPage: 0,

    previousPage: function () {
        this.currentPage--;
        console.log(this.currentPage);
        Core.openBoardPage(Core.board, this.currentPage);
    },

    nextPage: function () {
        this.currentPage++;
        console.log(this.currentPage);
        Core.openBoardPage(Core.board, this.currentPage);
    },

    renderPage: function () {
        var threadsHTML = Core.list.threads.map(function (thread) {
            var firstPost = thread.posts[0].message;
            if (firstPost.length > 50) {
                firstPost = firstPost.slice(0, 50) + '...';
            }

            return ('<div class="thread-block">' +
                '<div class="thread-top-panel">#' + thread.display_id + '</div>' +
                '<div class="thread-thumb">' +
                    '<img src="http://dobrochan.com/' + thread.posts[0].files[0].thumb + '" alt="OP-image" />' +
                '</div>' +
                '<div class="thread-text">' +
                    '<h2 class="thread-title">' + thread.title + '</h2>' +
                    '<p class="thread-post">' + firstPost + '</p>' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '<div class="thread-bottom-panel">' +
                    'Всего сообщений: ' + thread.posts_count +
                '</div>' +
            '</div>');
        });

        $('#board-page-content').html(threadsHTML.join(''));
        $('.board-name').text('/' + Core.board + '/ Страница ' + this.currentPage);

        if (!this.currentPage) {
            $('.js-prev-but').hide();
        } else {
            $('.js-prev-but').show();
        }
    },

    Init: function () {
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);

        $('.js-prev-but').click(this.previousPage);
        $('.js-next-but').click(this.nextPage);
    }
};