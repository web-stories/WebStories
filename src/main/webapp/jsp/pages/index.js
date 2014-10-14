(function() {
	var contact = document.querySelector( ".index-banner-contact" );
	if ( !contact ) {
		return; // If valid invitation
	}
	var username = "webstories";
	var domain = "fagnermartins.com";
	var email = username + "@" + domain;
	contact.innerHTML = "<a href='mailto:" + email + "'>" + contact.innerHTML + "</a>";
}());
