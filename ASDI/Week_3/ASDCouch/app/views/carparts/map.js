function (doc){
    if (doc._id.substr(8) === "groups:") {
        emit(doc._id, {
            "fullname": doc.fullname,
            "phone": doc.phone,
            "email": doc.email
        });
    }
};