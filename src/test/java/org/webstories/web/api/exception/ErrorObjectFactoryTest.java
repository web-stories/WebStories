package org.webstories.web.api.exception;

import org.junit.Assert;
import org.junit.Test;

public class ErrorObjectFactoryTest {
	@Test
	public void should_find_the_root_exception_message() {
		try {
			try {
				throw new Exception( "root message" );
			} catch ( Exception cause ) {
				throw new Exception( cause );
			}
		} catch ( Exception e ) {
			ErrorObject errorObject = ErrorObjectFactory.create( e );
			
			String expected = "root message";
			String actual = errorObject.getMessage();
			
			Assert.assertEquals( expected, actual );
		}
	}
	
	@Test
	public void should_find_the_closest_root_cause_with_a_message() {
		try {
			try {
				try {
					throw new Exception();
				} catch ( Exception cause ) {
					throw new Exception( "exception with message", cause );
				}
			} catch ( Exception cause ) {
				throw new Exception( cause );
			}
		} catch ( Exception e ) {
			ErrorObject errorObject = ErrorObjectFactory.create( e );
			
			String expected = "exception with message";
			String actual = errorObject.getMessage();
			
			Assert.assertEquals( expected, actual );
		}
	}
}
