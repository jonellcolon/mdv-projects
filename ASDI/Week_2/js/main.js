// Jonell Colon
// ASDI Week 2 
// Term Aug 2012

$('#home').on('pageinit', function(){
    //JSON
$('#jsonData').on('click', function(){
console.log('#jsonData');
$('#carData').empty();
        $.ajax({
            url: 'xhr/data.json',
            type: 'GET',
            dataType: 'json',
            success: function(response){
				console.log(response);
                	for(var i=0, j=response.jsonParts.length; i<j; i++){
                		var part = response.jsonParts[i];
						$(''+
							'<div class="partsCar">'+
								'<h2>'+ part.groups +'</h2>'+
								'<p>' + part.fullname +'</p>'+
								'<p>' + part.phone +'</p>'+
								'<p>' + part.email +'</p>'+
								'<p>' + part.cpart +'</p>'+
								'<p>' + part.hmany +'</p>'+
								'<p>' + part.ctype +'</p>'+
								'<p>' + part.cmodel +'</p>'+
								'<p>' + part.ycar +'</p>'+
								'<p>' + part.mode +'</p>'+
								'<p>' + part.special +'</p>'+
							'</div>'
                       ).appendTo('#carData');
					   console.log(response);
					}
             }
      });
	  return false;
});
  

//XML
$('#xmlData').on('click', function(){
console.log('#xmlData');
$('#carData').empty();
		$.ajax({
			url: 'xhr/data.xml',
			type: 'GET',
			dataType: 'xml',
			success: function(xml){
			console.log(xml);
				$(xml).find('parts').each(function(){
					var groups = $(this).find('groups').text();
					var fullname = $(this).find('fullname').text();
					var phone = $(this).find('phone').text();
					var email = $(this).find('email').text();
					var cpart = $(this).find('cpart').text();
					var hmany = $(this).find('hmany').text();
					var ctype = $(this).find('ctype').text();
					var cmodel = $(this).find('cmodel').text();
					var ycar = $(this).find('ycar').text();
					var mode = $(this).find('mode').text();
					var special = $(this).find('special').text();
					$(''+
						'<div class="partsCar">'+
							'<h2>'+ groups +'</h2>'+
							'<p>'+ fullname +'</p>'+
							'<p>'+ phone +'</p>'+
							'<p>'+ email +'</p>'+
							'<p>'+ cpart +'</p>'+
							'<p>'+ hmany +'</p>'+
							'<p>'+ ctype +'</p>'+
							'<p>'+ cmodel +'</p>'+
							'<p>'+ ycar +'</p>'+
							'<p>'+ mode +'</p>'+
							'<p>'+ special +'</p>'+
						'</div>'
					).appendTo('#carData');
					console.log(xml);
				});
			}
		});
		return false;
});
	
	//WDDX
$('#wddxData').on("click", function(){
console.log('#wddxData');
$('#carData').empty();	
	$.ajax({
    url      : "xhr/wddx.xml",
    type     : "GET",
    dataType : "wddx",
    success  : function(wddx) {
        console.log(wddx);
    	}
		});
	});
});



// Wait until the DOM is ready
$("#list").on('pageinit',function() {
    
	var partMode,
		submit = $("#submit");
		function resetForm(){
				window.location.reload();
		};

	// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].mode;
		for(var i=0; i < radios.length; i++){
			if(radios[i].checked){
				partMode = radios[i].value;
			}
		}

	};

	function toggleControls(n){
		switch(n){
			case "on":
				$("#partList").hide();
				$("#clear").show();
				$("#displayLink").hide();
				$("#addNew").show();
				break;
			case "off":	
				$("#partList").show();
				$("#clear").show();
				$("#displayLink").show();
				$("#addNew").hide();
				$("#items").hide();
				break;
			default:
				return false;
		}
	};

	function storeData(key){
		//if the is no key, this is means this is a brand new item and need new key.
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		var item		= {};
			item.groups	= ["Group: ", $("#groups").value];
			item.fullname	= ["Full Name: ", $("#fullname").value];
			item.phone	= ["Phone Number: ", $("#phone").value];
			item.email	= ["E-Mail: ", $("#email").value];
			item.cpart	= ["Car Part: ", $("#cpart").value];
			item.hmany	= ["How Many: ", $("#hmany").value];
			item.ctype	= ["Car Type: ", $("#ctype").value];
			item.cmodel	= ["Car Model: ", $("#cmodel").value];
			item.ycar	= ["Car Year: ", $("#ycar").value];
			item.mode	= ["Value: ", partMode];
			item.special	= ["Special Request: ", $("#special").value];

			//Save data to Local Storage: Stringify.
			localStorage.setItem(id, JSON.stringify(item));
			alert("Part Information Saved!");
			window.location.reload();
	};

	$.validator.setDefaults({
    	ignore: ""
	});

    function validate(){
        $("#partList").validate({
                invalidHandler: function(form, validator){
					alert("Fill all required fields.")
					
				},
                submitHandler: function(){
                    save.(this.key);
                }
         })
     
   };

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage, default data added.");
			autoFillData();
		}
		// Write Data into Local Storage
		var makeDiv = $("<div>");
		makeDiv.attr("id", "items");
		var makeList = $("<ul>");
		makeList.attr({
			dataRole: "listview",
			dataInset: "true",
			dataFilter: "true"
		});

		makeDiv.append(makeList);
		$("#list").append(makeDiv);
		//document.body.append(makeDiv);
		$("#items").show();
		for(var i=0, len=localStorage.length; i < len;i++){
			var makeli = $("<li></li>");
			var linksLi = $("<li></li>");
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $("<ul></ul>");
			makeli.append(makeSubList);
			getImage(obj.groups[1],makeSubList);
			for(var n in obj){
				var makeSubli = $("<li></li>");
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.append(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links.

		}

	}

	//Get the image for the right  category
	function getImage(groups, makeSubList){
		var imageLi = $("<li></li>");
		makeSubList.append(imageLi);
		var newImg = $("<img />");
		var setSrc = newImg.attr("src", "images/" + groups + ".png");
		imageLi.append(newImg);	
	}

	//Auto Populate Local Storage
	function autoFillData(){
		//Store JSON into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}

	}

	//Make items links
	function makeItemLinks(key, linksLi){
		// add edit single item link
		var editLink = $('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		$(editLink).on("click", editItem);
		editLink.html(editText);
		linksLi.append(editLink);

		//add line break
		var breakTag = $('<br>');
		linksLi.append(breakTag);

		// add delete single item link
		var deleteLink = $('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		$(deleteLink).on("click", deleteItem);
		deleteLink.html(deleteText);
		linksLi.append(deleteLink);
	}

	function editItem(){
		var thisKey = $(this).attr("key")
		//Grab the data from our item.
		var value = localStorage.getItem($(this).attr("key"));
		var item = JSON.parse(value);

		//Show the form.
		toggleControls("off");

		//populate the form field.
		$("#groups").value = item.groups[1];
		$("#fullname").value = item.fullname[1];
		$("#phone").value = item.phone[1];
		$("#email").value = item.email[1];
		$("#cpart").value = item.cpart[1];
		$("#hmany").value = item.hmany[1];
		$("#ctype").value = item.ctype[1];
		$("#cmodel").value = item.cmodel[1];
		$("#ycar").value = item.ycar[1];
		var radios = document.forms[0].mode;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Used" && item.mode[1] == "Used"){
				radios[i].attr("checked", "checked");
			}else if (radios[i].value == "New" && item.mode[1] == "New"){
				radios[i].attr("checked", "checked");
			}
		}
		
		$("#special").value = item.special[1];

		//Remove the initial listener from input 
		save.off("click", storeData);
		//Change Submit button value to edit button
		$("#submit").on = "Edit Content";
		var editSubmit = $("#submit");
		//Save the key value established in this function as a property
		editSubmit.on("click", validate);
		editSubmit.key = this.key;	
	}
	
// Delete a Car Part
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete item?");
		if (ask){
			localStorage.removeItem(this.key);
			alert("Item was deleted!");
			window.location.reload();
		}else{
			alert("Item was NOT deleted.");
		}

	}

// Clear All Car Data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("All data is deleted!");
			window.location.reload();
			return false;
		}
	}

	/*function validate(e){
		//Define elements we want to check
		var getGroup = $("#groups");
		var getFullName = $("#fullname");
		var getPhone = $("#phone");
		var getEmail = $("#email");
		
		//Rest error messages
		errMsg.innerHTML = "";
		getGroup.style.border = "1px solid black";
		getFullName.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		
		
		//Get error Messages
		var messageAry = [];
		//Group Validation
		if(getGroup.value === "--Choose One--"){
			var groupError = "Please choose a group.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		
		//Name Validation
		if(getFullName.value === ""){
			var fullNameError = "Please enter a name.";
			getFullName.style.border = "1px solid red";
			messageAry.push(fullNameError);
		}
		
		//Phone Validation
		var phonere = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (!(phonere.exec(getPhone.value))){
			var phoneError = "Please enter a valid phone number.";
			getPhone.style.border = "1px solid red";
			messageAry.push(phoneError);
		}
		
		//Email Validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			messageAry.push(emailError);
		}
		
		//if there were errors display them on the screen
		if (messageAry.length >= 1){
			for (var i=0, j=messageAry.length; i < j; i++){
				var txt = $("#li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//if all is ok save our data. Send the key value that came from editData function.
			storeData(this.key);
			
		}
		
			
	}*/
	// Variable defaults
	/*var contactGroups = ["--Choose One--", "Engine", "Cabin", "Wheels", "Body", "Trunk", "Exhaust"],
		partValue,
		errMsg = $("#errors");*/

	//;

	// makeCats();

	// Set Link & Submit Click Events
	$("#displayLink").on("click", getData);
	$("#clear").on("click", clearLocal);
	$("#submit").on("click", validate);
	
});
