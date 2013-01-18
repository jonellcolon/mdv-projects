
// Twitter API using mobiledev twitter feed.

$(function(){
	$.getJSON("https://search.twitter.com/search.json?q=%20mobiledev&rpp=20",
	function(data){
		console.log(data);
	for (i=0, j=data.results.length; i<j; i++){
		$("#twitter-output")
		.append("<hr>" + "<li>" + "<p>" + "<img src='" + data.results[i].profile_image_url + "' /><br />" +
			data.results[i].text + ", <em>" + data.results[i].created_at + "</em>" + "</p>" + "</li>" + "</hr>");
	}
});
});

// Edmunds API with API Key

$(function(){
	$.getJSON("http://api.edmunds.com/v1/content/?category=reviews&fmt=json&api_key=rmdz7dy6gh4wang8ncnqh3ym&limit=0,5",
	function(data){
		console.log(data);
	for (i=0, j=data.length; i<j; i++){
		$("#edmunds-output")
		.append( "<hr>" + "<li>" + "<p>" + data[i].title + ", <em>" + data[i].published + ", <em>" + data[i].content + "</em>" + "</p>" + "</li>" + "</hr>");
	}
});
});

