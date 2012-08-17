$(document).ready(function()) {
    $.ajax({
        "url": '/asdproject/_all_docs?include_docs=true&start_key="groups"&end_key="groups:zzzzz"',
        "dataType": "json",
        "success": function(data){
            console.log(data);
            $.each(data.rows, function(index, program){
                var engine = program.doc.egine;
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
        	$('#programlist').listview('refresh')
        }
    });
});