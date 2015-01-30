package org.webstories.core.story.facade;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.ReadSecurity;
import org.webstories.core.security.story.PublishedChapterSecurity;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.story.viewer.ChapterEndingSlide;
import org.webstories.core.story.viewer.ChapterEndingSlideFactory;
import org.webstories.core.story.viewer.ChapterSlide;
import org.webstories.core.story.viewer.ChapterSlideFactory;
import org.webstories.core.story.viewer.IntroSlide;
import org.webstories.core.story.viewer.IntroSlideFactory;
import org.webstories.core.story.viewer.SectionSlide;
import org.webstories.core.story.viewer.SectionSlideFactory;
import org.webstories.core.story.viewer.StorySlide;
import org.webstories.core.story.viewer.StoryViewer;
import org.webstories.dao.story.ChapterEntity;
import org.webstories.dao.story.ChapterState;
import org.webstories.dao.story.SectionEntity;
import org.webstories.dao.story.StoryEntity;

@Stateless
public class StoryViewerReader implements LocalStoryViewerReader {
	@PersistenceContext
	EntityManager entityManager;
	
	@Override
	public boolean isPubliclyViewable( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		return story != null;
	}
	@Override
	public boolean isPreviewable( long idStory, Logged logged ) {
		StoryOwnerSecurity security = new StoryOwnerSecurity( logged );
		try {
			security.readPrivileged( new StoryRead.DefaultRead( idStory, entityManager ) );
			return true;
		} catch ( AccessDeniedException e ) {
			return false;
		}
	}
	@Override
	public StoryViewer publicStory( long idStory ) {
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		List<ChapterEntity> chapters = story.getChapters();
		
		StoryViewer viewer = new StoryViewer();
		viewer.setSlides( publicSlides( idStory ) );
		viewer.setFinished( containsDraft( chapters ) == false );
		
		return viewer;
	}
	@Override
	public StoryViewer previewedStory( long idStory, Logged logged ) throws AccessDeniedException {
		if ( !isPreviewable( idStory, logged ) ) {
			throw new AccessDeniedException();
		}
		
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		List<ChapterEntity> chapters = story.getChapters();
		
		StoryViewer viewer = new StoryViewer();
		viewer.setSlides( previewSlides( idStory, logged ) );
		viewer.setFinished( containsDraft( chapters ) == false );
		
		return viewer;
	}
	private boolean containsDraft( List<ChapterEntity> chapters ) {
		for ( ChapterEntity chapter : chapters ) {
			if ( chapter.getState() == ChapterState.DRAFT ) {
				return true;
			}
		}
		return false;
	}
	private List<StorySlide> publicSlides( long idStory ) {
		List<StorySlide> slides = new ArrayList<StorySlide>();
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		
		IntroSlideFactory introFactory = new IntroSlideFactory( story.getMeta() );
		IntroSlide intro = new IntroSlide( introFactory );
		slides.add( intro );
		
		for ( ChapterEntity chapter : story.getChapters() ) {
			try {
				ReadSecurity<ChapterEntity> security = new PublishedChapterSecurity();
				chapter = security.readPrivileged( new StoryRead.ChapterRead( chapter ) );
				
				ChapterSlideFactory chapterFactory = new ChapterSlideFactory( chapter );
				ChapterSlide chapterSlide = new ChapterSlide( chapterFactory );
				slides.add( chapterSlide );
				
				for ( SectionEntity section : chapter.getSections() ) {
					SectionSlideFactory sectionFactory = new SectionSlideFactory( section );
					SectionSlide sectionSlide = new SectionSlide( sectionFactory );
					slides.add( sectionSlide );
				}
				
				ChapterEndingSlideFactory endingFactory = new ChapterEndingSlideFactory( chapter );
				slides.add( new ChapterEndingSlide( endingFactory ) );
			} catch ( AccessDeniedException e ) {
				// If chapter is not published ignore it
			}
		}
		
		return slides;
	}
	public List<StorySlide> previewSlides( long idStory, Logged logged )
	throws AccessDeniedException {
		List<StorySlide> slides = new ArrayList<StorySlide>();
		StoryEntity story = entityManager.find( StoryEntity.class, idStory );
		
		IntroSlideFactory introFactory = new IntroSlideFactory( story.getMeta() );
		IntroSlide intro = new IntroSlide( introFactory );
		slides.add( intro );
		
		for ( ChapterEntity chapter : story.getChapters() ) {
			ChapterSlideFactory chapterFactory = new ChapterSlideFactory( chapter );
			ChapterSlide chapterSlide = new ChapterSlide( chapterFactory );
			slides.add( chapterSlide );
			for ( SectionEntity section : chapter.getSections() ) {
				SectionSlideFactory sectionFactory = new SectionSlideFactory( section );
				SectionSlide sectionSlide = new SectionSlide( sectionFactory );
				slides.add( sectionSlide );
			}
		}
		
		return slides;
	}
}
