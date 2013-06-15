$(document).ready(function(){

// Instagram pulling #fellowshiporlando

$.ajax({
    type: "GET",
    dataType: 'jsonp',
    cache: false,
    url: "https://api.instagram.com/v1/tags/fellowshiporlando/media/recent?count=20&access_token=10239.2fa8a45.08f28ab239bf42a29a70321b2bad4ef0&callback=?",
    timeout: 10000,
    success: function(data){
		console.log(data);
    for (var i = 0; i < 20; i++){

            $("#instagramPics").append("<div>" + data.data[i].caption.from.username + "<br />" + "<a target='_blank' href='" + data.data[i].link +"'><img class='instagram-image' src='" + data.data[i].images.standard_resolution.url +"' /></a>" + "<p>" + "Likes: " + data.data[i].likes.count + "</p>" + "<br />" + data.data[i].caption.text + "</div>");

          }
    }
});
		

// Edmunds API with Key

                $.getJSON('http://api.edmunds.com/v1/content/?category=reviews&fmt=json&api_key=rmdz7dy6gh4wang8ncnqh3ym&limit=0,5&callback=?', 
				function(data){
					console.log(data);
                    $.each(data, function(i, apiEdmunds){
                        $('#edmunds-output')
						.append("<li>" + "<p>" + data[i].title + " <br /><em>" + data[i].published + " <em>" + data[i].content + "</em>" + "</p>" + "</li>");
           });
 	});
});