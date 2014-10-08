package org.webstories.core.auth;

import org.junit.Assert;
import org.junit.Test;

public class BasicAuthExtractorTest {
	@Test
	public void should_extract_username_and_password() {
		String header = "Basic VG9iaWFzOmF2YW50YXNpYQ==";
		BasicAuthExtractor extractor = BasicAuthExtractor.from( header );
		
		Assert.assertEquals( "Tobias", extractor.getUsername() );
		Assert.assertEquals( "avantasia", extractor.getPassword() );
	}
}
