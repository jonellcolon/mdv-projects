$(document).ready(function() {
    $.ajax({
        "url": '/asdproject/_all_docs?include_docs=true&start_key="groups"&end_key="groups:zzzzz"',
        "dataType": "json",
        "success": function(data){
            console.log(data);
            $.each(data.rows, function(index, program){
                var mydate = program.doc.egine;
                var fullname = program.doc.fullname;
                var email = program.doc.email;
                var phone = program.doc.phone;
                var cpart = program.doc.cpart;
                var ctype = program.doc.ctype;
                var cmodel = program.doc.cmodel;
                var hmany = program.doc.cmodel;
                var special = program.doc.special;
                $('#programlist').append(
                    $('<li>').append(
                    	$('<a>').attr("href", "#")
                    		.text(groups)
                    		
                    	)
                    
                );  
            });
        	$('#carPartList').listview('refresh')
        }
    });
});


$('#home').live("pageshow", function() {
	$.couch.db("asdproject").view("plugin/groups", {
		success: function(data) {
			//console.log(data);
			$('#carParts').empty();
			$.each(data.rows, function(index, value){
				var item = (value.value || value.doc);
				$('#carParts').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "groups.html?groups=" + item.cpart)
							.text(item.title)
					)
				);
			});
			$('#homeItems').listview('refresh');
		}
	});
});

var urlVars = function (urlData) {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&')
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;	
	}
	return urlValues;
};

$('#groups').live("pageshow", function() {
	var program = urlVars() ["programs"];
	//console.log(groups);
	$.couch.db("asdproject").view("plugin/carParts", {
		key: "groups:" + groups
	});

});