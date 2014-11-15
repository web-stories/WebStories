package org.webstories.core.validation;

public class ChapterValidationObject extends ValidationObject {
	private String message;
	public ChapterValidationObject( String message ) {
		this.message = message;
	}
	public String getMessage() {
		return message;
	}
}
