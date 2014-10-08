package org.webstories.core.auth;

import org.junit.Assert;
import org.junit.Test;
import org.webstories.core.auth.http.BasicAuthData;

public class BasicAuthDataTest {
	@Test
	public void should_extract_username_and_password() {
		String authorization = "Basic VG9iaWFzOmF2YW50YXNpYQ==";
		BasicAuthData data = BasicAuthData.from( authorization );
		
		Assert.assertEquals( "Tobias", data.getUsername() );
		Assert.assertEquals( "avantasia", data.getPassword() );
	}
}
