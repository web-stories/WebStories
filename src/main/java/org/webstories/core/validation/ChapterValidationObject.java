package org.webstories.core.validation;

import org.webstories.core.utils.EmptyObject;

public class ChapterValidationObject extends ValidationObject {
	public ChapterValidationObject( String message ) {
		super( message );
	}
	@Override
	public EmptyObject getData() {
		return new EmptyObject();
	}
}
