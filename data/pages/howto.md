#HowTo
Here you find an introduction to Owlypress and the FAQ.

##Get Owlypress

You can get Owlypress from the official GiHub repository, either by cloning the repository, or by downloading the ZIP-file. You need to extract the ZIP-file after downloading

##Installation

Upload the files to your webserver (without the ZIP-file) and you are ready to go.


##Configuration
Since you do not want to host a second Owlypress site, you should make some changes to the config.js file in the js directory. Below is a table with the options you can set. This table will be extended, if configuration options are added.

<table class="table">
<tr>
	<th>Option</th>
	<th>Description</th>
	<th>Default</th>
	<th>Possible values / notes</th>
	<th>not used</th>
</tr>
<tr>
	<td>title</td>
	<td>Title of your blog</td>
	<td>Owlypress</td>
	<td>Any name you can think of</td>
</tr>
<tr>
	<td>author</td>
	<td>Your name or pseudonym</td>
	<td></td>
	<td>You might need to change the encoding in the template if you have a non UTF-8 	name</td>
	<td>X</td>
</tr>
<tr>
	<td>email</td>
	<td>Your email adress, enables email button in social media bar</td>
	<td></td>
	<td>works best with email adresses</td>
</tr>
<tr>
	<td>twitter</td>
	<td>enables twitter button in social media bar</td>
	<td></td>
	<td>Twitter usernames</td>
</tr>
<tr>
	<td>github</td>
	<td>Link to a github profile or project</td>
	<td></td>
	<td>a github username (e.g. euleule) or project (e.g. euleule/owlypress)</td>
</tr>
<tr>
	<td></td>
	<td></td>
	<td></td>
	<td></td>
</tr>
</table>

##Publish posts and pages

You can publish your blog posts by uploading them to the *data/posts/* directory in your Owlypress folder on your webserver. Posts will be visible in the Blog.

You can publish static pages by uploading them to the *data/pages* directory in your Owlypress directory on your server. Pages are visible in the menu bar.


##FAQ

Currently no questions were asked. If you have a Question feel free to [ask](?type=page&id=Contact.md)