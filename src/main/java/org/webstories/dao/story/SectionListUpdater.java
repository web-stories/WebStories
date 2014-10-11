package org.webstories.dao.story;

import java.util.List;

import org.webstories.core.story.impl.EditorStorySectionInput;
import org.webstories.dao.DBListUpdater;

public class SectionListUpdater extends DBListUpdater<EditorStorySectionInput, SectionEntity> {
	private long idChapter;
	public SectionListUpdater(
		long idChapter,
		List<EditorStorySectionInput> modified,
		List<SectionEntity> persistent
	) {
		super( modified, persistent );
		this.idChapter = idChapter;
	}
	@Override
	protected SectionEntity create( EditorStorySectionInput modified ) {
		SectionEntity section = new SectionEntity();
		section.setIdChapter( idChapter );
		section.setText( modified.getText() );
		return section;
	}
	@Override
	protected void update( EditorStorySectionInput modified, SectionEntity persistent ) {
		persistent.setText( modified.getText() );
	}
}
