var ThreadPage = {
    postList: {},

    generatePost: function (post, index) {
        var self = this;
        var imgs = post.files.map(function (file) {
            return '<img src="http://dobrochan.com/' + file.thumb + '" data-src="' + file.src + '" alt="post-pic" class="post-pic" />';
        });
        post.message = Core.textRenderProcessing(post.message, post.display_id);
        self.postList[post.display_id] = {
            data: post,
            index: index,
            imgs: imgs,
            responses: []
        };
        return ('<div class="post-block" data-id="' + post.display_id + '">' +
            '<div class="post-top-panel">' +
                '<span class="post-abs-num">#' + post.display_id + '</span>' +
                '<span class="post-date">' + post.date + '</span>' +
                '<span class="post-rel-num">№' + index + '</span>' +
            '</div>' +
            '<div class="post-imgs">' + imgs.join('') + '<div class="clearfix"></div></div>' +
            '<div class="post-text">' + post.message + '</div>' +
            '<div class="post-responses">Ответы: <div class="post-responses-list"></div></div>' +
        '</div>');
    },

    generateResponses: function () {
        var self = this;
        $('.post-block').each(function () {
            var id = $(this).data('id');
            if (self.postList[id]) {
                var responses = self.postList[id].responses.map(function (num) {
                    return '<a class="post_link" data-link="' + num + '">>>' + num + '</a> ';
                });
                if (!responses.length) {
                    $(this).find('.post-responses').hide();
                } else {
                    $(this).find('.post-responses-list').html(responses.join(''));
                }
            }
        });
    },

    viewResponse: function(e) {
        var target = $(e.currentTarget);
        var num = target.data('link');
        var targetPost = $('[data-id=' + num + ']');
        if (targetPost.length) {
            Core.openQuote(targetPost[0].outerHTML);
        }
    },

    renderPage: function () {
        var self = this;
        var posts = Core.list.posts.map(function (post, index) {
            return self.generatePost(post, index);
        });

        $('#thread-page-content').html(posts.join(''));
        $('.thread-name').text(Core.list.posts[0].title);

        this.generateResponses();

        $('.post_link').click(this.viewResponse);

        $('body').on('click', '.post-pic', Core.openImage);

        $('body').on('click', ".post-abs-num", Core.openPostForm);
    }
};