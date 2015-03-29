package org.webstories.core.auth;

import java.io.Serializable;

import org.eclipse.jdt.annotation.Nullable;
import org.webstories.core.integration.client.IntegrationClient;
import org.webstories.core.user.LoggedUserInfoFactory;
import org.webstories.core.user.PersonName;
import org.webstories.dao.integration.FacebookEntity;
import org.webstories.dao.user.UserEntity;

@SuppressWarnings( "serial" )
public class Logged implements Serializable {
	private Long id;
	private String fullName;
	private String firstName;
	private String lastName;
	private String avatarURL;
	private IntegrationClient integration;
	
	private Logged( long id, IntegrationClient integration, LoggedUserInfoFactory factory ) {
		PersonName name = factory.createName();
		
		this.id = id;
		this.integration = integration;
		this.firstName = name.getFirst();
		this.lastName = name.getLast();
		this.fullName = name.toString();
		this.avatarURL = factory.createAvatarURL().toString();
	}
	
	private Logged( long id, LoggedUserInfoFactory factory ) {
		this( id, null, factory );
	}
	
	public static Logged from( UserEntity user ) {
		FacebookEntity facebook = user.getFacebook();
		long id = user.getId();
		LoggedUserInfoFactory factory = new LoggedUserInfoFactory( facebook );
		return new Logged( id, factory );
	}
	
	public static Logged from( FacebookEntity facebook, IntegrationClient integration ) {
		long id = facebook.getId();
		LoggedUserInfoFactory factory = new LoggedUserInfoFactory( facebook );
		return new Logged( id, integration, factory );
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
	public @Nullable IntegrationClient getIntegration() {
		return integration;
	}
}
