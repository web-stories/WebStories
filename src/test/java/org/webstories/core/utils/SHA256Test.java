package org.webstories.core.utils;

import org.junit.Assert;
import org.junit.Test;

public class SHA256Test {
	@Test
	public void should_convert_string() throws SHA256Exception {
		String expected = "4117aaf889efa99f0b6252dbf513826754ebfcdeaf82b8dfe48be20c559e29fa";
		String actual = SHA256.encrypt( "!@#$%^&*(" );
		Assert.assertEquals( expected, actual );
	}
}
