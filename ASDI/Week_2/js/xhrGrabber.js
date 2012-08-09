//JSON
$('#home').on('pageinit', function(){
    //JSON
$('#jsonData').on("click", function(){
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
					};
             },
			 error: function(error){
			console.log(error);
			}
      });
});
  

//XML
$('#xmlData').on("click", function(){
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
						'<div class="carPartList">'+
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
				});
			},
		error: function(error){
		console.log(error);
		}
	});
});
	
	//WDDX
	
	$.ajax({
    url      : "wddx.xml",
    type     : "GET",
    dataType : "wddx",
    success  : function(wddx) {
        console.log(wddx);
    }
});