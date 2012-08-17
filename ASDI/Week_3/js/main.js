/**
 * Created with IntelliJ IDEA.
 * User: jonellcolon
 * Date: 8/11/12
 * Time: 12:33 AM
 * To change this template use File | Settings | File Templates.
 */
// Jonell Colon
// ASDI Week 2
// Term Aug 2012
//JSON
$('#jsonPage').on('click', function(){
	$('#jsonPage').empty();
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
                    ).appendTo('#jsonPage');
                    $("#jsonPage").listview("refresh");
                };
            },
			error: function(result){ console.log(result);}
      });
        
});


//XML
$('#xmlPage').on('click', function(){
        $('#xmlPage').empty();
        $.ajax({
            url: 'xhr/data.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(xml){
                $(xml).find("parts").each(function(){
					var make = {};
                    make.groups = $(this).find('groups').text();
                    make.fullname = $(this).find('fullname').text();
                    make.phone = $(this).find('phone').text();
                    make.email = $(this).find('email').text();
                    make.cpart = $(this).find('cpart').text();
                    make.hmany = $(this).find('hmany').text();
                    make.ctype = $(this).find('ctype').text();
                    make.cmodel = $(this).find('cmodel').text();
                    make.ycar = $(this).find('ycar').text();
                    make.mode = $(this).find('mode').text();
                    make.special = $(this).find('special').text();
                    $(''+
						'<li>' +
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
                        '</div>' +
						'</li>'
                    ).appendTo('#xmlPage');
                    console.log(response);
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

// Wait until the DOM is ready

$("#list").on('pageinit',function() {

    var partMode,
        submit = $("#submit");
    function resetForm(){
        window.location.reload();
    }

// Find value of selected radio button.

    function getSelectedRadio(){
        var radios = document.forms[0].mode;
        for(var i=0; i < radios.length; i++){
            if(radios[i].checked){
                partMode = radios[i].value;
            }
        }

    }

    function toggleControls(x){
        switch(x){
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
        //window.location.reload();
    }

    $.validator.setDefaults({
        ignore: ""
    });

    //function validate(){
    $("#partList").validate({
        submitHandler: function(form){
            alert("Fill all required fields.");
            console.log("Call Action");
            window.location.reload();
        }
    });

    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in local storage, default data added.");
            autoFillData();
        }

// Write Data into Local Storage

        var makeDiv = $("<div></div");
        makeDiv.attr("id", "items");
        var makeList = $("<ul></ul>");
        makeDiv.append(makeList);
        $("#list").append(makeDiv);
        $("#items").css("display", "block");
        for(var i=0, len=localStorage.length; i < len;i++){
            console.log(json);
            var makeli = $("<li></li>");
            var linksLi = $("<li></li>");
            linksLi.attr("id", "linksLi");
            makeList.append(makeli);
            makeList.attr("id", "items");
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = jQuery.parseJSON(value);
            var makeSubList = $("<ul></ul>");
            makeli.append(makeSubList);
            getImage(obj.groups[1],makeSubList);
            for(var n in obj){
                var makeSubli = $("<li></li>");
                makeSubList.append(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.html(optSubText);
                makeSubList.append(linksLi);
                makeSubList.append("id", "displayed");
                makeSubList.append(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links.

        }
    }

//Get the image for the right  category

    function getImage(catName, makeSubList) {
        var imageLi = $("<li></li>");
        makeSubList.append(imageLi);
        var newImg = $("<img></img>");
        var setSrc;
        setSrc = newImg.attr("src", "images/" + catName + ".png");
        newImage.attr("id", "img");
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

// Add edit single item link

        var editLink = $('a');
        editLink.attr("id", "editLink");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        $(editLink).on("click", editItem);
        editLink.html(editText);
        linksLi.append(editLink);

// Add line break

        var breakTag = $('br');
        linksLi.append(breakTag);

// Add delete single item link

        var deleteLink = $('a');
        deleteLink.attr("id", "deleteLink");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        $(deleteLink).on("click", deleteItem);
        deleteLink.html(deleteText);
        linksLi.append(deleteLink);
    }

    function editItem(){
        var thisKey = $(this).attr("key");
        //Grab the data from our item.
        var value = localStorage.getItem($(this).attr("key"));
        var item = JSON.parse(value);

// Show the form.

        toggleControls("off");

// Populate the form field.

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

// Remove the initial listener from input

        save.off("click", storeData);

// Change Submit button value to edit button

        $("#submit").on = "Edit Content";
        var editSubmit = $("#submit");

// Save the key value established in this function as a property

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


    $('#displayLink').on("click", getData);
    $('#clear').on("click", clearLocal);
    $('#submit').on("click", storeData);

});