var Core = {
    // State
    active: 'main',
    modal_opened: false,
    modal_quote: false,
    modal_image: false,
    modal_posting: false,
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
                self.active = 'board';
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
                self.active = 'board';
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
                ThreadPage.postList = {};
                self.thread = num;
                self.active = 'thread';
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

    openQuote: function(post) {
        if (!this.modal_opened) {
            this.modal_opened = true;
            this.modal_quote = true;
            $('#quote-page').addClass('page-show');
        }

        $('#quote-page').html(post);
        $('#quote-page .post-block').css({
            width: '100%'
        });
        $('#quote-page .post_link').click(ThreadPage.viewResponse);
    },

    openImage: function (e) {
        Core.modal_opened = true;
        Core.modal_image = true;
        $('#image-page').addClass('page-show');
        $('#opened_image').attr({
            src: 'http://dobrochan.com/' + $(e.currentTarget).data('src')
        });
    },

    openPostForm: function (e) {
        Core.modal_opened = true;
        Core.modal_posting = true;
        var num = $(e.currentTarget).text().slice(1);
        $('#post_form_message').val('>>' + num + '\n');
        $('#post-page').addClass('page-show');
        $('#post_form_message').focus();
    },

    // Utility

    createError: function (err) {
        var msgBox = new Windows.UI.Popups.MessageDialog(err);
        msgBox.showAsync();
    },

    showPage: function (pagename) {
        $('.page-show').removeClass('page-show');
        $('#' + pagename + '-page').addClass('page-show');
    },

    textRenderProcessing: function(text, subject_id) {
        var fixedText = text.replace(/</g, '&lt;')
            .replace(/\*\*(.+?)\*\*/g, '<b class="bold">$1</b>')
            .replace(/\*(.+?)\*/g, '<i class="italic">$1</i>')
            .replace(/%%(.+?)%%/g, '<span class="spoiler">$1</span>')
            .replace(/>>([0-9]+)/g, function (full, id, num) {
                if (ThreadPage.postList[id] && subject_id) {
                    ThreadPage.postList[id].responses.push(subject_id);
                }
                return '<a class="post_link" data-link="' + id + '">>>' + id + '</a>';
            })
            .replace(/(^|\n)(>.+?)(\n|$)/gm, '$1<span class="quote">$2</span>$3');
        return fixedText;
    }
};