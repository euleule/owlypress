(function(){
    //"use strict";
	var converter = new Markdown.Converter();
	
	$('#pageTitle').html($owlypressConfig["title"])

    // get page list, build menu
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
	
	// get first n posts
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
	
	if(loadWith !== undefined){
		if(loadWith['type'] == 'page'){
			getPage(loadWith['id']);
		}else if(loadWith['type'] == 'post'){
			getPost(loadWith['id']);
		}
	}else{
		loadPosts($owlypressConfig["initialPosts"]);
	}
	
	// render menu
	var renderMenu = function(pageList){
		var link = link = $('<li><a href="#">Home</a></li>');

		$(link).click(function(){
			var func = loadPosts;
			
			return function(){
				func(10);
			};
		}());
		$('#page-menu').append(link)
		
		$.each(pageList, function(index, element){
			link = $('<li><a href="#">' + element.replace(/\.[^/.]+$/, "") + '</a></li>');
			$(link).click( {'page':element},function(event){
				getPage(event.data.page);
			});
			$('#page-menu').append(link);
		});
	};
	
	var renderPosts = function(postData){
		$('#content').replaceWith('<div id="content"></div>');
		$.each(postData, function(index, post){
			$('#content').append('<div class="post well">'+converter.makeHtml(post)+"</div>");
		});
	}
})();