(function(){
    "use strict";
	var converter = new Markdown.Converter();

    // get a list of all pages and call the render menu func
    var getPages = function(){
    	$.ajax({
			url : "index.php/pages",
			type : "get",
			success : function (responseData) {
				renderMenu(responseData['files']);
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	}();
	
	// get first number of posts and render them to context area
	var loadPosts = function(number){
		$.ajax({
			url : "index.php/getPosts/"+number,
			type : "get",
			success : function (responseData) {
				renderPosts(responseData);
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	};
	
	// get page by id and render it to the content area
	var getPage = function(pageId){
		$.ajax({
			url : "index.php/pages/" + pageId,
			type : "get",
			success : function (responseData) {
				$('#content').replaceWith('<div class="well" id="content">' + converter.makeHtml(responseData.content) + '</div>');
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	};
	
	// get post by id and render it to content area
	var getPost = function(postId){
		$.ajax({
			url : "index.php/posts/" + postId,
			type : "get",
			success : function (responseData) {
				$('#content').replaceWith('<div class="well" id="content">' + converter.makeHtml(responseData.content) + '</div>');
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	};
	
	// load page or post initially, if it is specified
	if(loadWith !== undefined){
		if(loadWith['type'] == 'page'){
			getPage(loadWith['id']);
		}else if(loadWith['type'] == 'post'){
			getPost(loadWith['id']);
		}else{
			loadPosts(owlypressConfig["initialPosts"]);
		}
	}else{
		loadPosts(owlypressConfig["initialPosts"]);
	}
	
	// render home and pages menu
	var renderMenu = function(pageList){
	
		// make blog title clickable
		$('#pageTitle').click(function(){
			var func = loadPosts;
			
			return function(){
				func(10);
			};
		}());
		
		// build home menu item
		var link = $('<li><a href="#">Home</a></li>');
		$(link).click(function(){
			var func = loadPosts;
			
			return function(){
				func(10);
			};
		}());
		$('#page-menu').append(link)
		
		// build menu items for each page
		$.each(pageList, function(index, element){
			link = $('<li><a href="#">' + element.replace(/\.[^/.]+$/, "") + '</a></li>');
			$(link).click( {'page':element},function(event){
				getPage(event.data.page);
			});
			$('#page-menu').append(link);
		});
	};
	
	// render a list of posts to the content area
	var renderPosts = function(postData){
		$('#content').replaceWith('<div id="content"></div>');
		$.each(postData, function(index, post){
			$('#content').append('<div class="post well">'+converter.makeHtml(post)+"</div>");
		});
	}
	
	// render configuration object and build additional page elements
	var renderConfig = function(){
		// render page title
		if(owlypressConfig.hasOwnProperty('title')){
			$('#pageTitle').html(owlypressConfig["title"]);
		}
		
		// render social media icons
		if(owlypressConfig.hasOwnProperty('email')){
			$('#socialmedia').append('<li><a href="mailto:' + owlypressConfig['email'] + '"><img src="img/email.png" alt="Email"></a></li>');
		}
		if(owlypressConfig.hasOwnProperty('twitter')){
			$('#socialmedia').append('<li><a href="https://twitter.com/#!/' + owlypressConfig['twitter'] + '"><img src="img/twitter.png" alt="Twitter"></a></li>');
		}
		if(owlypressConfig.hasOwnProperty('github')){
			$('#socialmedia').append('<li><a href="https://github.com/' + owlypressConfig['github'] + '"><img src="img/github.png" alt="GitHub"></a></li>');
		}

		// render credits for footer
		var credit = "";
		if(owlypressConfig.hasOwnProperty('author')){
			if(owlypressConfig.hasOwnProperty('title')){
				credit += owlypressConfig["title"] + " is made with love by ";
			}else{
				credit += "Made with love by ";
			}
			credit += owlypressConfig["author"] + ". ";
		}
		credit += "Powerd by <a href=\"http://owlypress.net\">Owlypress</a>.";
		$("#credit").html(credit);
	}();
})();