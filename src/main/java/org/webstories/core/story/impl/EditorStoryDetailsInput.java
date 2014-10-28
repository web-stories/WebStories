package org.webstories.core.story.impl;

import org.webstories.core.story.StoryMeta;
import org.webstories.core.text.Text;
import org.webstories.core.validation.Validatable;
import org.webstories.web.util.params.RequestParams;

public class EditorStoryDetailsInput implements Validatable, StoryMeta {
	private Text title;
	private Text summary;
	private Text synopsis;
	public static EditorStoryDetailsInput from( RequestParams params ) {
		EditorStoryDetailsInput meta = new EditorStoryDetailsInput(  );
		meta.title = Text.from( params.get( "title" ).toString() );
		meta.summary = Text.from( params.get( "summary" ).toString() );
		meta.synopsis = Text.from( params.get( "synopsis" ).toString() );
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
		// LF is not allowed for summary
		if ( summary.toString().contains( "\n" ) ) {
			return false;
		}
		return true;
	}
	@Override
	public Text getTitle() {
		return title;
	}
	@Override
	public Text getSummary() {
		return summary;
	}
	@Override
	public Text getSynopsis() {
		return synopsis;
	}
}
