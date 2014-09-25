package org.webstories.core.auth;

import org.webstories.dao.integration.FacebookEntity;

public class Logged {
	private Long id;
	private String fullName;
	private String firstName;
	private String lastName;
	public static Logged from( FacebookEntity facebook ) {
		Logged logged = new Logged();
		logged.setId( facebook.getId() );
		logged.setFirstName( facebook.getFirstName() );
		logged.setLastName( facebook.getLastName() );
		logged.setFullName( ( facebook.getFirstName() + " " + facebook.getLastName() ).trim() );
		return logged;
	}
	public Long getId() {
		return id;
	}
	private void setId( Long id ) {
		this.id = id;
	}
	
	public String getFullName() {
		return fullName;
	}
	private void setFullName( String fullName ) {
		this.fullName = fullName;
	}
	
	public String getFirstName() {
		return firstName;
	}
	private void setFirstName( String firstName ) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	private void setLastName( String lastName ) {
		this.lastName = lastName;
	}
}
