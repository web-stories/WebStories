package org.webstories.core.story;

import org.webstories.core.validation.Validatable;
import org.webstories.web.util.params.RequestParams;

public class StoryMetaInput extends StoryMeta implements Validatable {
	public static StoryMetaInput from( RequestParams params ) {
		StoryMetaInput meta = new StoryMetaInput(  );
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
}
