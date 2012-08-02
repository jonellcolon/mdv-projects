// Wait until the DOM is ready
$(document).ready(function() {
    
	var partMode,
		submit = $("#submit");
		function resetForm(){
				window.location.reload();
		}
	
	// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = $("#mode");
		for(var i=0; i < radios.length; i++){
			if(radios[i].checked){
				partMode = radios[i].value;
			}
		}
		
	}
		
	function toggleControls(n){
		switch(n){
			case "on":
				$("#partList").addClass("none");
				$("#clear").addClass("inline");
				$("#displayLink").addClass("none");
				$("#addNew").addClass("inline");
				break;
			case "off":	
				$("#partList").addClass("block");
				$("#clear").addClass("inline");
				$("#displayLink").addClass("inline");
				$("#addNew").addClass("none");
				$("#items").addClass("none");
				break;
			default:
				return false;
		}
	}
	
	function storeData(key){
		//if the is no key, this is means this is a brand new item and need new key.
		if(!key){
		var id = Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		var item		= {};
			item.group	= ["Group: ", $("#groups").value];
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
		
	}
	
	$.validator.setDefaults({
    	ignore: ""
	});

    function validate(){
        var parsePartListForm = function(data){
            storeData(data);
        };
        $(document).ready(function(){
            var pList = $("#partList");
            pList.validate({
                invalidHandler: function(form, validator){},
                submitHandler: function(){
                    var data = pList.serializeArray();
                    parsePartListForm(data);
                }
            });
        });
    }
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage, default data added.");
			autoFillData();
		}
		// Write Data into Local Storage
		var makeDiv = $("#list");
		makeDiv.setAttribute("data-role", "content");
		makeDiv.appendChild("<ul id=" + "vehiclePartList" + "></ul>");
		var makeList = $("#vehiclePartList");
		makeList.setAttribute({
			dataRole: "listview",
			dataInset: "true",
			dataFilter: "true"
		});
		
		makeDiv.appendChild(makeList);
		// document.body.appendChild(makeDiv);
		$("#items").addClass("block");
		for(var i=0, len=localStorage.length; i < len;i++){
			var makeli = $("<li></li>");
			var linksLi = $("<li></li>");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = $("<ul></ul>");
			makeli.appendChild(makeSubList);
			getImage(obj.group[1],makeSubList);
			for(var n in obj){
				var makeSubli = $("<li></li>");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.appendChild(optSubText);
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links.
			
		}
			
	}
	
	//Get the image for the right  category
	function getImage(catName, makeSubList){
		var imageLi = $("<li></li>");
		makeSubList.appendChild(imageLi);
		var newImg = $("<img />");
		var setSrc = newImg.setAttribute("src", "images/" + catName + ".png");
		imageLi.appendChild(newImg);	
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
		var editLink = $("");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		$(editLink).bind("click", editItem);
		editLink.innerHTML(editText);
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = $('<br>');
		linksLi.appendChild(breakTag);
		
		// add delete single item link
		var deleteLink = $("");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		$(deleteLink).bind("click", deleteItem);
		deleteLink.innerHTML(deleteText);
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the data from our item.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form.
		toggleControls("off");
		
		//populate the form field.
		$("#groups").value = item.group[1];
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
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "New" && item.mode[1] == "New"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		$("#special").value = item.special[1];
	
		//Remove the initial listener from input 
		save.unbind("click", storeData);
		//Change Submit button value to edit button
		$("#submit").bind = "Edit Content";
		var editSubmit = $("#submit");
		//Save the key value established in this function as a property
		editSubmit.bind("click", validate);
		editSubmit.key = this.key;	
	}
	
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
	;
	// makeCats();
	
	// Set Link & Submit Click Events
	var displayLink = $("#displayLink");
	displayLink.bind("click", getData);
	var clearLink = $("#clear");
	clearLink.bind("click", clearLocal);
	var save = $("#submit");
	save.bind("click", validate);
	


});