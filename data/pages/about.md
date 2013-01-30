#About

**Owlypress** is a simple, static blog engine. There is already a wide variety of blog 
engines on the internet. Unfortunatly none of them did what I was looking for (or I was to lazy to find them). So I wrote Owlypress to fit exactly fit my needs. Some things I had in mind where:

* **no **(or close to no)** backend**, I want to keep the requirements to host Owlypress as low as possible
* **easy installation**, e.g. copy it to your webserver
* **configuration > customization**, most changes should be possible with configuration instead of changing code
* **no databases**, they make things more complex by increasing the required infrastructure
* **work with static files**, so i can post with git. I like git <3
* **dynamic page feel**, static pages are annoying, also I dislike page reloads

So my idea was to build a very simple PHP backend, which only supplies some Controllers and delivers some JavaScript, that does renders the page and loads the required contents, to the client. 



Owlypress uses:

* [Slimframework](http://slimframework.com/) for the PHP backend
* [jQuery](http://jquery.com/) for common JavaScript magic
* [PageDown](http://code.google.com/p/pagedown/) for rendering MarkDown to HTML
* [Bootstrap](http://twitter.github.com/bootstrap/), because web pages are more beautiful with it
* [Glyphicons](http://glyphicons.com/) for the neat icons
