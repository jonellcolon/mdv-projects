

$('#home').on('pageinit', function(){
	console.log("Home page loaded.");
});	



$('#engine').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/cars", {
    	success: function(data) {
    	console.log(data);
    		$('#engineview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#engineview').append(
    						$('<li>').append(
    								$('<a>')
    									.attr("href", "cars.html?cars=" + item.groups)
    									.text(item.ctype)
    					)
    				);
    		});
    		$('#engineview').listview('refresh');
    	}
    });
});


$('#cabin').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/cabin", {
    	success: function(data) {
    	console.log(data);
    		$('#cabinview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#cabinview').append(
    						$('<li>').append(
    								$('<a>')
    									.attr("href", "cars.html?cars=" + item.groups)
    									.text(item.ctype)
    					)
    				);
    		});
    		$('#cabinview').listview('refresh');
    	}
    });
});


$('#exhaust').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/exhaust", {
    	success: function(data) {
    	console.log(data);
    		$('#exhaustview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#exhaustview').append(
    				$('<li>').append(
    					$('<a>')
    						.attr("href", "cars.html?cars=" + item.groups)
    						.text(item.ctype)
    				)
    			);
    		});
    		$('#exhaustview').listview('refresh');
    	}
    });
});


$('#wheels').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/wheels", {
    	success: function(data) {
    	console.log(data);
    		$('#wheelsview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#wheelsview').append(
    				$('<li>').append(
    					$('<a>')
    						.attr("href", "cars.html?cars=" + item.groups)
    						.text(item.ctype)
    				)
    			);
    		});
    		$('#wheelsview').listview('refresh');
    	}
    });
});


$('#body').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/body", {
    	success: function(data) {
    	console.log(data);
    		$('#bodyview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#bodyview').append(
    				$('<li>').append(
    					$('<a>')
    						.attr("href", "cars.html?cars=" + item.groups)
    						.text(item.ctype)
    				)
    			);
    		});
    		$('#bodyview').listview('refresh');
    	}
    });
});


$('#trunk').on('pageinit', function() {
    $.couch.db("asdiproject").view("asdiproject/trunk", {
    	success: function(data) {
    	console.log(data);
    		$('#trunkview').empty();
    		$.each(data.rows, function(index, value) {
    			var item = (value.value || value.doc);
    			$('#trunkview').append(
    				$('<li>').append(
    					$('<a>')
    						.attr("href", "cars.html?cars=" + item.groups)
    						.text(item.ctype)
    				)
    			);
    		});
    		$('#trunkview').listview('refresh');
    	}
    });
});

$('#cars').on("pageshow", function(){
	var cars = urlVars()["cars"];
	console.log(cars);
	$.couch.db("asdiproject").view("asdiproject/cars", {
		startkey: "cars:" + cars
	});
});


var urlVars = function() {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};


// Edit and Delete Buttons

function makeItemLinks(key, couchLinksLi) {
	var editLink = $('#edit');
	$(editLink).key = key;
	$(couchLinksLi).append(editLink);
	var deleteLink = $('#delete');
	$(deleteLink).key = key;
	$(couchLinksLi).append(deleteLink);
};


// Data show on cars.html


$('#carsData').on('pageshow', function(){
	var view = urlVars();
	$.couch.db("asdiproject").view("asdiproject/cars", {
		success: function(data){
		console.log(data);
		$('#carsView').empty();
		$.each(data.rows, function (index, view){
			var id = view.value._id;
			var rev = view.value._rev;
			var groups = view.value.groups;
			var fullname = view.value.fullname;
			var phone = view.value.phone;
			var email = view.value.email;
			var cpart = view.value.cpart;
			var ctype = view.value.ctype;
			var special = view.value.special;
			$('#carsView').append(
						$('<li>')
							.append($('<li>').text(groups))
							.append($('<li>').text(fullname))
							.append($('<li>').text(phone))
							.append($('<li>').text(email))
							.append($('<li>').text(ctype))
							.append($('<li>').text(cpart))
							.append($('<li>').text(special))
							
						);
			var couchLinksLi = $('<li></li>').appendTo('#carsView');
			makeItemLinks(id, couchLinksLi);
			});
			$('#carsView').listview('refresh');
			}
	});
});



	/*$.ajax({
		url: '_view/cars',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
						'<ul>'+
							'<li>'+ groups +'</li>'+
							'<li>'+ fullname +'</li>'+
							'<li>'+ phone +'</li>'+
							'<li>'+ ctype +'</li>'+
							'<li>'+ cpart +'</li>'+
						'</ul>'+
					'</div>'
					).appendTo('#engine');
				
			});
			
		}
	});
});


$('#exhaust').on('pageinit', function(){
	
	$.ajax({
		url: '_view/exhaust',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
						'<ul>'+
							'<li>'+ groups +'</li>'+
							'<li>'+ fullname +'</li>'+
							'<li>'+ phone +'</li>'+
							'<li>'+ ctype +'</li>'+
							'<li>'+ cpart +'</li>'+
						'</ul>'+
					'</div>'
					).appendTo('#exhaust');
				
			});
			
		}
	});
});


$('#body').on('pageinit', function(){
	
	$.ajax({
		url: '_view/body',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
						'<ul>'+
							'<li>'+ groups +'</li>'+
							'<li>'+ fullname +'</li>'+
							'<li>'+ phone +'</li>'+
							'<li>'+ ctype +'</li>'+
							'<li>'+ cpart +'</li>'+
						'</ul>'+
					'</div>'
					).appendTo('#body');
				
			});
			
		}
	});
});


$('#trunk').on('pageinit', function(){
	
	$.ajax({
		url: '_view/trunk',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
						'<ul>'+
							'<li>'+ groups +'</li>'+
							'<li>'+ fullname +'</li>'+
							'<li>'+ phone +'</li>'+
							'<li>'+ ctype +'</li>'+
							'<li>'+ cpart +'</li>'+
						'</ul>'+
					'</div>'
					).appendTo('#trunk');
				
			});
			
		}
	});
});


$('#wheels').on('pageinit', function(){
	
	$.ajax({
		url: '_view/wheels',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
						'<ul>'+
							'<li>'+ groups +'</li>'+
							'<li>'+ fullname +'</li>'+
							'<li>'+ phone +'</li>'+
							'<li>'+ ctype +'</li>'+
							'<li>'+ cpart +'</li>'+
						'</ul>'+
					'</div>'
					).appendTo('#wheels');
				
			});
			
		}
	});
});


$('#cabin').on('pageinit', function(){
	
	$.ajax({
		url: '_view/cabin',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
							'<ul>'+
								'<li>'+ groups +'</li>'+
								'<li>'+ fullname +'</li>'+
								'<li>'+ phone +'</li>'+
								'<li>'+ ctype +'</li>'+
								'<li>'+ cpart +'</li>'+
							'</ul>'+
						'</div>'
					).appendTo('#cabin');
				
			});
			
		}
	});
});*/


$('#viewData').on('pageinit', function(){
	
	$.ajax({
		url: '_view/all',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, cars){
				console.log(cars);
				var groups = cars.value.groups;
				var fullname = cars.value.fullname;
				var phone = cars.value.phone;
				var ctype = cars.value.ctype;
				var cpart = cars.value.cpart;
				$(''+
						'<div data-role"listview">'+
							'<ul>'+
								'<li>'+ groups +'</li>'+
								'<li>'+ fullname +'</li>'+
								'<li>'+ phone +'</li>'+
								'<li>'+ ctype +'</li>'+
								'<li>'+ cpart +'</li>'+
							'</ul>'+
						'</div>'
					).appendTo('#viewData');
				
			});
			
		}
	});
});


$('#contact').on('pageinit', function(){
	//code needed for contact page goes here.
});


$('#tweets').on('pageinit', function(){
	
		
});


$('#list').on('pageinit',function() {
    
	var partMode,
		submit = $('#submit');
		function resetForm(){
				window.location.reload();
		}

// Select Menu Script
$(document).on('mobileinit',function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});

// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = $('#mode');
		for(var i=0; i < radios.length; i++){
			if(radios[i].checked){
				partMode = radios[i].value;
			}
		}

	};

	function toggle(n){
		switch(n){
			case "on":
				$('#partList').css("display", "none");
				$('#clear').css("display", "inline");
				$('#displayLink').css("display", "none");
				$('#addNew').css("display", "inline");
				break;
			case "off":	
				$('#partList').css("display", "block");
				$('#clear').css("display", "inline");
				$('#storeData').css("display", "inline");
				$('#addNew').css("display", "inline");
				$('#items').css("display", "none");
				break;
			default:
				return false;
		}
	};

	var storeData = function (key){
		//if the is no key, this is means this is a brand new item and need new key.
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		
		var item		= {};
			item.groups	= ["Group: ", $('#groups').val()];
			item.fullname = ["Full Name: ", $('#fullname').val()];
			item.phone	= ["Phone Number: ", $('#phone').val()];
			item.email	= ["E-Mail: ", $('#email').val()];
			item.cpart	= ["Car Part: ", $('#cpart').val()];
			item.hmany	= ["How Many: ", $('#hmany').val()];
			item.ctype	= ["Car Type: ", $('#ctype').val()];
			item.cmodel	= ["Car Model: ", $('#cmodel').val()];
			item.ycar	= ["Car Year: ", $('#ycar').val()];
			item.mode	= ["Value: ", partMode];
			item.date	= ["Date: ", $('#date').val()];
			item.special	= ["Special Request: ", $('#special').val()];

			//Save data to Local Storage: Stringify.
			localStorage.setItem(id, JSON.stringify(item));
			alert("Part Information Saved!");
			$.mobile.changePage("#list");
			
	};

	$.validator.setDefaults({
    	ignore: ""
	});

    function validate(){
        var parsePartListForm = function(data){
            storeData(key);
        };
        $(document).ready(function(){
            var pList = $('#partList');
            pList.validate({
                invalidHandler: function(form, validator){},
                submitHandler: function(){
                    var data = pList.serializeArray();
                    parsePartListForm(data);
                }
            });
        });
    }
	
	var getData = function (){
		toggle('on');
		if(localStorage.length === 0){
			alert("There is no data in local storage, default data added.");
			autoFillData();
		}
		
	};
		// Write Data into Local Storage
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		$('#list').append(makeDiv);
		$('#items').show();
		for(var i=0, len=localStorage.length; i < len;i++){
			var makeli = $('<li>');
			var linksLi = $('<li>');
			makeList.appendTo(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $('<ul>');
			makeli.append(makeSubList);
			//getImage(obj.groups[1],makeSubList);
			for(var n in obj){
				var makeSubli = $('<li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0] +" "+ obj[n][1];
				makeSubli.text(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links.

	};

	

//Get the image for the right  category
	function getImage(groups, makeSubList){
		var imageLi = $('<li></li>');
		$(makeSubList).append(imageLi);
		var newImg = $('<img>');
		var setSrc = newImg.attr("src", "images/" + groups + ".png");
		$('imageLi').append(newImg);	
	};

//Auto Populate Local Storage
	function autoFillData(){
		//Store JSON into local storage.
		for (var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}

	};

//Make items links
	function makeItemLinks(key, linksLi){
		
// add edit single item link
		var editLink = $('<a>');
		editLink.href= "#";
		editLink.id = "editLink";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.on('click', editItem);
		editLink.html(editText);
		linksLi.append(editLink);

// Add line break
		var breakTag = $('<br>');
		linksLi.append(breakTag);

// Add delete single item link
		var deleteLink = $('<a>');
		deleteLink.href = "#";
		deleteLink.attr("id", "deleteItem");
		deleteLink.key = key;
		var deleteText = "Delete Item";
		$(deleteLink).on('click', deleteItem);
		//deleteLink.html(deleteText);
		linksLi.appendTo(deleteLink);
		};
		
		function editItem(key){
// Grab the data from our item.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		var save = $('submit');
		
		//Show the form.
		toggle("off");
		console.log("Am want to show you.");
		// Populate the form field.
		$('#groups').value(item.groups[1]);
		$('#fullname').value(item.fullname[1]);
		$('#phone').value(item.phone[1]);
		$('#email').value(item.email[1]);
		$('#cpart').value(item.cpart[1]);
		$('#hmany').value(item.hmany[1]);
		$('#ctype').value(item.ctype[1]);
		$('#cmodel').value(item.cmodel[1]);
		$('#ycar').value(item.ycar[1]);
		var radios = document.forms[0].mode;
		for (var i=0; i<radios.length; i++){
			if(radios[i].val == "Used" && item.mode[1] == "Used"){
				radios[i].attr("checked", "checked");
			}else if (radios[i].val == "New" && item.mode[1] == "New"){
				radios[i].attr("checked", "checked");
			}
		}
		$('#date').val(item.date[1]);
		$('#special').val(item.special[1]);

		//Remove the initial listener from input 
		submitData.removeEventListener('click', submit);
		//Change Submit button value to edit button
		$('#submit').value = "Edit Content";
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property
		editSubmit.addEventListener('click', validate);
		editSubmit.key = key;	
	};
	
// Delete Item Data
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete item?");
		if (ask){
			localStorage.removeItem(this.key);
			alert("Item was deleted!");
			window.location.reload();
		}else{
			alert("Item was NOT deleted.");
		}

	};

//Clear Local Storage
	function clearLocal (){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data is deleted!");
			window.location.reload();
			return false;
		}
	};

// Date Picker Script
	//reset type=date inputs to text
  $(document).on("mobileinit", function(){
    $.mobile.page.prototype.options.degradeInputs.date = true;
  });

// Set Link & Submit Click Events
	$('#displayLink').on('click', getData);
	$('#clear').on('click', clearLocal);
	$('#submit').on('click', validate);

})


function listTweets(data) {
	var output = '<ul data-role="listview" data-theme="c">';
	
	$.each(data, function(key, val) {
		var text = data[key].text;
		var thumbnail = data[key].user.profile_image_url;
		var name = data[key].user.name;
		
			text=text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(i) {
			var url=i.link(i);
			return url;
		});
		
		text=text.replace(/[@]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("@",'');
			var	url = i.link("http://twitter.com/"+ item);
			return url;
		});
		
		text=text.replace(/[#]+[A-Za-z0-9-_]+/g, function(i) {
			var item = i.replace("#", '%23');
			var url = i.link("http://search.twitter.com/search?q="+item);
			return url;
		});
		
		output += '<li>';
		output += '<img src="' + thumbnail +'" alt="Photo of ' + name + '">';
		output += '<div>' + text + '</div>';
		output += '</li>';		
	}); //go through each tweet
	output += '</ul>';
	$('#tweetlist').html(output);
	
}