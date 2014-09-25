package org.webstories.core.utils;

import org.junit.Assert;
import org.junit.Test;

public class Base64Test {
	@Test
	public void should_convert_and_revert_a_string() {
		String actual = Base64.decode( Base64.encode( "!@#$%^&*(" ) );
		String expected = "!@#$%^&*(";
		Assert.assertEquals( expected, actual );
	}
}
