package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.editor.EditorStorySectionInput;
import org.webstories.dao.DBListUpdater;

public class SectionListUpdater extends DBListUpdater<EditorStorySectionInput, SectionEntity> {
	private ChapterEntity chapter;
	public SectionListUpdater(
		ChapterEntity persistentChapter,
		List<EditorStorySectionInput> modified,
		List<SectionEntity> persistent
	) {
		super( modified, persistent );
		this.chapter = persistentChapter;
	}
	@Override
	protected SectionEntity create( EditorStorySectionInput modified ) {
		String text = modified.getText().toString();
		int position = modified.getPosition();
		SectionEntity section = SectionEntity.createContentSection( chapter, text, position );
		return section;
	}
	@Override
	protected void update( EditorStorySectionInput modified, SectionEntity persistent ) {
		persistent.setText( modified.getText().toString() );
		persistent.setPosition( modified.getPosition() );
	}
}
