$('#viewData').on("pageshow", function(){
	$.couch.db("asdiproject").view("asdiproject/cars",{
			success: function(data) {
			$('#viewAll').empty();
			$.each(data.rows, function(index, value){
				var id = value.id;
				var item = (value.value || value.doc);
				 $('#viewAll').append(
				 	$('<li>').append(
				 		$('<a>').attr("href", "cars.html?entry=" + id)
				 		.html('<h3>'+item.groups+'</h3>'+
				 			  '<p>'+item.ctype+'</p>'
				 		)
				 	)
				 );		 
			}); 
			$('#viewAll').listview('refresh');
		}
	});
});


var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};



$('#cars').on("pageshow", function(){
	var entry = urlVars()["cars"];

	$.couch.db("asdiproject").openDoc(cars, {
    	success: function(data) {
    			var groups = data.groups;
				var fullname = data.fullname;
				var phone = data.phone;
				var email = data.email;
				var ctype = data.ctype;
        	$('<div>' + 
        		'<ul>' + 
        			'<li>Group: '+ groups +'</li>'+
					'<li>Full Name: '+ fullname +'</li>'+
					'<li>Phone: '+ phone +'</li>'+
					'<liEmail: '+ email +'</li>'+
					'<li>Car Type: '+ ctype +'</li>'+
					'<li><a href="#" id="edititem">Edit Car</a></li>' + 
		        	'<li><a href="#" id="deleteitem">Delete Car</a></li>'+
		        '</ul>'+
			'</div>' 
        	  
        	).appendTo('#carsView');
        	
        	$('#deleteitem').on('click', function(){
        		var ask = confirm("Are you sure you want to delete?");
        		if(ask) {
        		$.couch.db("asdiproject").removeDoc(data, {
        			
        			success: function(data) {
        				console.log(data);
        				document.location.href = 'main.html';
        			},
        			error: function(status) {
        				console.log(status);
        			}
        		});
        		}else{ 
        			alert("Data not removed.");
        			document.location.href = 'main.html';
        		}
        	});
        }
	});
});




$('#edititem').on('click', function(){
	var entry = urlVars()["cars"];
	$.mobile.changePage("main.html#additem");
	$.couch.db("asdiproject").openDoc(cars, {
    	success: function(data) {
    		groups = data.groups;
    		fullname = data.fullname;
    		phone = data.phone;
    		email = data.email;
    		ctype = data.ctype;
			$('#groups').value(groups);
		    $('#fullname').value(fullname);
		    $('#phone').value(phone);
			$('#email').value(email);
		    $('#ctype').value(ctype);
        
			// show edit item button, hide submit button
			var editLink = $('#edit-link').css('display', 'block');
			var resetLink = $('#submit-link').css('display', 'none');
			var listView = $('#list').css('display', 'none');

			// save changes
			$('#edit-item').bind('click', function(){
				console.log("edit-item button was pressed");
				var jtitle = $('#jtitle').val();
			    var jdate = $('#jdate').val();
			    var groups = $('#groups').val();
				var rating = $('#rating').val();
			    var notes = $('#notes').val();
			    var item = {
					"_id": data._id,
					"_rev": data._rev,
					"jtitle": jtitle,
					"jdate": jdate,
					"groups": groups,
					"rating": rating,
					"notes": notes		
					};
					console.log(item);

				$.couch.db("asdiproject").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Entry updated!");
						document.location.href = 'main.html';
					},
					error: function(status) {
        				console.log(status);
        				alert("Entry was not updated.");
    				}
				});
			return false;
			});
		}
	});

});



$('#submit').on('click', function(){
		var groups = $("#groups").value();
		var fullname = $("#fullname").value();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var ctype = $("#ctype").val();
		var item = {
				"_id": "cars:" + groups,
				"fullname": fullname, 
				"phone": phone, 
				"email": email,  
				"ctype": ctype
    };
		console.log(item);
			$.couch.db("asdiproject").saveDoc(item, {
				success: function(data) {
				console.log(data);
				alert("Car Saved.");
				document.location.href = 'main.html'; 
		},
			error: function(status) {
				console.log(status);
				alert("Car not saved.");
		}
	});
			return false;

});