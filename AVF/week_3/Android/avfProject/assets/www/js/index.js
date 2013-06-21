$(document).ready(function(){

// Instagram pulling #fellowshiporlando

$.ajax({
    type: "GET",
    dataType: 'jsonp',
    cache: false,
    url: "https://api.instagram.com/v1/tags/fellowshiporlando/media/recent?count=20&access_token=10239.2fa8a45.08f28ab239bf42a29a70321b2bad4ef0&callback=?",
    timeout: 10000,
    success: function(data){
		//console.log(data);
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



// Geolocation

	$("#geolocationPage").bind('pageshow', function() {
					navigator.geolocation.getCurrentPosition(onSuccess, onError);
				});

			
				function onSuccess(position) {
					var element = document.getElementById('geolocation');
					element.innerHTML = '<li>' + 'Latitude: '           + position.coords.latitude              + '</li>' + '<br />' +
										'<li>' + 'Longitude: '          + position.coords.longitude             + '</li>' + '<br />' +
										'<li>' + 'Altitude: '           + position.coords.altitude              + '</li>' + '<br />' +
										'<li>' + 'Accuracy: '           + position.coords.accuracy              + '</li>' + '<br />' +
										'<li>' + 'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '</li>' + '<br />' +
										'<li>' + 'Heading: '            + position.coords.heading               + '</li>' + '<br />' +
										'<li>' + 'Speed: '              + position.coords.speed                 + '</li>' + '<br />' +
										'<li>' + 'Timestamp: '          + position.timestamp          		   	+ '</li>' + '<br />';
				}

				
				function onError(error) {
					alert('code: '    + error.code + '\n' +
							'message: ' + error.message + '\n');
				}		



// Accelerometer Page

$(document).bind('deviceready', function(){
	var watchId = 0;
	
	$('#btnWatch').bind('touchstart', function(){
		if(watchId == 0)
		{
			watchId = navigator.accelerometer.watchAcceleration(function(acceleration){
				$('#txtX').attr('value', acceleration.x);
				$('#txtY').attr('value', acceleration.y);
				$('#txtZ').attr('value', acceleration.z);
			}, function(error){
				console.log('Error');
			}, {
				frequency: 100
			} );
			
			$('#btnWatch').html('Stop Watching');
		} else {
			navigator.accelerometer.clearWatch(watchId);
			$('btnWatch').html('Watch Accelerometer');
			watchId = 0;
		}
			
	});
		
		
});



// Network Connection

$(document).ready(function() {
	
	$('#btnCheck').click(checkConnect); 
	
	function checkConnect() {
        var network = navigator.connection.type;

        var connect = {};
        connect[Connection.UNKNOWN]  = 'Unknown Connection';
        connect[Connection.ETHERNET] = 'Ethernet Connection';
        connect[Connection.WIFI]     = 'WiFi Connection';
        connect[Connection.CELL_2G]  = 'Cell 2G Connection';
        connect[Connection.CELL_3G]  = 'Cell 3G Connection';
        connect[Connection.CELL_4G]  = 'Cell 4G Connection';
        connect[Connection.CELL]     = 'Cell Generic Connection';
        connect[Connection.NONE]     = 'NO Network Connection';

        alert('Connection Type: ' + connect[network]);
    }   
});


// Device API

document.addEventListener("deviceready", onDeviceReady, false);
 	function onDeviceReady() {;
  	var html = "";
  		html = html + "<li>" + 'Device Name: ' + device.name + "</li>";
  		html = html + "<li>" + 'Device Cordova: ' + device.cordova + "</li>";
  		html = html + "<li>" + 'Device Platform: ' + device.platform + "</li>";
  		html = html + "<li>" + 'Device UUID: ' + device.uuid + "</li>";
  		console.log(html);

  	$("#deviceProperties").html(html);
  	$("#deviceProperties").listview('refresh');
 }
 
 
