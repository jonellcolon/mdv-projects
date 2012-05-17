var parsePartList = function(data){
	// uses form data here;
	console.log(data);
};

$(document).ready(function() {
	
	var partlistform = $('#partList');
	
	partlistform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = partlistform.serializeArray();
			parsePartList(data);
			
		}
		
	});
	
    
});