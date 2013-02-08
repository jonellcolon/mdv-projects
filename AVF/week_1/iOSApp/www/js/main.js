
// Twitter API using mobiledev twitter feed.

$(document).ready(function(){
	$.getJSON("https://search.twitter.com/search.json?q=%20mobiledev&rpp=20?callback=?",
	function(data){
		console.log(data);
	for (i=0, j=data.results.length; i<j; i++){
		$("#twitter-output")
		.append("<li>" + "<p>" + "<img src='" + data.results[i].profile_image_url + "' /><br />" +
			data.results[i].text + ", <em>" + data.results[i].created_at + "</em>" + "</p>" + "</li>" + "</hr>");
	}
});
});

// Edmunds API with Key

$(document).ready(function(){
                $.getJSON('http://api.edmunds.com/v1/content/?category=reviews&fmt=json&api_key=rmdz7dy6gh4wang8ncnqh3ym&limit=0,5&callback=?', 
				function(data){
					console.log(data);
                    $.each(data, function(i, apiEdmunds){
                        $('#edmunds-output')
						.append("<li>" + "<p>" + data[i].title + " <br /><em>" + data[i].published + " <em>" + data[i].content + "</em>" + "</p>" + "</li>");
                    });
                });
            });		
			