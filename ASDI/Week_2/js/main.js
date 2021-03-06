

// JSON DATA

/*$('#jsonData').on("pageinit", function(){
	$('#jsonlist').empty();
	$.ajax({
		url: "xhr/data.json",
		type: "GET",
		dataType: "json",
		success: function(response){
			console.log(response);
				for (var i = 0 , j = response.car.length; i<j; i++){
					var part = response.car[i];
					$(''+
						'<li>' +
								'<img src="images/' + part.groups[1] + '.png">' +
								'<p>' + part.fullname[0] + part.fullname[1] +'</p>'+
								'<p>' + part.phone[0] + part.phone[1] +'</p>'+
								'<p>' + part.email[0] + part.email[1] +'</p>'+
								'<p>' + part.cpart[0] + part.cpart[1] +'</p>'+
								'<p>' + part.hmany[0] + part.hmany[1] +'</p>'+
								'<p>' + part.ctype[0] + part.ctype[1] +'</p>'+
								'<p>' + part.cmodel[0] + part.cmodel[1] +'</p>'+
								'<p>' + part.ycar[0] + part.ycar[1] +'</p>'+
								'<p>' + part.mode[0] + part.mode[1] +'</p>'+
								'<p>' + part.special[0] + part.special[1] +'</p>'+
						'</li>'
					).appendTo('#jsonlist');
				};
		},
		error: function(result){ console.log(result);}
	});

});
*/
var content = '<ul data-role="listview" data-theme="c">';
$.getJSON("xhr/data.json",
	function(data){
		$.each(data.car, function(i,car){
			content += '<li>';
			content += '<p>' + car.groups + '</p>';
			content += '<p>' + car.fullname + '</p>'; 
			content += '<p>' + car.phone + '</p>';
			content += '<p>' + car.email + '</p>';
			content += '<p>' + car.cpart + '</p>';
			content += '<p>' + car.hmany + '</p>';
			content += '<p>' + car.ctype + '</p>';
			content += '<p>' + car.cmodel + '</p>';
			content += '<p>' + car.ycar + '</p>';
			content += '<p>' + car.mode + '</p>';
			content += '<p>' + car.special + '</p>';
			content += '</li>';
			content += '</ul>';
			$(content).appendTo("#jsonlist");
	});
});
	

// XML DATA

$('#xmlData').on('pageinit',function(){
		$('#xmllist').empty();
		$.ajax({
			url		: "xhr/data.xml",
			type	: "GET",
			dataType: "xml",
			success	: function(xml){
				$(xml).find("part").each(function(){
					var car = {};
					    car.groups 		= $(this).find("groups").text();
					    car.fullname 			= $(this).find("fullname").text();
					    car.phone 		= $(this).find("phone").text();
					    car.email 			= $(this).find("email").text();
					    car.cpart 			= $(this).find("cpart").text();
						car.hmany 		= $(this).find("hmany").text();
					    car.ctype 			= $(this).find("ctype").text();
					    car.cmodel 			= $(this).find("cmodel").text();
						car.ycar 			= $(this).find("ycar").text();
						car.special 			= $(this).find("special").text();
						console.log(car);
						
							$(''+ '<ul data-role="listview" data-theme="c">' +
									'<li>' +
											'<img src="images/' + car.groups + '.png">' +
											'<p>' + car.fullname +'</p>' + 
											'<p>' + car.phone +'</p>' +
											'<p>' + car.email +'</p>' +
											'<p>' + car.cpart +'</p>' +
											'<p>' + car.hmany +'</p>' +
											'<p>' + car.ctype +'</p>' +
											'<p>' + car.cmodel +'</p>' +
											'<p>' + car.ycar +'</p>' +
											'<p>' + car.mode +'</p>' +
											'<p>' + car.special +'</p>' +
									'</li>' +
								'</ul>'
							).appendTo('#xmllist');
				});
			}

		});

	});	



// CSV DATA


$('#csvData').on('pageinit',function(){
		$.ajax({
			url		: "xhr/data.csv",
			type	: "GET",
			dataType: "text",
			success	: function(csv){
				console.log(csv);
				var cars = csv.split("\n");
				for (var carNum = 0; carNum < cars.length; carNum++){
					var row = cars[carNum];
					var columns = row.split(",");
					console.log(columns);
						$(''+
							'<ul data-role="listview" data-theme="c">' +
							'<li>' +
									'<img src="images/' + columns[0] + '.png">' +
									'<p>' + columns[1] +'</p>' +
									'<p>' + columns[2] +'</p>' + 
									'<p>' + columns[3] +'</p>' + 
									'<p>' + columns[4] +'</p>' +   
								'</a>' +
							'</li>' +
							'</ul>'
						).appendTo('#csvlist');
				}
			},
			error	: function(result){ console.log(result);}
		});

	});	


// Form Data


$('#home').on('pageinit', function(){
	//code needed for home page goes here.
});	



$('#engine').on('pageinit', function(){
	//code needed for engine page goes here.
});



$('#cabin').on('pageinit', function(){
	//code needed for cabin page goes here.
});



$('#wheels').on('pageinit', function(){
	//code needed for wheels page goes here.
});



$('#exhaust').on('pageinit', function(){
	//code needed for exhaust page goes here.
});



$('#trunk').on('pageinit', function(){
	//code needed for trunk page goes here.
});



$('#body').on('pageinit', function(){
	//code needed for body page goes here.
});



$('#contact').on('pageinit', function(){
	//code needed for contact page goes here.
});


$('#viewData').on('pageinit', function(){
		getData();

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

	function toggleControls(n){
		switch(n){
			case "on":
				$('#partList').hide();
				$('#clear').show();
				$('#displayLink').hide();
				$('#addNew').show();
				break;
			case "off":	
				$('#partList').show();
				$('#clear').show();
				$('#displayLink').show();
				$('#addNew').hide();
				$('#items').hide();
				break;
			default:
				return false;
		}
	}

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
		toggleControls('on');
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
		var imageLi = $("<li></li>");
		makeSubList.append(imageLi);
		var newImg = $("<img />");
		var setSrc = newImg.attr("src", "images/" + groups + ".png");
		imageLi.append(newImg);	
	};

//Auto Populate Local Storage
	var autoFillData = function (){
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
		deleteLink.html(deleteText);
		linksLi.appendTo(deleteLink);
		};
		
		var editItem = function (){
		//var thisKey = $(this).attr("key");
// Grab the data from our item.
		var value = localStorage.getItem(this.key);
		var item = jquery.parseJSON(value);
		var save = $('submit');
		
		//Show the form.
		toggleControls("off");
		console.log("Am want to show you.");
		// Populate the form field.
		$('#groups').val(item.groups[1]);
		$('#fullname').val(item.fullname[1]);
		$('#phone').val(item.phone[1]);
		$('#email').val(item.email[1]);
		$('#cpart').val(item.cpart[1]);
		$('#hmany').val(item.hmany[1]);
		$('#ctype').val(item.ctype[1]);
		$('#cmodel').val(item.cmodel[1]);
		$('#ycar').val(item.ycar[1]);
		var radios = document.forms[0].mode;
		for(var i=0; i<radios.length; i++){
			if(radios[i].val == "Used" && item.mode[1] == "Used"){
				radios[i].attr("checked", "checked");
			}else if (radios[i].val == "New" && item.mode[1] == "New"){
				radios[i].attr("checked", "checked");
			}
		}
		$('#date').val(item.date[1]);
		$('#special').val(item.special[1]);

		//Remove the initial listener from input 
		save.off('click', storeData);
		//Change Submit button value to edit button
		$('#submit').val("Edit Content");
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property
		editSubmit.on('click', validate);
		editSubmit.key = this.key;	
	};
	
// Delete Item Data
	var deleteItem = function (){
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
	var clearLocal = function (){
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
	var displayLink = $('#displayLink');
	displayLink.on('click', getData);
	var clearLink = $('#clear');
	clearLink.on('click', clearLocal);
	var save = $('#submit');
	save.on('click', validate);

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