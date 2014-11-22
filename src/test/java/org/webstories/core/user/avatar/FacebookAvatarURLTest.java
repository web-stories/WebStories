package org.webstories.core.user.avatar;

import java.net.MalformedURLException;

import org.junit.Assert;
import org.junit.Test;

public class FacebookAvatarURLTest {
	@Test
	public void should_set_width() throws MalformedURLException {
		FacebookAvatarURL url = new FacebookAvatarURL(
			"https://graph.facebook.com/276170692591315/picture"
		);
		url.setWidth( 100 );
		
		String expected = "https://graph.facebook.com/276170692591315/picture?width=100";
		String actual = url.toString();
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_set_width_and_height() throws MalformedURLException {
		FacebookAvatarURL url = new FacebookAvatarURL(
			"https://graph.facebook.com/276170692591315/picture"
		);
		url.setWidth( 100 );
		url.setHeight( 100 );
		
		String expected = "https://graph.facebook.com/276170692591315/picture?width=100&height=100";
		String actual = url.toString();
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_change_value_if_parameter_exists() throws MalformedURLException {
		FacebookAvatarURL url = new FacebookAvatarURL(
			"https://graph.facebook.com/276170692591315/picture?width=50"
		);
		url.setWidth( 100 );
		
		String expected = "https://graph.facebook.com/276170692591315/picture?width=100";
		String actual = url.toString();
		
		Assert.assertEquals( expected, actual );
	}
}
