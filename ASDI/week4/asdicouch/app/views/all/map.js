function (doc){
	if (doc._id.substr(0, 5) === "cars:"){
		emit(doc._id.substr(5), {
			"groups": doc.groups,
			"fullname": doc.fullname,
			"phone": doc.phone,
			"ctype": doc.ctype,
			"cpart": doc.cpart,
			"special": doc.special
		});
	}
};