package org.webstories.core.story.editor;

public class RemovalResult {
	private RemovedItem chapter;
	private RemovedItem section;
	
	public void setChapter( RemovedItem chapter ) {
		this.chapter = chapter;
	}
	public RemovedItem getChapter() {
		return chapter;
	}
	
	public void setSection( RemovedItem section ) {
		this.section = section;
	}
	public RemovedItem getSection() {
		return section;
	}
}
