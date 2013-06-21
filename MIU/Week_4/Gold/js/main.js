$(document).ready(function(){
 
 // Global Variables
 
 $(function(){
    var operation = "A"; //"A"=Adding; "E"=Editing
    var selected_index = -1; //Index of the selected list item
    var carParts = localStorage.getItem("carParts");//Retrieve the stored data
    carParts = JSON.parse(carParts); //Converts string to object
    if(carParts === null) //If there is no data, initialize an empty array
        carParts = [];

// Add

function Add(){
    var parts = JSON.stringify({
        Group    : $("#groups").val(),
        Name  : $("#fullname").val(),
        Phone : $("#phone").val(),
        Email : $("#email").val()
    });
    carParts.push(parts);
    localStorage.setItem("carParts", JSON.stringify(carParts));
    alert("The data was saved.");
    return true;
}

// Edit

function Edit(){
    carParts[selected_index] = JSON.stringify({
            Groups    : $("#groups").val(),
            Name  : $("#fullname").val(),
            Phone : $("#phone").val(),
            Email : $("#email").val()
        });//Alter the selected item on the table
    localStorage.setItem("carParts", JSON.stringify(carParts));
    alert("The data was edited.");
    operation = "A"; //Return to default value
    return true;
}


// Delete

function Delete(){
    carParts.splice(selected_index, 1);
    localStorage.setItem("carParts", JSON.stringify(carParts));
    alert("Parts deleted.");
}

// List 

function List(){       
    $("#listParts").html("");
    $("#listParts").html(
        "<li>"+
        "   <p>Category:</p>"+
        "   <p>Name:</p>"+
        "   <p>Phone:</p>"+
        "   <p>Email:</p>"+
        " </li>"
        );
    for(var i in carParts){
        var p = JSON.parse(carParts[i]);
        $("#listParts").append("<li>"+
                                     "  <p>"+p.Category+"</p>" +
                                     "  <p>"+p.Name+"</p>" +
                                     "  <p>"+p.Phone+"</p>" +
                                     "  <p>"+p.Email+"</p>" +
                                     "</li>");
    }
}


// On Submit

$("#partList").bind("submit",function(){
    if(operation == "A")
        return Add();
    else
        return Edit();     
});


// On Click Edit

$(".btnEdit").bind("click", function(){
    operation = "E";
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var p = JSON.parse(carParts[selected_index]);
    $("#groups").val(p.Group);
    $("#fullname").val(p.Name);
    $("#phone").val(p.Phone);
    $("#email").val(p.Email);
    $("#groups").attr("readonly","readonly");
    $("#fullname").focus();
});

// On Click Delete

$(".btnDelete").bind("click", function(){
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete();
    List();
});



});
});