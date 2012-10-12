function (doc){
	if (doc._id.substr(0, 12) === "cars:exhaust"){
		emit(doc._id.substr(12), {
			"groups": doc.groups,
			"fullname": doc.fullname,
			"phone": doc.phone,
			"ctype": doc.ctype,
			"cpart": doc.cpart,
			"special": doc.special
		});
	}
};