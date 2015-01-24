package org.webstories.core.story.facade;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.webstories.core.auth.Logged;
import org.webstories.core.auth.UserNotLoggedException;
import org.webstories.core.security.AccessDeniedException;
import org.webstories.core.security.ReadSecurity;
import org.webstories.core.security.story.PublishedChapterSecurity;
import org.webstories.core.security.story.StoryOwnerSecurity;
import org.webstories.core.security.story.StoryRead;
import org.webstories.core.story.viewer.ChapterSlide;
import org.webstories.core.story.viewer.ChapterSlideFactory;
import org.webstories.core.story.viewer.IntroSlide;
import org.webstories.core.story.viewer.IntroSlideFactory;
import org.webstories.core.story.viewer.SectionSlide;
import org.webstories.core.story.viewer.SectionSlideFactory;
import org.webstories.core.story.viewer.StorySlide;
import org.webstories.dao.story.ChapterEntity;
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
	public List<StorySlide> publicSlides( long idStory ) {
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
			} catch ( AccessDeniedException e ) {
				// If chapter is not published ignore it
			}
		}
		
		return slides;
	}
	@Override
	public List<StorySlide> previewSlides( long idStory, Logged logged )
	throws UserNotLoggedException, AccessDeniedException {
		if ( logged == null ) {
			throw new UserNotLoggedException();
		}
		
		if ( !isPreviewable( idStory, logged ) ) {
			throw new AccessDeniedException();
		}
		
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
