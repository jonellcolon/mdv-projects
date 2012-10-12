function (doc){
	if (doc._id.substr(0, 10) === "cars:trunk"){
		emit(doc._id.substr(10), {
			"groups": doc.groups,
			"fullname": doc.fullname,
			"phone": doc.phone,
			"ctype": doc.ctype,
			"cpart": doc.cpart,
			"special": doc.special
		});
	}
};