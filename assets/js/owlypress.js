(function () {
    "use strict";
    var converter = new Markdown.Converter();
    var postCache = {};
    var pageCache = {};
    var nPosts;

    // get a list of all pages and call the render menu func
    var getPages = function () {
        $.ajax({
            url: "pages",
            type: "get",
            success: function (responseData) {
                renderMenu(responseData['files']);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
            }
        });
    }();

    // get first number of posts and render them to context area
    var loadPosts = function (number) {
        $('#content').replaceWith('<div id="content"></div>');
        $.ajax({
            url: "getPosts/" + number,
            type: "get",
            success: function (response) {
                console.log(response);
                if (response.more) {
                    $('#loadmore').show();
                } else {
                    $('#loadmore').hide();
                }

                $.each(response.ids, function (index, postId) {
                    getPost(postId, true);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
            }
        });
    };

    // get page by id and render it to the content area
    var getPage = function (pageId) {
        if (pageCache.hasOwnProperty(pageId)) {
            renderPage(pageCache[pageId]);
        } else {
            $.ajax({
                url: "pages/" + pageId,
                type: "get",
                success: function (responseData) {
                    renderPage(responseData.content);
                    pageCache[pageId] = responseData.content;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
                }
            });
        }
    };

    var renderPage = function (content) {
        $('#content').replaceWith('<div class="well" id="content">' + converter.makeHtml(content) + '</div>');
        $('#loadmore').hide();
    };

    // get post by id and render it to content area
    var getPost = function (postId, append) {
        append = typeof append !== 'undefined' ? append : false;

        if (postCache.hasOwnProperty(postId)) {
            renderPost(postCache[postId], postId, append);
        } else {
            $.ajax({
                url: "posts/" + postId,
                type: "get",
                success: function (responseData) {
                    renderPost(responseData.content, postId, append);
                    postCache[postId] = responseData.content;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
                }
            });
        }
    };

    var renderPost = function (content, postId, append) {
        if (append) {
            var link = buildLink('post', postId);
            var pageLink = "<p class=\"muted\">Link: <a href=\"" + link + "\" class=\"muted post-link\" data-id=\"" + postId + "\">" + link + "</a></p>";

            var post = '<div class="post well">';
            post += converter.makeHtml(content);
            post += pageLink;

            post += '</div>';

            $('#content').append(post);

        } else {
            $('#content').replaceWith('<div class="well" id="content">' + converter.makeHtml(content) + '</div>');
            $('#loadmore').hide();
        }
    };

    // load page or post initially, if it is specified
    if (loadWith !== undefined) {
        if (loadWith['type'] == 'page') {
            getPage(loadWith['id']);
        } else if (loadWith['type'] == 'post') {
            getPost(loadWith['id']);
        } else {
            loadPosts(owlypressConfig["initialPosts"]);
            nPosts = owlypressConfig["initialPosts"];
        }
    } else {
        loadPosts(owlypressConfig["initialPosts"]);
        nPosts = owlypressConfig["initialPosts"];
    }

    // render home and pages menu
    var renderMenu = function (pageList) {

        // build home menu item
        $('#page-menu').append('<li><a href="" id="home-link">Home</a></li>');

        $("#home-link, #pageTitle").on("click", function (event) {
            event.preventDefault();
            loadPosts(owlypressConfig["initialPosts"]);
            nPosts = owlypressConfig["initialPosts"];
        });

        // build menu items for each page
        $.each(pageList, function (index, element) {
            var link = $('<li><a href="">' + element.replace(/\.[^/.]+$/, "") + '</a></li>');
            $(link).click({'page': element}, function (event) {
                event.preventDefault();
                getPage(event.data.page);
            });
            $('#page-menu').append(link);
        });
    };

    var buildLink = function (type, id) {
        return type + "/" + id;
    };

    // render configuration object and build additional page elements
    var renderConfig = function () {
        // render page title
        if (owlypressConfig.hasOwnProperty('title')) {
            $('#pageTitle').html(owlypressConfig["title"]);
        }

        // render social media icons
        if (owlypressConfig.hasOwnProperty('email')) {
            $('#socialmedia').append('<li><a href="mailto:' + owlypressConfig['email'] + '"><img src="assets/img/email.png" alt="Email"></a></li>');
        }
        if (owlypressConfig.hasOwnProperty('twitter')) {
            $('#socialmedia').append('<li><a href="https://twitter.com/#!/' + owlypressConfig['twitter'] + '"><img src="assets/img/twitter.png" alt="Twitter"></a></li>');
        }
        if (owlypressConfig.hasOwnProperty('github')) {
            $('#socialmedia').append('<li><a href="https://github.com/' + owlypressConfig['github'] + '"><img src="assets/img/github.png" alt="GitHub"></a></li>');
        }

        // render credits for footer
        var credit = "";
        if (owlypressConfig.hasOwnProperty('author')) {
            if (owlypressConfig.hasOwnProperty('title')) {
                credit += owlypressConfig["title"] + " is made with love by ";
            } else {
                credit += "Made with love by ";
            }
            credit += owlypressConfig["author"] + ". ";
        }
        credit += "Powerd by <a href=\"http://owlypress.net\">Owlypress</a>.";
        $("#credit").html(credit);
    }();

    $('#loadmore').click(function () {
        nPosts++;
        loadPosts(nPosts);
    }).tooltip();

    $("body").on("click", ".post-link", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        getPost(id);
    });
})();
