package org.webstories.core.validation;

public class SectionValidationObject extends ValidationObject {
	private long sectionId;
	public SectionValidationObject( String message, long sectionId ) {
		super( message );
		this.sectionId = sectionId;
	}
	@Override
	public SectionValidationData getData() {
		return new SectionValidationData( sectionId );
	}
}

class SectionValidationData {
	private long sectionId;
	public SectionValidationData( long sectionId ) {
		this.sectionId = sectionId;
	}
	public Long getSectionId() {
		return sectionId;
	}
}