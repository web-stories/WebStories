package org.webstories.core.auth;

import java.io.Serializable;

import org.webstories.core.user.LoggedUserInfoFactory;
import org.webstories.core.user.PersonName;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.user.UserEntity;

public class Logged implements Serializable {
	private static final long serialVersionUID = 1;
	private Long id;
	private String fullName;
	private String firstName;
	private String lastName;
	private String avatarURL;
	
	private Logged( long id, LoggedUserInfoFactory factory ) {
		PersonName name = factory.createName();
		
		this.id = id;
		this.firstName = name.getFirst();
		this.lastName = name.getLast();
		this.fullName = name.toString();
		this.avatarURL = factory.createAvatarURL().toString();
	}
	
	public static Logged from( UserEntity user ) {
		return from( user.getFacebook() );
	}
	
	public static Logged from( FacebookEntity facebook ) {
		long id = facebook.getId();
		LoggedUserInfoFactory factory = new LoggedUserInfoFactory( facebook );
		return new Logged( id, factory );
	}
	
	public Long getId() {
		return id;
	}
	public String getFullName() {
		return fullName;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getAvatarURL() {
		return avatarURL;
	}
}
