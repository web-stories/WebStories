package org.webstories.core.text.html;

import org.junit.Assert;
import org.junit.Test;

public class ElementsProcessorTest {
	@Test
	public void should_convert_linefeed() {
		HTMLText message = HTMLText.fromPlainText( "\n" );
		message.accept( new ElementsProcessor.Converter() );
		
		String expected = "<p><br></p>";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_convert_multiple_paragraphs() {
		HTMLText message = HTMLText.fromPlainText( "paragraph1\n\nparagraph2" );
		message.accept( new ElementsProcessor.Converter() );
		
		String expected = "<p>paragraph1</p><p>paragraph2</p>";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_convert_paragraphs_from_windows_based_editors() {
		HTMLText message = HTMLText.fromPlainText( "paragraph1\n\r\n\rparagraph2" );
		message.accept( new ElementsProcessor.Converter() );
		
		String actual = "<p>paragraph1</p><p>paragraph2</p>";
		String expected = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_not_convert_paragraph_to_an_empty_string() {
		HTMLText message = HTMLText.fromPlainText( "" );
		message.accept( new ElementsProcessor.Converter() );
		
		String expected = "";
		String actual = message.toString();
		
		Assert.assertEquals( expected, actual );
	}
}
