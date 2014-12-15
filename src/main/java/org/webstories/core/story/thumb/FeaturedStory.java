package org.webstories.core.story.thumb;

import org.webstories.core.text.html.HTMLOutput;
import org.webstories.core.user.ThumbnailUserInfoFactory;
import org.webstories.core.user.UserInfo;
import org.webstories.dao.IdentifiableEntity;
import org.webstories.dao.story.MetaEntity;

public class FeaturedStory implements StoryThumb {
	private Long id;
	private HTMLOutput title;
	private HTMLOutput description;
	private UserInfo author;
	
	public static FeaturedStory from( IdentifiableEntity author, MetaEntity meta ) {
		FeaturedStory product = new FeaturedStory();
		
		product.id = meta.getId();
		product.title = HTMLOutput.fromUnsafeInput( meta.getTitle() ); 
		product.description = HTMLOutput.fromUnsafeInput( meta.getSummary() );
		
		ThumbnailUserInfoFactory factory = new ThumbnailUserInfoFactory( author );
		UserInfo authorInfo = new UserInfo( factory );
		product.author = authorInfo;
		
		return product;
	}
	
	@Override
	public Long getId() {
		return id;
	}
	@Override
	public HTMLOutput getTitle() {
		return title;
	}
	@Override
	public HTMLOutput getDescription() {
		return description;
	}
	@Override
	public UserInfo getAuthor() {
		return author;
	}
}
