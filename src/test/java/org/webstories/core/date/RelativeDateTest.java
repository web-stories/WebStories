package org.webstories.core.date;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.junit.Assert;
import org.junit.Test;

public class RelativeDateTest {
	@Test
	public void relative_string() {
		String actual = new RelativeDate()
			.from( parse( "15/12/2014 16:07:10" ).getMillis() )
			.until( parse( "15/12/2014 16:07:15" ).getMillis() )
			.toRelativeString();
		String expected = "Agora mesmo";
		Assert.assertEquals( expected, actual );
	}
	
	private DateTime parse( String text ) {
		return DateTimeFormat.forPattern( "dd/MM/yyyy HH:mm:ss" ).parseDateTime( text );
	}
}
