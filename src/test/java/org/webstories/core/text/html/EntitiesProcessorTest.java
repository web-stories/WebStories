package org.webstories.core.text.html;

import org.junit.Assert;
import org.junit.Test;

public class EntitiesProcessorTest {
	@Test
	public void should_handle_xss_by_default() {
		HTMLOutput message = HTMLOutput.fromUnsafeInput( "<script>alert(0)</script>" );
		
		String expected = "&lt;script&gt;alert(0)&lt;/script&gt;";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	@Test
	public void should_handle_quotation_mark() {
		HTMLOutput message = HTMLOutput.fromUnsafeInput( "\"" );
		
		String expected = "&quot;";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
}
