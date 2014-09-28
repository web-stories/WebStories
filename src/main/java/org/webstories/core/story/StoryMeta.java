package org.webstories.core.story;

import org.webstories.core.validation.Validatable;
import org.webstories.web.util.params.RequestParams;

public class StoryMeta implements Validatable {
	private String title;
	private String summary;
	private String synopsis;
	public static StoryMeta from( RequestParams params ) {
		StoryMeta meta = new StoryMeta(  );
		meta.title = params.get( "title" ).toString();
		meta.summary = params.get( "summary" ).toString();
		meta.synopsis = params.get( "synopsis" ).toString();
		return meta;
	}
	@Override
	public boolean validate() {
		if ( title.isEmpty() ) {
			return false;
		}
		if ( summary.isEmpty() ) {
			return false;
		}
		if ( synopsis.isEmpty() ) {
			return false;
		}
		return true;
	}
	public String getTitle() {
		return title;
	}
	public String getSummary() {
		return summary;
	}
	public String getSynopsis() {
		return synopsis;
	}
}
