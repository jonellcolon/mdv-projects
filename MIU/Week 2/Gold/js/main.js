// Jonell Colon
// Term 1205
// Project 1 MUI
// Local Storage

// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){
	
	// getElementById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	// Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array.
			selectLi = ge("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		for(var i=0, j=contactGroups.length; i<j; i++){
			var makeOption = document.createElement("option");
			var optText = contactGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	// Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].mode;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				partMode = radios[i].value;
			}
		}
		
	}
		
	function toggleControls(n){
		switch(n){
			case "on":
				ge("partList").style.display = "none";
				ge("clear").style.display = "inline";
				ge("displayLink").style.display = "none";
				ge("addNew").style.display = "inline";
				break;
			case "off":	
				ge("partList").style.display = "block";
				ge("clear").style.display = "inline";
				ge("displayLink").style.display = "inline";
				ge("addNew").style.display = "none";
				ge("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(key){
		//if the is no key, this is means this is a brand new item and need new key.
		if(!key){
		var id			= Math.floor(Math.random()*100000001);
		}else{
			id = key;
		}
		getSelectedRadio();
		var item		= {};
			item.group	= ["Group: ", ge("groups").value];
			item.fullname	= ["Full Name: ", ge("fullname").value];
			item.phone	= ["Phone Number: ", ge("phone").value];
			item.email	= ["E-Mail: ", ge("email").value];
			item.cpart	= ["Car Part: ", ge("cpart").value];
			item.hmany	= ["How Many: ", ge("hmany").value];
			item.ctype	= ["Car Type: ", ge("ctype").value];
			item.cmodel	= ["Car Model: ", ge("cmodel").value];
			item.ycar	= ["Car Year: ", ge("ycar").value];
			item.mode	= ["Value: ", partMode];
			item.special	= ["Special Request: ", ge("special").value];
			
			//Save data to Local Storage: Stringify.
			localStorage.setItem(id, JSON.stringify(item));
			alert("Part Information Saved!");
		
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage, default data added.");
			autoFillData();
		}
		// Write Data into Local Storage
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			getImage(obj.group[1],makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links.
			
		}
			
	}
	
	//Get the image for the right  category
	function getImage(catName, makeSubList){
		var imageLi = document.createElement("li");
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement("img");
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
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
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);
		
		// add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the data from our item.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form.
		toggleControls("off");
		
		//populate the form field.
		ge("groups").value = item.group[1];
		ge("fullname").value = item.fullname[1];
		ge("phone").value = item.phone[1];
		ge("email").value = item.email[1];
		ge("cpart").value = item.cpart[1];
		ge("hmany").value = item.hmany[1];
		ge("ctype").value = item.ctype[1];
		ge("cmodel").value = item.cmodel[1];
		ge("ycar").value = item.ycar[1];
		var radios = document.forms[0].mode;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "Used" && item.mode[1] == "Used"){
				radios[i].setAttribute("checked", "checked");
			}else if (radios[i].value == "New" && item.mode[1] == "New"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		ge("special").value = item.special[1];
	
		//Remove the initial listener from input 
		save.removeEventListener("click", storeData);
		//Change Submit button value to edit button
		ge("submit").value = "Edit Content";
		var editSubmit = ge("submit");
		//Save the key value established in this function as a property
		editSubmit.addEventListener("click", validate);
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
	
	function validate(e){
		//Define elements we want to check
		var getGroup = ge("groups");
		var getFullName = ge("fullname");
		var getPhone = ge("phone");
		var getEmail = ge("email");
		
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
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//if all is ok save our data. Send the key value that came from editData function.
			storeData(this.key);
			
		}
		
			
	}
	// Variable defaults
	var contactGroups = ["--Choose One--", "Engine", "Cabin", "Wheels", "Body", "Trunk", "Exhaust"],
		partValue,
		errMsg = ge("errors");
	;
	makeCats();
	
	// Set Link & Submit Click Events
	var displayLink = ge("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = ge("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = ge("submit");
	save.addEventListener("click", validate);
	


});