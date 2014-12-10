package org.webstories.core.validation;


public class ChapterValidationObject extends ValidationObject {
	long chapterId;
	
	public ChapterValidationObject( String message, long chapterId ) {
		super( message );
		this.chapterId = chapterId;
	}
	
	@Override
	public ChapterValidationData getData() {
		return new ChapterValidationData( chapterId );
	}
}

class ChapterValidationData {
	private long chapterId;
	public ChapterValidationData( long chapterId ) {
		this.chapterId = chapterId;
	}
	public Long getChapterId() {
		return chapterId;
	}
}