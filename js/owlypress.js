(function(){
    "use strict";
	var converter = new Markdown.Converter();
	
	$('#pageTitle').html($owlypressConfig["title"])

    // get page list, build menu
    var getPages = function(){
    	$.ajax({
			url : "app.php/pages",
			type : "get",
			success : function (responseData) {
				renderPages(responseData['files']);
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	}();
	
	// get first n posts
	var loadPosts = function(number){
		$.ajax({
			url : "app.php/posts/"+number,
			type : "get",
			success : function (responseData) {
				renderPosts(responseData);
			},
			error: function(jqXHR, textStatus, errorThrown){
				$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
			}
		});
	};
	
	loadPosts($owlypressConfig["initialPosts"]);
	
	// render page menu
	var renderPages = function(pageList){
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
				$.ajax({
					url : "app.php/page/" + event.data.page,
					type : "get",
					success : function (responseData) {
						$('#content').replaceWith('<div class="well" id="content">' + converter.makeHtml(responseData.content) + '</div>');
					},
					error: function(jqXHR, textStatus, errorThrown){
						$('#content').replaceWith('<div id="content" style="padding-top:60px;">' + jqXHR.responseText + '</div>');
					}
				});
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