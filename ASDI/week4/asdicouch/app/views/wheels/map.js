function (doc){
	if (doc._id.substr(0, 11) === "cars:wheels"){
		emit(doc._id.substr(11), {
			"groups": doc.groups,
			"fullname": doc.fullname,
			"phone": doc.phone,
			"ctype": doc.ctype,
			"cpart": doc.cpart,
			"special": doc.special
		});
	}
};