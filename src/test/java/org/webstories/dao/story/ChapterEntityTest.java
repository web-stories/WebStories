package org.webstories.dao.story;

import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

public class ChapterEntityTest {
	@Test
	public void should_add_section_inside_a_wrongly_positioned_list() {
		// By default, the JPA list is not ordered
		List<SectionEntity> wrongPositioned = new ArrayList<SectionEntity>();
		wrongPositioned.add( createSection( "Old third section", 3 ) );
		wrongPositioned.add( createSection( "Second section", 2 ) );
		wrongPositioned.add( createSection( "First section", 1 ) );
		
		ChapterEntity chapter = ChapterEntity.createChapterWithSections( wrongPositioned );
		SectionEntity newThird = createSection( "New third section", 3 /* second position + 1 */ );
		
		chapter.addSection( newThird, 2 /* new third position - 1 */ );
		
		String expected, actual;
		
		expected = "First section";
		actual = chapter.getSections().get( 0 ).getText();
		Assert.assertEquals( expected, actual );
		
		expected = "Second section";
		actual = chapter.getSections().get( 1 ).getText();
		Assert.assertEquals( expected, actual );
		
		expected = "New third section";
		actual = chapter.getSections().get( 2 ).getText();
		Assert.assertEquals( expected, actual );
		
		expected = "Old third section";
		actual = chapter.getSections().get( 3 ).getText();
		Assert.assertEquals( expected, actual );
	}
	
	private SectionEntity createSection( String text, int position ) {
		SectionEntity section = SectionEntity.createEmptySection( position );
		section.setText( text );
		return section;
	}
}
