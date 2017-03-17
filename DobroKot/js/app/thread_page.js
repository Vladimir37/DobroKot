var ThreadPage = {
    generatePost: function (post, index) {
        var imgs = post.files.map(function (file) {
            return '<img src="http://dobrochan.com/' + file.thumb + '" alt="post-pic" class="post-pic" />';
        });
        return ('<div class="post-block">' +
            '<div class="post-top-panel">' +
                '<span class="post-abs-num">#' + post.display_id + '</span>' +
                '<span class="post-rel-num">№' + index + '</span>' +
            '</div>' +
            '<div class="post-imgs">' + imgs.join('') + '<div class="clearfix"></div></div>' +
            '<div class="post-text">' + post.message + '</div>' +
        '</div>');
    },

    renderPage: function () {
        var self = this;
        var posts = Core.list.posts.map(function (post, index) {
            return self.generatePost(post, index);
        });

        $('#thread-page-content').html(posts.join(''));
        $('.thread-name').text(Core.list.posts[0].title);
    }
};