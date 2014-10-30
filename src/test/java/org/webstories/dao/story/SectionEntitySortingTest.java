package org.webstories.dao.story;

import java.util.TreeSet;

import org.junit.Assert;
import org.junit.Test;

public class SectionEntitySortingTest {
	@Test
	public void should_sort_correctly() {
		TreeSet<SectionEntity> set = new TreeSet<SectionEntity>();
		set.add( create( 2 ) );
		set.add( create( 1 ) );
		
		int expected = 1;
		int actual = set.first().getPosition();
		
		Assert.assertEquals( expected, actual );
	}
	
	private SectionEntity create( int position ) {
		SectionEntity section = new SectionEntity();
		section.setPosition( position );
		return section;
	}
}
