<!doctype html>
<html>
<head>
    <link href="js/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="js/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
    <link href="css/owlypress.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

<script src="config.js"></script>

<?php 
if($this->data['type'] != '' && $this->data['id']!= ''){
?>
<script> var loadWith = {
	'type' : '<?php print strip_tags($this->data['type']); ?>',
	'id' : '<?php print strip_tags($this->data['id']); ?>'
};
</script>
<?php
}else{
?>
<script> var loadWith = undefined; </script>
<?php
}
?>
</head>
<body>
<div class="container-narrow">
	<div class="masthead">
    	<ul class="nav nav-pills pull-right" id="page-menu">

       	</ul>
   	    <a href="#"><h3 class="muted" id="pageTitle">Owlypress</h3></a>
    </div>

	<div id="content">

	</div>
	
	<div id="socialmedia_iconbar">
		<ul id="socialmedia">
			
		</ul>
	</div>
</div>

<div id="footer">
    <div class="container">
        <p class="muted credit" id="credit">

        </p>
	</div>
</div>

<script src="http://code.jquery.com/jquery-1.9.0.min.js"></script>
<script src="js/bootstrap/js/bootstrap.min.js"></script>
<script src="js/pagedown/Markdown.Converter.js"></script>
<script src="js/owlypress.js"></script>

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
</body>
</html>