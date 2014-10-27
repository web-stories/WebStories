package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.impl.EditorStorySectionInput;
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
		SectionEntity section = new SectionEntity();
		section.setChapter( chapter );
		section.setText( modified.getText() );
		section.setPosition( modified.getPosition() );
		return section;
	}
	@Override
	protected void update( EditorStorySectionInput modified, SectionEntity persistent ) {
		persistent.setText( modified.getText() );
		persistent.setPosition( modified.getPosition() );
	}
}
