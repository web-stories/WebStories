package org.webstories.core.validation;

import javax.validation.constraints.NotNull;


public class SectionValidationObject extends ValidationObject {
	public SectionValidationObject( @NotNull String message ) {
		super( message );
	}
}
