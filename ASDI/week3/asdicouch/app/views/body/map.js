function (doc){
	if (doc._id.substr(0, 9) === "cars:body"){
		emit(doc._id.substr(9), {
			"groups": doc.groups,
			"fullname": doc.fullname,
			"phone": doc.phone,
			"ctype": doc.ctype,
			"cpart": doc.cpart,
			"special": doc.special
		});
	}
};