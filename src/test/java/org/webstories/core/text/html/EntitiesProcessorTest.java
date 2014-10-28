package org.webstories.core.text.html;

import org.junit.Assert;
import org.junit.Test;

public class EntitiesProcessorTest {
	@Test
	public void should_handle_xss_by_default() {
		HTMLText message = HTMLText.fromPlainText( "<script>alert(0)</script>" );
		
		String expected = "&lt;script&gt;alert(0)&lt;/script&gt;";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	@Test
	public void should_revert_xss_handling() {
		HTMLText message = HTMLText.fromPlainText( "&lt;script&gt;alert(0)&lt;/script&gt;" );
		message.accept( new EntitiesProcessor.Reverter() );
		
		String expected = "<script>alert(0)</script>";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	@Test
	public void should_handle_quotation_mark() {
		HTMLText message = HTMLText.fromPlainText( "\"" );
		
		String expected = "&quot;";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
}
