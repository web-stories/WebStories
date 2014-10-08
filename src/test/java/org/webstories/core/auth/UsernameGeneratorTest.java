package org.webstories.core.auth;

import org.junit.Assert;
import org.junit.Test;

public class UsernameGeneratorTest {
	@Test
	public void should_lowercase_the_whole_name() {
		UsernameGenerator generator = generator( "JOHN" );
		
		String actual = generator.next();
		String expected = "john";
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_remove_all_accents() {
		UsernameGenerator generator = generator( "João" );
		
		String actual = generator.next();
		String expected = "joao";
		
		Assert.assertEquals( expected, actual );
	}
	
	@Test
	public void should_append_number_when_generating_a_more_than_one_username() {
		UsernameGenerator generator = generator( "John" );
		
		Assert.assertEquals( "john", generator.next() );
		Assert.assertEquals( "john1", generator.next() );
	}
	
	@Test
	public void should_consider_first_and_last_name() {
		UsernameGenerator generator = generator( "John", "Miller" );
		Assert.assertEquals( "john.miller", generator.next() );
	}
	
	private UsernameGenerator generator( String firstName, String lastName ) {
		return new UsernameGenerator( PersonName.from( firstName, lastName ) );
	}
	
	private UsernameGenerator generator( String firstName ) {
		return new UsernameGenerator( PersonName.from( firstName ) );
	}
}
